/**
 * Frogfrogfrog Mod Jam
 * Jolene Bodika
 * 
 *  Frog loves to eat and grows bigger with each meal.
 *  However, Frog can't eat fruit, or it will get a stomach ache.
 *  Frog is also afraid of snakes.
 *  Frog needs to be careful not to eat too much.
 *  
 * 
 * Instructions:
 * - Move the frog with your mouse
 * - Click to launch the tongue
 * - Catch as many flies possible
 * - Once you reach a score of 50 avoid touching the snake or you will get eaten
 * - Avoid eating fruits (red circles,green circles,orange circles)
 * 
 * Made with p5
 * https://p5js.org/
 * 
 * Attributions
- Red Pixelated Heart Image from Pixabay: https://pixabay.com/illustrations/pixel-heart-heart-pixel-symbol-red-2779422/
- Blank Pixelated Heart Image from PNG EGG: https://www.pngegg.com/en/png-cwvxw
- Frog Croaking from SoundSnap: https://www.soundsnap.com/frog_croaking_x1
- Error sound from SoundSnap: https://www.soundsnap.com/sound_design_user_interface_accent_mid_range_beep_01_notification_alert_error
- Code sample taken from ArtJam assignment by Jolene Bodika https://github.com/jbodika/CART-253/tree/main/Assignments/ArtJam 
 */
"use strict";

//DECLARE CONSTANT VARIABLES

// The evil snake
const snake = {
    body: {
        x: 90,
        y: 300,
        size: 100,
        colour: "#7E825D"

    }
};

// Our frog
const frog = {
    // The frog's body has a position and size
    body: {
        x: 320,
        y: 520,
        size: 150,
        colour: "#a8dd9b"
    },
    eyes: {
        colour: "#76ca62",
        leftEye: {
            x: 260,
            y: 460,
            size: 50,
            iris: {
                x: 250,
                y: 450,
                size: 35,
                colour: "orange"
            },
            pupil: {
                x: 243,
                y: 445,
                size: 20,
                colour: "#000"
            }
        },
        rightEye: {
            x: 390,
            y: 460,
            size: 50,
            iris: {
                x: 400,
                y: 450,
                size: 35,
                colour: "orange"
            },
            pupil: {
                x: 407,
                y: 445,
                size: 20,
                colour: "#000"
            }
        }
    },
    // The frog's tongue has a position, size, speed, and state
    tongue: {
        x: undefined,
        y: 480,
        size: 20,
        speed: 20, // Determines how the tongue moves each frame
        state: "idle", // State can be: idle, outbound, inbound,
        colour: "#ffa1a1"
    }
};


// All fruits have a position, size,colour, point value, min/max shaking values and speed of horizontal movement properties
const apples = {
    body: {
        x: 640, //width of canvas
        y: 200,
        size: 10,
        colour: 'red',
    },
    speed: 5,
    pointVal: -3,
    minShake: 0,
    maxShake: 0
};

const watermelon = {
    body: {
        x: 640, //width of canvas
        y: 200,
        size: 20,
        colour: 'green',
    },
    speed: 4,
    pointVal: -7,
    minShake: 0,
    maxShake: 0
};


const orange = {
    body: {
        x: 640, //width of canvas
        y: 200,
        size: 15,
        colour: 'orange',
    },
    speed: 3,
    pointVal: -5,
    minShake: 0,
    maxShake: 0
};

// All flies have a position, size,colour, point value, min/max shaking values and speed of horizontal movement properties
const houseFlies = {
    body: {
        x: 0,
        y: 200,
        size: 10,
        colour: '#181C14',
    },
    speed: 2,
    pointVal: 1,
    minShake: -0.5,
    maxShake: 0.35
};

const craneFlies = {
    body: {
        x: 0,
        y: 200, // Will be random
        size: 7,
        colour: '#697565',
    },

    speed: 1,
    pointVal: 3,
    minShake: -0.10,
    maxShake: 0.40
};

const fruitFlies = {
    body: {
        x: 0,
        y: 200, // Will be random
        size: 5,
        colour: '#3C3D37',
    },

    speed: 4,
    pointVal: 7,
    minShake: -0.50,
    maxShake: 0.80
};

// stores the score data
const score = {
    count: 0,
    colour: "#fff"
}

//DECLARE GLOABAL VARIABLES
let frogSound;
let errorSound;
let heartImg;
let blankHeartImg;
let fly;
let randomFruit;
let fruitArray = [apples, watermelon, orange];
let flyArray = [houseFlies, craneFlies, fruitFlies];
let expansionFrames = 0;
let yOffset = 0; // Variable to control the y-position of the image
let speed = 0.02; // Speed of the movement
let fliesSkipped = 0;

