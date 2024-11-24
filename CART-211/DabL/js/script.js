import { firebaseConfig } from "./credentials.js";
// Initialize Firebase App
firebase.initializeApp(firebaseConfig);

firebase.database().ref('Stories').orderByChild('title').on('child_added', function(snapshot) {
    const story = snapshot.val();
    const storyItem = document.createElement('div');
    storyItem.classList.add('story-item');
    storyItem.innerHTML = ` 
      <a href="selectedStory.html?id=${story.id}" ><h3 id="${story.id}">${story.title}   (${story.age_range})</h3></a>
      <p>${story.description}</p>
    <div style="display:none">${story.description}
      ${story.age_range}
    </div>
      

   
  `

    // Append the story item to the div
    document.querySelector('#storyGallery').appendChild(storyItem);
});