/*
* Astral Exploration - Deciphering
* Jolene Bodika & John Compuesto
*
* Controls:
* - You can choose if you want to crack a word or a sentence.
- After making a selection you must read the jumble up sentence, and once you're ready you can press the button and speak to decipher it. 
* Uses:
* Speech Recognition API 
* Confetti API
*
*/

// Check if SpeechRecognition is supported in the browser
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

// Arrays to decode
let wordsToDecode = [
    [`aliens`, 'nsalie'],
    [`earth`, 'tearh'],
    [`connection`, 'oncontiec'],
    [`emotions`, 'sentmieo'],
    [`galaxy`, 'xagaly'],
    [`spaceship`, 'spacepihs'],
    [`gravity`, 'tyvigra'],
    [`oxygen`, 'gynexo'],
    [`mission`, 'nimsiso'],
];

// Arrays to decode
let sentenceToDecode = [
    [`humans are far too complex let's go back home`, 'nmahus aer rfa oto oxcemlp tlse go akbc mheo'],
    [`hello humans`, 'elloh umanhs'],
    [`language is a fragile structure`, 'glnauage si a ilfrag etrctusru'],
    [`returning now with samples of earth data`, 'gnirnuter won htiw sesplam fo htear atad'],
    [`they laughed at our attempt to communicate`, 'ythe hedgual ta ruo tmaetpt ot cmunoicateom'],
    [`we must leave before they detect us`, 'ew tsum evale erofeb yeth ctdtee su'],
    [`the probe malfunctioned during descent`, 'eth borpe udmfaanolcti dernugi dsceent'],
    [`they think we are myths or stories`, 'ythe htnik ew era sthym ro sestirto'],
    [`our species will never be the same again`, 'ruo ciespse lliw revne eb eht mesa ngiaa'],
    [`decoding their culture is harder than expected`, 'gnedodic rieht urtcule si derrah htan xedpetce'],
];
//Declare constants
const startBtn = document.querySelector('#startBtn');
const sentenceBtn = document.querySelector('#sentenceBtn')
const wordBtn = document.querySelector('#wordBtn')
// declare global variables
let msg = document.querySelector(".msg");
let decodedDiv = document.querySelector("#decodedDiv");
let decodedMessage = document.querySelector("#decoded-message");
let instructions = document.querySelector("#instructions");
let mode = '' // the game mode flag
let selectedMessage = []


// typewriter animation runs
let typewriterText = new Typewriter(msg, {
    autoStart: true,
    delay: 30,
}).typeString(`You seem a bit tired friend.. you've had a long day`)
    .pauseFor(2000)
    .deleteAll()
    .typeString('Help decode this message!')
    .pauseFor(2000)
    .deleteAll()
    .typeString('⊑⎍⋔⏃⋏⌇ ⏃⍀⟒ ⎎⏃⍀ ⏁⍜⍜ ☊⍜⋔⌿⌰⟒⌖ ⟟ ⊑⏃⎐⟒ ⊑⏃⎅ ⟒⋏⍜⎍☌⊑ ⎎⍜⍀ ⍜⋏⟒ ⎅⏃⊬ ⌰⟒⏁⌇ ☌⍜ ⏚⏃☊☍ ⊑⍜⋔⟒')
    .typeString('<br/>Ooops  We will translate it...')
    .deleteAll()
    .typeString('Would you like to decipher a word or a sentence?')
    .callFunction(() => {
        wordBtn.style.display = 'block' // display game mode options
        sentenceBtn.style.display = 'block'
        wordBtn.style.width = 200 + 'px';// adds styling
        sentenceBtn.style.width = 200 + 'px';
        skipBtn.style.display = 'none' // hide skip button
    })
    .start();


