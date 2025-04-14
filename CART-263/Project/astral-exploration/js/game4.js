// Check if SpeechRecognition is supported in the browser
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

let messageToDecode = [
    [`humans are far too complex let's go back home`, 'nmahus aer rfa oto oxcemlp tlse go akbc mheo'],
    [`hello humans`, 'elloh umanhs'],
    [`language is a fragile structure`, 'glnauage si a ilfrag etrctusru'],
    [`returning now with samples of earth data`, 'gnirnuter won htiw sesplam fo htear atad'],
    [`they laughed at our attempt to communicate`, 'ythe hedgual ta ruo tmaetpt ot cmunoicateom'],
  ];
  
let msg = document.querySelector(".msg");
let decodedDiv = document.querySelector("#decodedDiv");
let decodedMessage = document.querySelector("#decoded-message");
let selectedMessage = randomizeValue(messageToDecode);
const startBtn = document.querySelector('#startBtn');
let instructions = document.querySelector("#instructions");


/**Function to randomize values */
function randomizeValue(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

new Typewriter(msg, {
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
    .pauseFor(3000)
    .callFunction(() => {
        msg.style.display = 'none';
        decodedDiv.style.display = 'block';
        decodedDiv.textContent = selectedMessage[1]
        instructions.style.display = 'block';
        startBtn.style.display = 'block';
        startBtn.style.width = 200 + 'px';
    })
    .start();

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
        output.textContent = `You said: ${speech}. `;

        if (speech.includes(`${selectedMessage[0]}`)) {
            startBtn.style.display = 'none';
            decodedDiv.innerHTML = `<b>${selectedMessage[0]}</b><br/>Congrats! You guessed it right`;
            output.textContent = '';
            instructions.innerHTML = '';
            var scalar = 2;

            confetti({
                text: '.',
                particleCount: 150,
                spread: 180,
                scalar
            });
        }

    };

    // Handle errors
    recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
    };

} else {
    alert('Your browser does not support the SpeechRecognition API.');
}