//DECLARE FLAG VARIABLES
let expanding = false;

/*
 *Function to load assets before the page is loaded
 */
function preload() {
    frogSound = loadSound("assets/sounds/frogCroaking.wav");
    errorSound = loadSound("assets/sounds/errorSound.wav");

    heartImg = loadImage("assets/images/pixelHeart.png");
    blankHeartImg = loadImage("assets/images/blankHeart.png");
}

/**
 * Creates the canvas and initializes the fly
 */
function setup() {
    createCanvas(640, 480);
    // Suspending the audio to wait for user input
    getAudioContext().suspend();
    fly = randomizeElement(flyArray); // assign the first random fly type to the fly variable
    randomFruit = randomizeElement(fruitArray); // assign the first random fruit to the randomFruit variable
    // Give the fly its first random position
    resetSettings();
}

/**
 * Draws elements on canvas
 */
function draw() {
    background("#87ceeb");
    if (gameInProgress()) {
        moveFly(fly);
        drawFly(fly);
        moveFrog();
        moveTongue();
        moveFruit(randomFruit);
        drawFruit(randomFruit); // draws the fruits 
        drawFrog();
        drawHearts();
        checkFruitTongueOverlap();
        checkTongueFlyOverlap();
        drawScore();

        // Harder level with snake appearing starts
        if (score.count > 50) {
            moveSnake();
            drawSnake();
        }
    }
    // frog expanding animation plays
    frogOverload();
}

/**
 * Keeps the game running until one of the conditions returns false
 */
function gameInProgress() {

    if (fliesSkipped == 4) { //End game if 4 flies have been skipped
        textSize(20);
        textAlign(CENTER);
        textStyle(BOLD);
        text('Game over \n Your score is ' + score.count, width / 2, height / 2);
        return false;
    }

    // If the score is over 100 the frog will expand
    if (score.count > 100 && !expanding) {
        expanding = true; // flag to expand the frog
    }

    // While the frog is expanding the game will keep running to show the animation
    if (expanding && expansionFrames < 100) {
        return true; //flag to expand the frog
    }

    // If expansionFrames reaches 100, the game ends
    if (expansionFrames >= 100) {
        textSize(20);
        textAlign(CENTER);
        textStyle(BOLD);
        text('Game over \n Your score is ' + score.count, width / 2, height / 2);
        return false;
    }
    // If the snake touches the frog
    if (checkOverlap(snake.body.x, snake.body.y, frog.body.x, frog.body.y, frog.body.size)) {
        textSize(20);
        textAlign(CENTER);
        textStyle(BOLD)
        text('You got eaten by a snake :( \nYour score is ' + score.count, width / 2, height / 2);
        return false;
    }


    return true;
}

/**
 * Moves the fly according to its speed
 * Resets the fly if it gets all the way to the right
 */
function moveFly(fly) {
    // Move the fly
    fly.body.x += fly.speed;

    // Add random shaking motion to both x and y values
    fly.body.x += random(fly.minShake, fly.maxShake); // Horizontal shake
    fly.body.y += random(fly.minShake, fly.maxShake); // Vertical shake 
    // Handle the fly going off the canvas
    if (fly.body.x > width) {
        // Select a random fly type
        fly = randomizeElement(flyArray);
        resetSettings(); // Reset the fly
        fliesSkipped++ // increment the fliesSkipped variable
    }
}



/**
 * Draws the fly as a black circle
 */
function drawFly(fly) {
    push();
    noStroke();
    fill(fly.body.colour);
    ellipse(fly.body.x, fly.body.y, fly.body.size);
    pop();
}


/**
 * Moves all parts of the frog to the mouse position on x
 */
function moveFrog() {
    frog.body.x = mouseX;

    // decremented the iris and pupil values of left eyes by 60 to keep them relative to the frog's body
    frog.eyes.leftEye.x = frog.body.x - 60;
    frog.eyes.leftEye.iris.x = frog.body.x - 60;
    frog.eyes.leftEye.pupil.x = frog.body.x - 60;

    // incremented the iris and pupil values of right eyes by 70 to keep them relative to the frog's body
    frog.eyes.rightEye.x = frog.body.x + 70;
    frog.eyes.rightEye.iris.x = frog.body.x + 70;
    frog.eyes.rightEye.pupil.x = frog.body.x + 70;

}

/**
 * Handles moving the tongue based on its state
 */
