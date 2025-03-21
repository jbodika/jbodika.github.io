//TODO: add a timer to the guessing
//TODO: fix the choppy face recognition

window.onload = function() {

    // TODO: Integrate a chat gpt prompts so that the prompts change every time so the user doesn't get bored
    let randomPrompts = [
        ["You're at a bakery and decide to try a freshly baked cookie. As you take a big bite, expecting the sweet taste of chocolate chips, you instead get a strange, mushy texture mixed with an odd sourness. The person next to you laughs and says, 'Oh no, that was the expired batch!' What do you feel?", 'disgusted'],
        ['Alexandra grabs your phone off the table without asking, saying they just need to check something quickly. As they turn to hand it back, it slips from their hand and crashes onto the floor, leaving a deep crack on the screen. They laugh nervously and say, "Oops, my bad." How do you react?', 'angry'],
        ["You're walking home alone on a quiet street when you suddenly hear fast footsteps behind you. Your heart races as the sound gets closer, and just as you turn around, a shadowy figure reaches out toward you. The streetlight flickers for a moment, making it even harder to see who it is. How do you react?", 'fearful'],
        ["After a stressful week, you walk into your room and notice a small box on your desk with your name on it. You open it to find a handwritten note from a close friend, along with your favorite snack and a tiny gift they knew you'd love. The note reads, 'Just a little something to make you smile.' How do you feel?", 'happy'],
        ["You've been looking forward to meeting up with your best friend all week. Just as you're about to leave, they text, saying they can't make it—again. You stare at your phone, realizing this is the third time this month they've canceled last minute. How do you feel?", 'sad'],
        [' As you walk into your home, the lights suddenly turn on, and a group of friends jumps out yelling, "Surprise!" The room is decorated with balloons, and a cake with your name on it sits on the table. You had no idea they were planning this, and everyone is waiting to see your reaction. How do you respond?', 'surprised'],
    ];
    const video = document.querySelector("#video");
    let currPrompt = randomPrompts[randomizeValue(randomPrompts)] // declare global variables
    let letterCount = 0;
    let sentenceIndex = 0
    let introArr = ['⊑⟒⌰⌰⍜ ⍙⟒⌰☊⍜⋔⟒ ⎎⟒⌰⌰⍜⍙ ⏃⌰⟟⟒⋏!', 'My apologies, you cannot read ⏚⌰⍜⍀⏚⊬', 'Translating ⏚⌰⍜⍀⏚⊬ to ENGLISH', 'A', '⍀', 'You need to find a way to understand earthlings'];


    function typeWriter(sentence) {
        console.log(sentence)
        if (letterCount < sentence.length) {
            document.querySelector('.writeText').append(sentence.charAt(letterCount));
            letterCount++;
            setTimeout(() => typeWriter(sentence), 25);
        } else {
            // jump to the next sentence
            setTimeout(() => {
                sentenceIndex++;

                if (sentenceIndex < introArr.length) {
                    document.querySelector('.writeText').innerHTML = ""; // adds a line break
                    letterCount = 0; // reset letter count
                    typeWriter(introArr[sentenceIndex]); // start next sentence
                }


            }, 500);
        }
    }

    // starts the typerwritting animation with the first sentence
    typeWriter(introArr[sentenceIndex]);

    /**Function to randomize values */
    function randomizeValue(arr) {
        return Math.floor(Math.random() * arr.length)
    }

    Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
        faceapi.nets.faceExpressionNet.loadFromUri('/models')
    ]).then(setUpVideo)

    /**Function to set upvideo stream */
    function setUpVideo() {
        navigator.getUserMedia({ video: {} },
            stream => video.srcObject = stream,
            error => console.error(error)
        )
    }

    video.addEventListener('play', () => {
        setInterval(async() => { // set up the faceapi
            const detections = await faceapi.detectAllFaces(video,
                    new faceapi.TinyFaceDetectorOptions()).withFaceExpressions() // detects different facial expressions 
            if (detections.length > 0) {
                const expressions = detections[0].expressions;
                const highestExpression = Object.entries(expressions).reduce((prev, curr) => {
                    return curr[1] > prev[1] ? curr : prev; // returns the highest value in the array
                });

                humanityGame(highestExpression[0]) // starts the game
            }
        }, 100)
    })

    /**Game Logic */
    let isUpdating = false; // flag to prevent continuous prompt updates

    function humanityGame(expression) {
        if (isUpdating) return; // check if prompt is updating

        document.querySelector('.miniGame #question').innerHTML = currPrompt[0];

        if (currPrompt[1] === expression) {
            document.querySelector('.miniGame #result').innerHTML = 'YOU GUESSED IT';
            isUpdating = true; // pause update

            setTimeout(() => {
                // Remove the matched prompt from randomPrompts
                let indexToRemove = randomPrompts.findIndex(el => el[1] === expression);
                if (indexToRemove !== -1) {
                    randomPrompts.splice(indexToRemove, 1);
                }

                // check if the random prompts is empty
                if (randomPrompts.length > 0) {
                    currPrompt = randomPrompts[randomizeValue(randomPrompts)];
                    console.log(currPrompt);
                } else {
                    currPrompt = ["No more prompts", ""];
                }

                document.querySelector('.miniGame #result').innerHTML = "";
                isUpdating = false; // continue prompt update
            }, 1000);
        }
    }


}