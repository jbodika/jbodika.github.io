//DECLARE VARIABLES
let title = undefined

//Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDCNbOigX073RJrRWWUPE9tUH-52PJKcW4",
    authDomain: "dabl-95a47.firebaseapp.com",
    databaseURL: "https://dabl-95a47-default-rtdb.firebaseio.com",
    projectId: "dabl-95a47",
    storageBucket: "dabl-95a47.appspot.com",
    messagingSenderId: "1086495030772",
    appId: "1:1086495030772:web:9f81ef078a0758b18ccda1"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//returns the name of the query parameter
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Get the 'id' parameter from the URL
const storyId = getQueryParam('id');

if (storyId) {
    firebase.database().ref('Stories/' + storyId).once('value').then(function (snapshot) {
        const story = snapshot.val();
        console.log(story)
        document.querySelector('#story-title').innerHTML = `${story.name} ${story.icon}
        <br/>
      ${story.description}`

        title = story.name
    })

    firebase.database().ref('StoryDecisions/' + storyId).once('value').then(function (snapshot) {
        const story = snapshot.val();
        if (story) {
            // Display story data
            document.querySelector('#story').innerHTML +=
                `<div class="text-center">
            <p  style="font-style:italic">${story.setting}</p>
            <p>${story.Narration.prompt1}</p>

            <input  class="choice-option"type="button" id="choice1" value="${story.Choices.choice1}"/>
            <input  class="choice-option"type="button" id="choice2"  value="${story.Choices.choice2}"/>

            <p style="display:none" id="choiceOuctome1">${story.ChoiceOutcomes.choice1}</p>
            <p style="display:none" id="choiceOuctome2">${story.ChoiceOutcomes.choice2}</p>
            <input class="choice-option"style="display:none" type="button" id="choice3"value="${story.Choices.choice3}"/>
            <input  class="choice-option"style="display:none" type="button" id="choice4" value="${story.Choices.choice4}"/>
         
            <p style="display:none"id="choiceOuctome3">${story.ChoiceOutcomes.choice3}</p>
            <p style="display:none" id="choiceOuctome4">${story.ChoiceOutcomes.choice4}</p>
            <input  class="choice-option"style="display:none" type="button" id="choice5" value="${story.Choices.choice5}"/>
            <input  class="choice-option"style="display:none" type="button" id="choice6" value="${story.Choices.choice6}"/>    

            <p style="display:none" id="choiceOuctome5">${story.ChoiceOutcomes.choice5}</p>
            <p  style="display:none" id="choiceOuctome6">${story.ChoiceOutcomes.choice6}</p>
            <input  class="choice-option"style="display:none" type="button" id="choice7" value="${story.Choices.choice7}"/>
            <input  class="choice-option"style="display:none" type="button" id="choice8" value="${story.Choices.choice8}"/>
           
            <p style="display:none" id="choiceOuctome7">${story.ChoiceOutcomes.choice7}</p>
            <p style="display:none" id="choiceOuctome8">${story.ChoiceOutcomes.choice8}</p>
        
          </div>
            `;

            const choice1 = document.querySelector("#choice1")
            const choice2 = document.querySelector("#choice2")
            const choice3 = document.querySelector("#choice3")
            const choice4 = document.querySelector("#choice4")
            const choice5 = document.querySelector("#choice5")
            const choice6 = document.querySelector("#choice6")
            const choice7 = document.querySelector("#choice7")
            const choice8 = document.querySelector("#choice8")

            const choiceOuctome1 = document.querySelector("#choiceOuctome1")
            const choiceOuctome2 = document.querySelector("#choiceOuctome2")
            const choiceOuctome3 = document.querySelector("#choiceOuctome3")
            const choiceOuctome4 = document.querySelector("#choiceOuctome4")
            const choiceOuctome5 = document.querySelector("#choiceOuctome5")
            const choiceOuctome6 = document.querySelector("#choiceOuctome6")
            const choiceOuctome7 = document.querySelector("#choiceOuctome7")
            const choiceOuctome8 = document.querySelector("#choiceOuctome8")
            // store story progression in localStorage
            localStorage.setItem('progression_story_' + storyId, 1);

            // user must click on one of the two options presented to them
            choice1.addEventListener('click', () => {
                localStorage.setItem('story_' + storyId, title);
                localStorage.setItem('progression_story_' + storyId, 2);

                choiceOuctome1.style.display = 'block'
                choiceOuctome1.style.color = '#D9EFEF'

                choice1.style.display = 'none'
                choice2.style.display = 'none'
                choice3.style.display = 'inline-block'
                choice4.style.display = 'inline-block'
            })
            choice2.addEventListener('click', () => {
                localStorage.setItem('story_' + storyId, title);
                localStorage.setItem('progression_story_' + storyId, 2);
                choiceOuctome2.style.display = 'block'
                choiceOuctome2.style.color = '#D9EFEF'

                choice1.style.display = 'none'
                choice2.style.display = 'none'
                choice3.style.display = 'inline-block'
                choice4.style.display = 'inline-block'

            })


            choice3.addEventListener('click', () => {
                choiceOuctome3.style.display = 'block'
                choiceOuctome3.style.color = '#D9EFEF'
                choiceOuctome2.style.color = '#1D2038'
                choiceOuctome1.style.color = '#1D2038'
                localStorage.setItem('progression_story_' + storyId, 3);
                choice3.style.display = 'none'
                choice4.style.display = 'none'
                choice5.style.display = 'inline-block'
                choice6.style.display = 'inline-block'


            })
            choice4.addEventListener('click', () => {
                choiceOuctome4.style.display = 'block'
                choiceOuctome4.style.color = '#D9EFEF'
                choiceOuctome2.style.color = '#1D2038'
                choiceOuctome1.style.color = '#1D2038'
                localStorage.setItem('progression_story_' + storyId, 3);
                choice3.style.display = 'none'
                choice4.style.display = 'none'
                choice5.style.display = 'inline-block'
                choice6.style.display = 'inline-block'


            })
            choice5.addEventListener('click', () => {
                choiceOuctome5.style.display = 'block'
                choiceOuctome5.style.color = '#D9EFEF'
                choiceOuctome3.style.color = '#1D2038'
                choiceOuctome4.style.color = '#1D2038'
                localStorage.setItem('progression_story_' + storyId, 4);

                choice5.style.display = 'none'
                choice6.style.display = 'none'
                choice7.style.display = 'inline-block'
                choice8.style.display = 'inline-block'


            })
            choice6.addEventListener('click', () => {
                choiceOuctome6.style.display = 'block'
                choiceOuctome6.style.color = '#D9EFEF'
                choiceOuctome3.style.color = '#1D2038'
                choiceOuctome4.style.color = '#1D2038'
                localStorage.setItem('progression_story_' + storyId, 4);

                choice5.style.display = 'none'
                choice6.style.display = 'none'
                choice7.style.display = 'inline-block'
                choice8.style.display = 'inline-block'


            })

            choice7.addEventListener('click', () => {
                choiceOuctome7.style.display = 'block'
                choiceOuctome7.style.color = '#D9EFEF'
                choiceOuctome5.style.color = '#1D2038'
                choiceOuctome6.style.color = '#1D2038'
                localStorage.setItem('progression_story_' + storyId, 5);

                choice7.style.display = 'none'
                choice8.style.display = 'none'


            })
            choice8.addEventListener('click', () => {
                localStorage.setItem('progression_story_' + storyId, 5);

                choiceOuctome8.style.display = 'block'
                choiceOuctome8.style.color = '#D9EFEF'
                choiceOuctome5.style.color = '#1D2038'
                choiceOuctome6.style.color = '#1D2038'
                choice7.style.display = 'none'
                choice8.style.display = 'none'
            })
        } else {
            document.querySelector('#story').innerHTML = `<p>Story not found!</p>`;
        }
    });
} else {
    document.querySelector('#story').innerHTML = `<p>No story selected!</p>`;
}