function moveTongue() {
    // Tongue matches the frog's x
    frog.tongue.x = frog.body.x;
    // If the tongue is idle, it doesn't do anything
    if (frog.tongue.state === "idle") {
        // Do nothing
    }
    // If the tongue is outbound, it moves up
    else if (frog.tongue.state === "outbound") {
        frog.tongue.y += -frog.tongue.speed;
        // The tongue bounces back if it hits the top
        if (frog.tongue.y <= 0) {
            frog.tongue.state = "inbound";

        }
    }
    // If the tongue is inbound, it moves down
    else if (frog.tongue.state === "inbound") {
        frog.tongue.y += frog.tongue.speed;
        // The tongue stops if it hits the bottom
        if (frog.tongue.y >= height) {
            frog.tongue.state = "idle";
        }
    }
}

/**
 * Moves the fruit accross the screen
 */
function moveFruit() {
    randomFruit.body.x -= randomFruit.speed;

    // If the fruit goes off the screen to the left, reset its position
    if (randomFruit.body.x < -randomFruit.body.size) { // if the x position is less than the fruit's width
        randomFruit.body.x = width; // Reset to start from the right side
        randomFruit.body.y = random(0, 300); // Set a new random y position
    }
}


/**
 * Draws a fruit on the screen
 */
function drawFruit(fruit) {
    push();
    noStroke();
    fill(fruit.body.colour);
    ellipse(fruit.body.x, fruit.body.y, fruit.body.size);
    pop();
}


/**
 * Displays the tongue (tip and line connection), eyes (right and left), and the frog (body)
 */
function drawFrog() {
    // Draw the tongue tip
    push();
    fill(frog.tongue.colour);
    noStroke();
    ellipse(frog.tongue.x, frog.tongue.y, frog.tongue.size);
    pop();

    // Draw the rest of the tongue
    push();
    stroke(frog.tongue.colour);
    strokeWeight(frog.tongue.size);
    line(frog.tongue.x, frog.tongue.y, frog.body.x, frog.body.y);
    pop();

    // Draw the frog's body
    push();
    fill(frog.body.colour);
    noStroke();
    ellipse(frog.body.x, frog.body.y, frog.body.size);
    pop();

    // Draw the frog's eyes 
    push();
    fill(frog.eyes.colour);
    noStroke();
    ellipse(frog.eyes.leftEye.x, frog.eyes.leftEye.y, frog.eyes.leftEye.size); // draw frog's left and right eyelids
    ellipse(frog.eyes.rightEye.x, frog.eyes.rightEye.y, frog.eyes.rightEye.size);
    pop();

    // Draw frog's left pupil and left iris
    push();
    noStroke();
    fill(frog.eyes.leftEye.iris.colour); // draw frog iris
    ellipse(frog.eyes.leftEye.iris.x, frog.eyes.leftEye.iris.y, frog.eyes.leftEye.iris.size);
    pop();

    // Draw frog's left pupil
    push();
    noStroke();
    fill(frog.eyes.leftEye.pupil.colour); // draw frog pupil
    ellipse(frog.eyes.leftEye.pupil.x, frog.eyes.leftEye.pupil.y, frog.eyes.leftEye.pupil.size);
    pop();

    // Draw frog's right iris
    push();
    noStroke();
    fill(frog.eyes.rightEye.iris.colour); // draw frog iris
    ellipse(frog.eyes.rightEye.iris.x, frog.eyes.rightEye.iris.y, frog.eyes.rightEye.iris.size);
    pop();

    // Draw frog's right pupil
    push();
    noStroke();
    fill(frog.eyes.rightEye.pupil.colour); // draw frog pupil
    ellipse(frog.eyes.rightEye.pupil.x, frog.eyes.rightEye.pupil.y, frog.eyes.rightEye.pupil.size);
    pop();



}

/**
 * Displays the pixelated hearts on the top right of the screen
 */
function drawHearts() {
    //  Create the up-down movement for the hearts with the sin() function
    yOffset = sin(frameCount * speed) * 5; // Adjust the amplitude by 5

    // checks how many flies escaped the frog and displays images of the pixelated hearts
    switch (fliesSkipped) {
        case 0:
            image(heartImg, width - 100, 30 + yOffset); // 3 out of 3 red hearts
            image(heartImg, width - 70, 30 + yOffset);
            image(heartImg, width - 40, 30 + yOffset);
            break;
        case 1:
            image(heartImg, width - 100, 30 + yOffset); // 2 out of 3 red hearts
            image(heartImg, width - 70, 30 + yOffset);
            image(blankHeartImg, width - 40, 30 + yOffset);
            break;
        case 2:
            image(heartImg, width - 100, 30 + yOffset); // 1 out of 3 red hearts
            image(blankHeartImg, width - 70, 30 + yOffset);
            image(blankHeartImg, width - 40, 30 + yOffset);
            break;

        case 3:
            image(blankHeartImg, width - 100, 30 + yOffset); // 0 out of 3 red hearts
            image(blankHeartImg, width - 70, 30 + yOffset);
            image(blankHeartImg, width - 40, 30 + yOffset);
            break;
    }

}

