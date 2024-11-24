// DECLARE VARIABLES 
const profile = document.querySelector(".profile-card");
const achievements = document.querySelector(".achievements-container");
let stories_array = [];
let story_progression = [];
let storyAchievements = {};
let achievementsContainer = document.querySelector(".achievements-container");
// Loop for all the keys stored in localStorage
for (var key in localStorage) {
    if (key.startsWith('story')) { // Add and object that groups the storyId and storyName to the stories_array
        let storyName = localStorage.getItem(key);
        stories_array.push({ id: key.split('_')[1], name: storyName });
    } else if (key.startsWith('progression_story_')) {
        story_progression.push(localStorage.getItem(key));
    } else if (key.startsWith('achievement_')) {
        // Get the storyId from the achievement key
        let storyId = key.split('_')[1];

        // Add all achievements to the story's list of achievements
        if (!storyAchievements[storyId]) {
            storyAchievements[storyId] = [];
        }
        storyAchievements[storyId].push(key);
    }
}


// Check if the user has read any stories if they haven't display a message instead of the data
if (stories_array.length == 0) {
    profile.innerHTML += `<p>You haven't read any stories yet!</p>`;
    achievements.innerHTML += `<p>You haven't gained any achievements yet!</p>`;
}

// Loop through the stories and display their respective achievements
stories_array.forEach((story) => {
    let storyId = story.id;
    let storyName = story.name;

    if (storyAchievements[storyId]) {

        // Story-specific section
        let storySection = document.createElement("div");
        storySection.classList.add("story-section");
        storySection.innerHTML += `<h3>Achievements for <a href="selectedStory.html?id=${storyId}">${storyName}</a>:</h3>`;

        // Grid container for achievements
        let storyAchievementsCard = document.createElement("div");
        storyAchievementsCard.classList.add("achievements-card");

        // Get data for achievements for the specific story and display them
        storyAchievements[storyId].forEach((achievementKey) => {
            let achievementStatus = localStorage.getItem(achievementKey); // 'incomplete' or 'complete'
            let achievementId = achievementKey.split('_').slice(2).join('_');
            let achievementDescription = localStorage.getItem(`desc_achievement_${storyId}_${achievementId}`);
            let achievementTitle = achievementId.replaceAll("_", " ").toUpperCase();

            // Displays each achievement as a card 
            storyAchievementsCard.innerHTML += `
                <div class="card ">
                    <p>
                        <strong>${achievementTitle}</strong> - 
                        Status: <strong style="color:${achievementStatus === 'complete' ? 'green' : 'grey'}">
                            ${achievementStatus === 'complete' ? 'Unlocked' : 'Locked 🔒'}
                        </strong><br>
                        <em>${achievementDescription || 'No description available'}</em>
                    </p>
                </div>`;
        });

        storySection.appendChild(storyAchievementsCard);

        achievementsContainer.appendChild(storySection);
    } else {

        achievements.innerHTML += `<h3>No achievements for the story <a href="selectedStory.html?id=${storyId}">'${storyName}'</a> yet.</h3>`;

    }
});