// event listner call to check if the skip button is pressed 
skipBtn.addEventListener('click', () => {
    typewriterText.stop(); // stops the typewriter effect
    msg.textContent = 'Would you like to decipher a word or a sentence?'; // clear the text area
    skipBtn.style.display = 'none';


    wordBtn.style.display = 'block'// display the game mode options
    sentenceBtn.style.display = 'block'
    wordBtn.style.width = 200 + 'px';
    sentenceBtn.style.width = 200 + 'px';

});


// Event listner calls to allow the user to make a choice for the game mode
wordBtn.addEventListener('click', () => {
    mode = 'word'; // assign game mode
    selectedMessage = randomizeValue(wordsToDecode); // gets random word
    displayGameUI(); // shows the game ui
})

sentenceBtn.addEventListener('click', () => {
    mode = 'sentence';
    selectedMessage = randomizeValue(sentenceToDecode);// gets random sentence 
    displayGameUI(); // shows the game ui
})


/**Function to randomize values */
function randomizeValue(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Displays error message when the user makes an incorrect guess
 */
function incorrectDecipher(speech) {
    const message = document.createElement('div');
    message.className = 'alien-warning-message';
    message.innerHTML = `
          <h2>Incorrect guess</h2>
               <p>You said: ${speech}</p>
               <p>That's not quite right.. try again</p>`;// displays a pop up message
    document.body.appendChild(message);

    setTimeout(() => {
        document.body.removeChild(message);
    }, 3000)// removes the pop up message

}
/**
 * Displays the game ending message to let the user know they successfully completed the game
 */
function correctDecipher(speech) {
    const message = document.createElement('div');
    message.className = 'alien-end-message';
    message.innerHTML = `
        <h2>Understanding Achieved</h2>
               <p>You said: ${speech}</p>

        <p>The alien was able to decipher the message!</p>
        <p>Challenge complete ✅</p>
    `;// displays the pop up
    document.body.appendChild(message);

    // timeout to redirect the user out of the game after 10 seconds
    setTimeout(() => {
        window.location = './map.html';
    }, 10000)
}

/**
 * Shows the speech recognition button and message to decode 
 */
function displayGameUI() {
    wordBtn.style.display = 'none'
    sentenceBtn.style.display = 'none'// hide buttons and text
    msg.style.display = 'none';

     instructions.style.display = 'block';
    startBtn.style.display = 'block';
    startBtn.style.width = 200 + 'px';

    decodedDiv.style.display = 'block';// displays randomized jumbled up word
    decodedDiv.textContent = selectedMessage[1]

}

// check if speechrecognition is available
if (SpeechRecognition) {
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-CA';
    recognition.continuous = false; // Stop after recognizing a single result
    recognition.interimResults = false;

    // Start listening when the button is clicked
    const output = document.querySelector('.output');

    startBtn.addEventListener('click', () => {
        recognition.start();// starts listening for input
    });

    // When speech is recognized start processing it
    recognition.onresult = (event) => {
        const speech = event.results[0][0].transcript.toLowerCase();
        // output.textContent = `You said: ${speech}. `;
        console.log(mode);
        let isCorrect = false;

        if (mode === 'word') {
            // Only match if user said the single word exactly
            if (speech.trim().toLowerCase() === selectedMessage[0].toLowerCase()) {
                isCorrect = true;
            }
        } else if (mode === 'sentence') {
            // Check if there's an exact full sentence match 
            if (speech.trim().toLowerCase() === selectedMessage[0].toLowerCase()) {
                isCorrect = true;
            }
        }

        if (isCorrect) {
            startBtn.style.display = 'none';
            output.textContent = '';
            instructions.innerHTML = '';

            const scalar = 2;
            correctDecipher(speech);

            //displays the confetti animation
            confetti({
                text: '.',
                particleCount: 150,
                spread: 180,
                scalar
            });
            setTimeout(() => {
                window.location = './map.html';
            }, 10000);
        } else {
            incorrectDecipher(speech);
        }

    };

    // Handle errors
    recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
    };

} else {
    alert('Your browser does not support the SpeechRecognition API.');
}
