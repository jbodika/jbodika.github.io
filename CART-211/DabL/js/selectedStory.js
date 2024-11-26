import { firebaseConfig } from "./credentials.js";
// Initialize Firebase App
firebase.initializeApp(firebaseConfig);
const storyContainer = document.querySelector('#story');
const choicesContainer = document.querySelector('#choices-container');

let progressLabel = document.querySelector("#progress-label");
let choicesTaken = []
let decisionsBreakdown = document.querySelector("#decisionsBreakdown")
let storyProgress = {
    currentChoice: 0, // Count how many choices the player has made
    totalChoices: 0, // Total num of choices in the current path
    hasEnded: false // Flag to check if the story has ended
};

//returns the name of the query parameter
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Get the 'id' parameter from the URL
const storyId = getQueryParam('id');

if (storyId) {


    firebase.database().ref('Stories/' + storyId).once('value').then(function(snapshot) {
                const story = snapshot.val(); // Get the story object
                if (story) {
                    localStorage.setItem('progression_story_' + storyId, 1);
                    localStorage.setItem('story_' + storyId, story.title);

                    document.querySelector('#story-title').innerHTML = `
            ${story.title} ${story.icon || ""}
            <br/>
            ${story.description}
        `;


                    storyContainer.innerHTML = `
            <p style="font-style:italic">${story.setting}
            <br/><img src="${(story.imageUrl ? story.imageUrl : "")}"/></p>
        `;

                    let currentChoice = story.choices[0]; // Start with the first choice

                    function displayChoices() {
                        if (!currentChoice) return;

                        // Clear the container for current buttons and questions
                        if (choicesContainer) {
                            choicesContainer.remove();
                        }

                        // Create a new container for the current question and options
                        const newChoicesContainer = document.createElement('div');
                        newChoicesContainer.id = 'choices-container';
                        newChoicesContainer.className = 'text-center';
                        newChoicesContainer.innerHTML = `
                <p>${currentChoice.question}</p>
                ${currentChoice.options.map((option, index) => `
                    <input class="choice-option" type="button" id="choice${index + 1}" value="${option.description}" onclick="makeChoice(${index})"/>
                `).join('')}
            `;

                // Add new questions and options
                storyContainer.appendChild(newChoicesContainer);
            }

            // When the user makes a decision it will update the UI
            window.makeChoice = function (index) {
                const selectedOption = currentChoice.options[index];
                onChoiceSelected(selectedOption) // checks if the option triggered an achievement 
                choicesTaken.push(selectedOption.description) // adds option to choicesTaken array 
                handleChoice(selectedOption);
                displayDecisions()


                // Update the color of previous outcomes to blue
                const previousOutcomes = storyContainer.querySelectorAll('p.outcome');
                previousOutcomes.forEach(outcome => {
                    outcome.style.color = '#1D2038';
                });

                // New section for the selected outcome
                const outcomeContainer = document.createElement('p');
                outcomeContainer.classList.add('outcome');
                outcomeContainer.style.color = '#D9EFEF'; // Light color for the new outcome
                outcomeContainer.innerHTML = `<em>${selectedOption.outcome || ""}</em>`;
                storyContainer.appendChild(outcomeContainer);

                if (selectedOption.imageUrl != null) {
                    let imgEl = document.createElement('img')
                    imgEl.src = selectedOption.imageUrl
                    storyContainer.appendChild(imgEl);
                }


                // Remove the buttons and question after a choice is made
                const choicesContainer = document.querySelector('#choices-container');
                if (choicesContainer) {
                    choicesContainer.remove();
                }

                // Check for nextChoices
                if (selectedOption.nextChoices && selectedOption.nextChoices.length > 0) {
                    const nextChoiceId = selectedOption.nextChoices[0].id; // Use the first nextChoice

                    // Find a specific choice by its ID in a nested structure of choices
                    const findNextChoice = (id, choices) => {
                        for (let choice of choices) {
                              // if the current choice's ID matches the target id
                            if (choice.id === id) {
                                return choice; //return choice if there's a match
                            }//check if it has nested options
                            if (choice.options) {
                                // loop through each option in the choice
                                for (let opt of choice.options) {
                                    // If the option contains more nested choices
                                    if (opt.nextChoices) {
                                        const result = findNextChoice(id, opt.nextChoices);// search recursively until a match is found
                                        if (result) return result; // once the recursive call finds the target result it will return it 
                                    }
                                }
                            }
                        }
                        return null; // if there's no more matching choices in the structure return null
                    };

                    // Update currentChoice and display next question
                    currentChoice = findNextChoice(nextChoiceId, story.choices);
                    if (currentChoice) {
                        displayChoices()
                    }
                } else {
                    // Append conclusion since there's no nextChoices available
                    const conclusionContainer = document.createElement('p');
                    conclusionContainer.innerHTML = `<strong>${story.conclusion}</strong>`;
                    storyContainer.appendChild(conclusionContainer);
                    checkAchievementTrigger("end_of_story"); // default sets the full story playthough to complete
                }
            };

            // Display the and first question and first options for the player
            displayChoices();

            // Creates achievements in localStorage for the story
            const initializeAchievements = (achievements) => {
                if (!achievements) return null
                achievements.forEach(achievement => {
                    const key = `achievement_${storyId}_${achievement.id}`;

                    // Check if the achievement is not yet created in localStorage
                    if (!localStorage.getItem(key)) {
                        localStorage.setItem(key, "incomplete");
                    }

                    // Store the description for each specific achievement
                    const descriptionKey = `desc_achievement_${storyId}_${achievement.id}`;
                    if (!localStorage.getItem(descriptionKey)) {
                        localStorage.setItem(descriptionKey, achievement.description);
                    }
                });
            };

            // Unlocks achievements checks if the passed trigger corresponds to the story achievements and sets it to complete
            function checkAchievementTrigger(trigger) {
                const achievementsTrig = story.achievements
                const achievement = achievementsTrig.find(a => a.trigger === trigger);

                if (achievement) {
                    if (localStorage.getItem(`achievement_${storyId}_${achievement.id}`) != 'complete') {
                        // Set achievement to unlocked
                        localStorage.setItem(`achievement_${storyId}_${achievement.id}`, "complete");
                        displayAchievement(achievement.title)
                    }


                }
            }

            // When a choice is selected, pass the corresponding trigger to unlock the achievement
            function onChoiceSelected(choice) {
                const trigger = choice.trigger;
                if (trigger) {
                    checkAchievementTrigger(trigger);
                }
            }
            // Creates achievements in local storage
            initializeAchievements(story.achievements)



            // Counts total choices based on the current story path
            function countTotalChoices(story) {
                let totalChoices = 0;

                // Recursively count choices in the story
                function countChoices(choices) {
                    choices.forEach(choice => {
                        if (choice.nextChoices) {
                            totalChoices++;
                            countChoices(choice.nextChoices); // Recursively count choices in the next level
                        } else {
                            totalChoices++; // If there are no more choices, increment total choices
                        }
                    });
                }

                // Start counting from the root choices in the story
                story.choices.forEach(choice => {
                    countChoices(choice.options); // Start counting from the root choices
                });

                return totalChoices;
            }

            // Updates progress when the player makes a choice
            function updateProgression() {
                if (storyProgress.hasEnded) return;  // Stop updating if the story has ended
                let progressBar = document.querySelector("#progression");
                // Increment current choice count 
                storyProgress.currentChoice++;

                // Calculate progress percentage
                let progressPercentage = (storyProgress.currentChoice / storyProgress.totalChoices) * 100;

                // Update progress bar
                progressBar.value = storyProgress.currentChoice;
                progressBar.max = storyProgress.totalChoices;

                // Update the progress label
                progressLabel.innerHTML = `Progress: ${Math.round(progressPercentage)}%`;

            }

            // Handles the story progression based on the choice selection
            function handleChoice(choice) {

                if (storyProgress.hasEnded) return;

                updateProgression();

                // If the current choice has no more remaining choices update progression bar to 100%
                if (!choice.nextChoices) {
                    storyProgress.hasEnded = true;

                    let progressBar = document.querySelector("#progression");
                    progressBar.value = progressBar.max;
                    let progressLabel = document.querySelector("#progress-label");
                    progressLabel.innerHTML = "Progress: 100%";
                }

            }

            // Gets the total choices based on the story structure
            storyProgress.totalChoices = countTotalChoices(story);

            // Update the progress bar max value correctly
            let progressBar = document.querySelector("#progression");
            progressBar.max = storyProgress.totalChoices;


            // Displays pop-up for achievements
            function displayAchievement(achievementName) {
                var x = document.querySelector("#achievement-received");
                x.innerHTML = `Achievement Unlocked: ${achievementName}!`
                x.className = "show";
                setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
            }

            // Displays the decisions taken 
            function displayDecisions() {
                decisionsBreakdown.innerHTML = "<h1 style=color:white>Look back at all the decisions you've made</h1>"
                choicesTaken.forEach((choice, i) => {

                    decisionsBreakdown.innerHTML += `<div id="miniBox">${i + 1}. ${choice}</div>`
                })

            }

            // When the user clicks to delete their story achievements button
            window.deleteStoryData = function () {
                // Clear all data associated to the story
                localStorage.removeItem('progression_story_' + storyId);
                localStorage.removeItem('story_' + storyId);
                var x = document.querySelector("#delete-data");
                x.innerHTML = `Data deleted`
                x.className = "show";
                setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);

                // remove all achievements and descriptions of achievements 
                for (var key in localStorage) {
                    if (key.startsWith('achievement_' + storyId) || key.startsWith('desc_achievement_' + storyId)) {
                        localStorage.removeItem(key);
                    }
                }

            }
        } else {
            document.querySelector('#story').innerHTML = `<p>Story not found!</p>`;
        }
    });



}