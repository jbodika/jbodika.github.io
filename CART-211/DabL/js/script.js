
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

firebase.database().ref('Stories').orderByChild('name').on('child_added', function(snapshot) {
  const story = snapshot.val();
  const storyItem = document.createElement('div');
  storyItem.classList.add('story-item');
  storyItem.innerHTML =` 
      <a href="selectedStory.html?id=${story.id}" ><h3 id="${story.id}">${story.name}   (${story.age_range})</h3></a>
      <h2>${story.icon}</h2>
      <p>${story.description}</p>
    <div style="display:none">${story.description}
      ${story.age_range}
    </div>
      

   
  `

  // Append the story item to the div
  document.querySelector('#storyGallery').appendChild(storyItem);
});