/**
 * Displays the frog exploding and filling up the screen
 */
function frogOverload() {
    // check if expanding flag is true and expansionFrames is less 100 to fully show the frog expanding
    if (expanding && expansionFrames < 100) {
        frog.body.size += 100; // Increase the size of the frog
        textSize(20);
        textAlign(CENTER);
        textStyle(BOLD);
        text('Oh no! You ate too much...', width / 2, height / 2);
        expansionFrames++; // Increment the frames
    }

}
/**
 * Draws the score on the top right of the screen
 */
function drawScore() {
    push();
    textSize(20);
    textAlign(RIGHT, TOP);
    textStyle(BOLD);
    fill(score.colour);
    text('Score: ' + score.count, width - 10, 10);
    pop();
}

/**
 *  Returns a single object from an array picked randomly  
 */
function randomizeElement(array) {
    return array[Math.floor(Math.random() * array.length)]; // returns a single object from the array argument passed 
}

/**
 * Moves the snake's body
 */
function moveSnake() {
    snake.body.y = constrain(snake.body.y, 0, height)
    snake.body.y += 5; // makes the snake go down the y axis of the canvas

}

/** Draws snake*/
function drawSnake() {
    push();
    stroke(snake.body.colour);
    strokeWeight(snake.body.size);
    line(snake.body.x, 20, snake.body.x, snake.body.y);
    pop();

}

/**
 * Resets objects properties
 */
function resetSettings() {
    // resets fly x and y positions
    fly.body.x = 0;
    fly.body.y = random(70, 300); // random position on y axis for the fly to appear on

    // resets snake x and y positions
    snake.body.x = random(70, width - 200); // picks a random position for the snake to appear from
    snake.body.y = 0;

    // resets the random fruit's y position
    randomFruit.body.y = random(0, 300); // picks a random y position for the fruit

    score.colour = "#fff"; // reset score to default white colour
}



/**
 * Handles the tongue overlapping the fly
 */
function checkTongueFlyOverlap() {
    // Get distance from tongue to fly
    const d = dist(frog.tongue.x, frog.tongue.y, fly.body.x, fly.body.y);
    // Check if it's an overlap
    const eaten = (d < frog.tongue.size / 2 + fly.body.size / 2);
    if (eaten) {
        fly = randomizeElement(flyArray); // Select a random fly type
        randomFruit = randomizeElement(fruitArray); // returns a random fruit to display 
        randomFruit.body.x = 0; // reset the fruit's x position to 0


        resetSettings(); // Reset objects properties
        frog.tongue.state = "inbound"; // Bring back the tongue
        score.count += fly.pointVal; // increment the score based on the point value of the fly
        frog.body.size += fly.pointVal; // increase the size of the frog
        frogSound.play(); // play the frog sound

    }
}


/**
 *  Checks if the frog's tongue touches the fruit 
 */
function checkFruitTongueOverlap() {
    if (checkOverlap(randomFruit.body.x, randomFruit.body.y, frog.tongue.x, frog.tongue.y, frog.tongue.size)) {
        score.count += randomFruit.pointVal; // increment the score based on the point value of the fruit
        randomFruit = randomizeElement(fruitArray); // returns a random fruit to display
        randomFruit.body.x = 0; // reset the fruit's x position to 0
        errorSound.play(); //play error sound
        score.colour = "red" // sets the score colour to red 
        frog.tongue.state = "inbound";
    }
}


/* Checks if the cursor overlaps with an object
 *
 * @param firstValPosX - Object 1's value X position
 * @param firstValPosY - Object 1's value Y position
 * @param secondValPosX - Object 2's value X position
 * @param secondValPosY - Object 2's value Y position
 * @param secondValSize - Object 2's size value
 */
function checkOverlap(firstValPosX, firstValPosY, secondValPosX, secondValPosY, secondValSize) {
    const distance = dist(firstValPosX, firstValPosY, secondValPosX, secondValPosY); // code snippet taken from Art Jam assignment 
    // calculates the distance between the first value's X position and first value's Y position positions and the second value's X and y positions
    return (distance < secondValSize / 2); //checks if the distance is lower than the radius of the size of the second value if yes then it is overlapping if no then it is not overlapping
}

/**
 * Launch the tongue on click (if it's not launched yet)
 */
function mousePressed() {
    if (frog.tongue.state === "idle") {
        //Allow audio after user input
        userStartAudio();
        frog.tongue.state = "outbound";
    }
}
