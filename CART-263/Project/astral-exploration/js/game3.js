window.onload = function () {
    const encounteredEmotions = new Set();

    const video = document.querySelector("#video");
    let textField = document.querySelector('.writeText');

    // runs the typewriting animation through the API 
    new Typewriter(textField, {
        strings: ['⊑⟒⌰⌰⍜ ⍙⟒⌰☊⍜⋔⟒ ⎎⟒⌰⌰⍜⍙ ⏃⌰⟟⟒⋏!', 'My apologies, you cannot read ⏚⌰⍜⍀⏚⊬', 'Translating ⏚⌰⍜⍀⏚⊬ to ENGLISH','You need to find a way to understand earthlings'],
        loop: false,
        delay: 30,
        autoStart: true
    })



    // delays the video stream to build anticipation
    setTimeout(() => {
        Promise.all([
            faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
            faceapi.nets.faceExpressionNet.loadFromUri('/models')
        ]).then(setUpVideo)
    }, 24000)


    /**Function to set upvideo stream */
    function setUpVideo() {
        navigator.getUserMedia({ video: {} },
            stream => video.srcObject = stream,
            error => console.error(error)
        )
    }

    let btnCount = 0

    const alienMemory = {};
    const alienMemoryCount = {};
    const playerFaces = {};

    function handleEmotion(emotion) {
        if (!alienMemory[emotion]) {
            alienMemory[emotion] = 1;
            alienFirstTimeReaction(emotion);
        } else {
            alienMemory[emotion]++;
            alienRepeatReaction(emotion, alienMemory[emotion]);
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

            const img = document.createElement('img');
            img.src = `../assets/${emotion}.png`;
            img.alt = emotion;
            img.className = 'emotion-icon';

            const span = document.createElement('span');
            span.textContent = `${emotion}: ${alienMemoryCount[emotion]}`;

            emotionItem.appendChild(img);
            emotionItem.appendChild(span);
            statsList.appendChild(emotionItem);
        } else {
            emotionItem.querySelector('span').textContent = `${emotion}: ${alienMemoryCount[emotion]} (${alienMemoryCount[emotion]}/2)`;
        }

       }

/**
 *  Display prompts based on specific emotions
 * @param {*} emotion 
 */
    function alienFirstTimeReaction(emotion) {
        const reactions = {
            happy: "Subject radiates... warmth. Unknown feeling: H-A-P-P-Y.",
            sad: "Water exits eye region. Is unit damaged?",
            surprised: "Sudden expansion of eyes detected. Threat or joy?",
            angry: "Color red. Increase in vocal decibels. Danger?",
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
 * Function to count the amount of different expressions that the player is making during gameplay
 * 
 * @param {*} expression
 */
    function handlePlayerFaces(expression){
        if (!playerFaces[expression]) {
            playerFaces[expression] = 1;
        } else {
            playerFaces[expression]++;
        } 
    }

    video.addEventListener('play', () => {
        setInterval(async () => { // set up the faceapi
            const detections = await faceapi.detectAllFaces(video,
                new faceapi.TinyFaceDetectorOptions()).withFaceExpressions() // detects different facial expressions 

            if (detections.length > 0) {
                const expressions = detections[0].expressions;
                const highestExpression = Object.entries(expressions).reduce((prev, curr) => {
                    return curr[1] > prev[1] ? curr : prev; // returns the highest value in the array
                });
                
                handlePlayerFaces(highestExpression[0]);
              
                  // Update top highest emotion
                 let top = Object.entries(playerFaces).reduce((a, b) => b[1] > a[1] ? b : a);
                document.querySelector('#highestEmotion').textContent = `${top[0]} (${top[1]}x)`;
   
                document.querySelector('.miniGame #question').innerHTML = `Current expressed emotion: <b>${highestExpression[0]}</b>`;

                let btn = document.createElement('button');
                let emotion = highestExpression[0]; 
                encounteredEmotions.add(emotion);
                btn.textContent = emotion;

                btn.setAttribute('class', 'btn');
                btn.style.position = 'absolute'; 
                btn.style.left = '50px';
                btn.style.top = '50px';

                let x = Math.random() * (window.innerWidth - 150 - 200);
                let y = Math.random() * (window.innerHeight - 150 - 200);
                let dx = (Math.random() - 0.5) * 2;
                let dy = (Math.random() - 0.5) * 2;

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
                if (btnCount <= 30) {
                    btnArea.append(btn);
                    floatButton();
                } else {
                    checkForEmotionVariety()
                }
                btnCount++;
               

                btn.addEventListener('click', () => {
                    btn.remove();
                    handleEmotion(btn.textContent)
                    updateStats(btn.textContent)    
                    onEmotionClick(btn.textContent)
                    let body = document.querySelector('body')
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
        }, 100)
    })
    const clickedEmotions = {};

    // stores data related to the clicked emotion to keep track
    function onEmotionClick(emotion) {
        if (!clickedEmotions[emotion]) {
            clickedEmotions[emotion] = 1;
        } else {
            clickedEmotions[emotion]++;
        }

        checkIfPlayerUnderstandsHumans();
    }

// Checks the repeated count of the emotions
    function checkIfPlayerUnderstandsHumans() {
        const repeatedEnough = Object.values(clickedEmotions).filter(count => count >= 2);
        // checks to see if the user met the minimum of repeated encounters
        if (repeatedEnough.length >= 3) {
            endGameSequence(); // they’ve earned it!
        }
    }
    // checks to see if the user made at least three different expressions
    function checkForEmotionVariety() {
        if (encounteredEmotions.size <= 3) {
            showNotEnoughVarietyMessage();
        }
    }

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
            window.location = '/map.html'
        }, 10000)
    }

    // Ends the game 
    function endGameSequence() {
        // deletes all the moving the buttons 
        document.querySelectorAll('.btn').forEach(btn => btn.remove());

        const message = document.createElement('div');
        message.className = 'alien-end-message';
        message.innerHTML = `
            <h2>Understanding Achieved</h2>
            <p>Through repeated exposure, the alien has begun to comprehend the complexity of human emotion.</p>
            <p>Mission Log Updated.</p>
        `;
        document.body.appendChild(message);

        // timeout to redirect the user out of the game
        setTimeout(() => {
            window.location = '/map.html';
        }, 10000)
         }


};  