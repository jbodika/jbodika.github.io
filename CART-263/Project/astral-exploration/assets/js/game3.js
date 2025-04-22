/*
* Astral Exploration - Human Connection
* Jolene Bodika & John Compuesto
*
* Controls:
* - You must show different facial expression within a short timeframe 5-10 seconds roughly
* - Once you start seeing different buttons with emotions you must click on  (3) different ones to complete the challenge.
* Uses:
* Face API 
*
*/

window.onload = function () {
    const encounteredEmotions = new Set();
    const video = document.querySelector("#video");
    const alienMemory = {};// sets to keep track of emotions shown
    const alienMemoryCount = {}; // counts how many time the memory has been repeated
    const playerFaces = {}; // keeps track of every facial expression made by the player through the game
    const clickedEmotions = {}; // keeps track of the amount of time the emotion was clicked
    let textField = document.querySelector('.writeText');
    let skipBtn = document.querySelector("#skipBtn");
    let btnCount = 0 // keeps track of the amount of different flying buttons on the screen
    let timeoutVal = 24000; // timeout to start the video stream after 24 seconds
    let timeoutId; //identifies the timeout 

    // runs the typewriting animation through the API 
    let typewriterText = new Typewriter(textField, {
        strings: ['⊑⟒⌰⌰⍜ ⍙⟒⌰☊⍜⋔⟒ ⎎⟒⌰⌰⍜⍙ ⏃⌰⟟⟒⋏!', 'My apologies, you cannot read ⏚⌰⍜⍀⏚⊬', 'Translating ⏚⌰⍜⍀⏚⊬ to ENGLISH', 'You need to find a way to understand earthlings'],
        loop: false,
        delay: 30,
        autoStart: true
    })

    // Start the timeout 
    function startLoadingModels() {
        timeoutId = setTimeout(() => {
        skipBtn.style.display = 'none';

            Promise.all([
                faceapi.nets.tinyFaceDetector.loadFromUri('assets/models/'),
                faceapi.nets.faceExpressionNet.loadFromUri('assets/models/')
            ]).then(setUpVideo);
        }, timeoutVal);
    }

    // Runs the original animation
    startLoadingModels();

    // event listner function if the skip button is pressed 
    skipBtn.addEventListener('click', () => {
        typewriterText.stop(); // stops the typewriter effect
        textField.textContent = ''; // clear the text area
        skipBtn.style.display = 'none';

        // Cancels the timeout
        clearTimeout(timeoutId);

        // assign new timeoutValue due to the skip button being pressed
        timeoutVal = 100;

        // call the loadingModels function again to start the video stream earlier
        startLoadingModels();
    });


    /**Function to set upvideo stream */
    function setUpVideo() {
        navigator.getUserMedia({ video: {} },
            stream => video.srcObject = stream,
            error => console.error(error)
        )
    }


/**Keeps track of the emotion experienced  */
    function handleEmotion(emotion) {
        if (!alienMemory[emotion]) {
            alienMemory[emotion] = 1;
            alienFirstTimeReaction(emotion);
        } else {
            alienMemory[emotion]++;
            alienRepeatReaction(emotion, alienMemory[emotion]);
        }
    }

    
    /* stores data related to the clicked emotion to keep track of the count* */
    function onEmotionClick(emotion) {
        if (!clickedEmotions[emotion]) {
            clickedEmotions[emotion] = 1;
        } else {
            clickedEmotions[emotion]++;
        }

        checkIfPlayerUnderstandsHumans();
    }
    /**
     * Function to count the amount of different expressions that the player is making during gameplay
     * 
     * @param {*} emotion
     */
    function handlePlayerFaces(emotion) {
        // if the expression does not exist create an instance of it
        if (!playerFaces[emotion]) {
            playerFaces[emotion] = 1;
        } else {
            playerFaces[emotion]++;// increase the emotion count
        }
    }



    /**
     * updates the stats list
     * @param {*} emotion 
     */
    function updateStats(emotion) {
        if (!alienMemoryCount[emotion]) alienMemoryCount[emotion] = 1;
        else alienMemoryCount[emotion]++;

        const statsList = document.querySelector('#statsList');
        let emotionItem = document.querySelector(`#stat-${emotion}`);

        if (!emotionItem) {
            emotionItem = document.createElement('li');
            emotionItem.id = `stat-${emotion}`;

            const span = document.createElement('span');
            span.textContent = `${emotion}: ${alienMemoryCount[emotion]}`;

         
            emotionItem.appendChild(span);
            statsList.appendChild(emotionItem);
        } else {
            emotionItem.querySelector('span').textContent = `${emotion}: ${alienMemoryCount[emotion]}`;
        }

    }

    /**
     *  Display prompts based on specific emotions
     * @param {*} emotion 
     */
    function alienFirstTimeReaction(emotion) {
        textField.innerHTML = '';
        const reactions = {
            happy: "Subject radiates... warmth. Unknown feeling: H-A-P-P-Y.",
            sad: "Water exits eye region. Is unit damaged?",
            surprised: "Sudden expansion of eyes detected. Threat or joy?",
            angry: "Color red. Increase in vocal decibels. Danger?",
            neutral: "Subject is not demonstrating any emotion...",
            disgusted: "Something seems to be bothering the subject",

        };

        new Typewriter(textField, {
            strings: (reactions[emotion]),
            loop: false,
            delay: 30,
            autoStart: true
        });
    }

    /**
 *  Display prompts based on specific repeated emotions
 * @param {*} emotion 
 */
    function alienRepeatReaction(emotion, emotionCount) {
        const log = {
            happy: `H-A-P-P-Y detected again. Confidence growing. Familiar warmth level: ${emotionCount}`,
            sad: `Sadness logged ${emotionCount}x. Possibly a common malfunction.`,
            surprised: `Surprised again? Is this species always shocked? (${emotionCount})`,
            angry: `Anger confirmed. Best to avoid confrontation. Observed ${emotionCount}x.`,
        };
        new Typewriter(textField, {
            strings: (log[emotion] || `Emotion ${emotion} re-encountered: ${emotionCount} times`),
            loop: false,
            delay: 30,
            autoStart: true
        });
    }


    /**
     * Function to keep track of the different buttons with their specific emotions
     * @param {*} highestExpression 
     */
    function createFlyingButtons(highestExpression) {
        let btn = document.createElement('button');
        let emotion = highestExpression[0];

        encounteredEmotions.add(emotion); // adds element to keep track of different emotions shown
        btn.textContent = emotion;

        btn.setAttribute('class', 'btn');
        btn.style.position = 'absolute';
        btn.style.left = '50px';
        btn.style.top = '50px';

        // sets up positions of buttons
        let x = Math.random() * (window.innerWidth - 150 - 200);
        let y = Math.random() * (window.innerHeight - 150 - 200);
        let dx = (Math.random() - 0.5) * 2;// sets the movement speed
        let dy = (Math.random() - 0.5) * 2;

        // makes the angry buttons very difficult to catch because they're mad
        if (highestExpression[0] == 'angry') {
            dx = 10;
            dy = 10;
        }


        // Floating animation
        function floatButton() {
            x += dx;
            y += dy;

            // Bounce off edges
            if (x <= 0 || x >= window.innerWidth - 100) dx *= -1;
            if (y <= 0 || y >= window.innerHeight - 50) dy *= -1;

            btn.style.left = x + 'px';
            btn.style.top = y + 'px';

            requestAnimationFrame(floatButton);
        }

        // Start floating when added
        let btnArea = document.querySelector('.desktop-container');
        if (btnCount <= 30) { // only allows 30 buttons to be shown on the interface
            btnArea.append(btn);
            floatButton(); // runs animation
        } else {
            checkForEmotionVariety()
        }

        btnCount++; // adds up the button count

        // change background based on clicked emotion
        btn.addEventListener('click', () => {
            btn.remove();
            handleEmotion(btn.textContent);
            updateStats(btn.textContent);
            onEmotionClick(btn.textContent);

            let body = document.querySelector('body');
            // updates background colour
            if (btn.textContent == 'sad') {
                body.style.backgroundColor = 'lightblue';

            } else if (btn.textContent == 'angry') {
                body.style.backgroundColor = 'coral';

            } else if (btn.textContent == 'neutral') {
                body.style.backgroundColor = 'white';

            } else if (btn.textContent == 'happy') {
                body.style.backgroundColor = 'lightgreen';

            } else if (btn.textContent == 'surprised') {
                body.style.backgroundColor = 'plum';
            }

        });

    }

    // Event listner for the video stream
    video.addEventListener('play', () => {
        setInterval(async () => { // set up the faceapi
            const detections = await faceapi.detectAllFaces(video,
                new faceapi.TinyFaceDetectorOptions()).withFaceExpressions() // detects different facial expressions 

            // once it starts detecting faces keep track of the most frequent face expression shown 
            if (detections.length > 0) {
                const expressions = detections[0].expressions;
                const highestExpression = Object.entries(expressions).reduce((prev, curr) => {
                    return curr[1] > prev[1] ? curr : prev; // returns the highest value in the array
                });

                handlePlayerFaces(highestExpression[0]);

                // Update top highest emotion
                let top = Object.entries(playerFaces).reduce((a, b) => b[1] > a[1] ? b : a);
                document.querySelector('#highestEmotion').textContent = `${top[0]} (${top[1]}x)`;

                // Displays to the user what face expression they are currently showing
                document.querySelector('.miniGame #question').innerHTML = `Current expressed emotion: <b>${highestExpression[0]}</b>`;

                // creates the flying buttons with the expression names
                createFlyingButtons(highestExpression);
            }
        }, 100)
    })



    /* Checks the repeated count of the emotions*/
    function checkIfPlayerUnderstandsHumans() {
        const repeatedEnough = Object.values(clickedEmotions).filter(count => count >= 1);
        // checks to see if the user met the minimum of repeated encounters
        if (repeatedEnough.length >= 3) {
            endGameSequence(); // the user has won!
        }
    }

    /** checks to see if the user made at least three different expressions*/ 
    function checkForEmotionVariety() {
        if (encounteredEmotions.size <= 3) {
            showNotEnoughVarietyMessage();
        }
    }

    /**Shows the error message and redirects the user back to the map page */
    function showNotEnoughVarietyMessage() {
        // deletes all the moving the buttons 
        document.querySelectorAll('.btn').forEach(btn => btn.remove());

        const message = document.createElement('div');
        message.className = 'alien-warning-message';
        message.innerHTML = `
            <h2>Insufficient Emotional Data</h2>
            <p>You must encounter various emotions to understand humans.</p>
            <p>Try again and engage with more feelings.</p>
        `;
        document.body.appendChild(message);

        setTimeout(() => {
            window.location = './map.html'
        }, 10000)
    }

    /** Function to end the game  */
    function endGameSequence() {
        // deletes all the moving the buttons 
        document.querySelectorAll('.btn').forEach(btn => btn.remove());

        const message = document.createElement('div');
        message.className = 'alien-end-message';
        message.innerHTML = `
            <h2>Understanding Achieved</h2>
            <p>Through repeated exposure, the alien has begun to comprehend the complexity of human emotion.</p>
            <p>Challenge completed. ✅</p>
        `;
        document.body.appendChild(message);

        // timeout to redirect the user out of the game
        setTimeout(() => {
            window.location = './map.html';
        }, 10000)
    }


};  