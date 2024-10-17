// DECLARE VARIABLES 
const profile = document.querySelector(".profile-card")
const achievements = document.querySelector(".achievements-card")
let stories_array = []
let story_progression= []

// loop through to all the keys stored in localStorage and find those that include 'story' and 'progression_story' to add the them to their respective arrays
for (var key in localStorage){
   if (key.startsWith('story')){
        stories_array.push(localStorage.getItem(key))
   }
   else if(key.startsWith('progression_story_')){
    story_progression.push(localStorage.getItem(key))
   }

 }


// check if there's any story progression if there isn't it should display a message instead of the data
if(stories_array.length==0 ){
    profile.innerHTML += `<p>You haven't read any stories yet!</p>`
    achievements.innerHTML += `<p>You haven't gained any achievements yet!</p>`

}

stories_array.forEach((element, index) => {
    //  convert the progression number from string to int
    let progressionValue = parseInt(story_progression[index]) || 0;

    // Displaying story and associated progression
    profile.innerHTML += `
        <h2>${element}</h2>
        <label for="progression">${progressionValue*20}%</label>
        <progress id="progression" value="${progressionValue}" max="5">${progressionValue * 20}% </progress>`;
});

stories_array.forEach((element) => {
    achievements.innerHTML += `
        <h2>${element}</h2>
        <p>Coming Soon</p>
       `
});