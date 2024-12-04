/*
 * Vee's Smoothie Shop - Main Screen
 * Jolene Bodika
 * This is the main screen that the user sees upon loading the game for the first time. 
 *
 * Controls:
 * Click anywhere on the canvas to see what Vee has to say.
 * Press 'L', 'I', or 'E' to play one of the game variations 
 *
 * Uses:
 * p5.js library
 * https://p5js.org
 * GoogleFonts API
 *https://developers.google.com/fonts
 *
 * View the README for the complete attribution list
 */
"use strict"


let veeImg;
let veeTalking;
let currSpeechIndex = 0; // starts at the first speech 
let orangeSmoothieImg;
let cherrySmoothieImg;
let limeSmoothieImg;
let blenderImg = {
    image: undefined
};
let gameState = 'main';

// Cabinets that are drawn at top of the canvas
const cabinets = {
    x: 0, // starting position for the first cabinet, this will change for the others
    y: 10,
    size: 95

};

const cabinetHandles = {
    x: 75, // starting position for the first cabinet handle, this will change for the others
    y: 60,
    size: 10

};

// Created an object that holds the default values used when displaying an image on the main screen to avoid repetition in code 
const defaultImg = {
    size: {
        x: 50,
        y: 50
    },
    y: 400

};

// Object variable for the chairs at the counter
const chairs = {
    baseRing: {
        x: 100,
        y: 740,
        size: {
            x: 60,
            y: 20
        }
    },
    seat: {
        x: 100,
        y: 530,
        size: {
            x: 120,
            y: 30
        }
    },
    base: {
        x: 87,
        y: 540,
        size: {
            x: 25,
            y: 200
        }
    }


};



/**
 * Dsiplays the pixel smoothie and blender on the countertop
 */
function drawDecorations() {
    // image(strawberrySmoothie, 520, defaultImg.y, defaultImg.size.x, defaultImg.size.y)
    image(cherrySmoothieImg, 720, defaultImg.y, defaultImg.size.x, defaultImg.size.y);
    image(limeSmoothieImg, 130, defaultImg.y, defaultImg.size.x, defaultImg.size.y);
    image(orangeSmoothieImg, 330, defaultImg.y, defaultImg.size.x, defaultImg.size.y);
    image(blenderImg, 700, 285, 40, 70);

}

/**
 * Displays the short text for the user to read
 */
function drawWelcomeMessage() {
    //  Create the up-down movement for the hearts with the sin() function
    let speed = 0.05;
    let yOffset = sin(frameCount * speed) * 5; // Adjust the amplitude by 5

    // display shading green for the text
    push();
    fill('#a64d79');
    stroke('pink');
    strokeWeight(5);

    textSize(80);
    text('Vee\'s\nSmoothie\nShop!', 50, 205 + yOffset);
    pop();

    // displays the main pink for the text
    push();
    stroke('pink');
    strokeWeight(5);

    // displays the secondary pink for the text
    fill('#c27ba0');
    textSize(80);
    text('Vee\'s\nSmoothie\nShop!', 55, 200 + yOffset);
    pop();
}


/**
 * Draws Vee's speech bubble
 */
function drawSpeechBubble() {
    push();
    stroke('pink');
    fill('#FBF9D3');
    strokeWeight(5);
    rect(600, 120, 175, 190, 20); // rectangle speech bubble with rounded borders
    pop();
}

/**
 * Displays text 
 */
function drawVeesSpeech() {
    push();
    fill('#ffbcda');
    stroke('#946656');
    strokeWeight(3);
    textSize(30);
    // if theres a value that matches the current speech index it will change the text value in the speech bubble
    if (veeTalking.speech[currSpeechIndex]) {
        text(veeTalking.speech[currSpeechIndex].text, 610, 150);
    }
    pop();
}
/**
 * Draws the floor section
 */
function drawFloor() {
    // Ground
    push();
    noStroke();
    fill('#c9c3bd');
    rect(0, height - 100, width, 500);
    pop();

    //White floor border 
    push();
    noStroke();
    fill('#fff');
    rect(0, height - 100, width, 20);
    pop();

}

/**
 * Draws the refelctive glass effect on the window
 */
function drawReflectiveGlass() {

    push();
    //bottom half of the effect
    noStroke();
    fill(219, 225, 227, 127);
    rect(50, 170, 700, 140);

    // top half of the effect
    fill(167, 199, 203, 127);
    triangle(50, 170, 50, 310, 750, 170);
    pop();

}

/**
 * Draws background window
 */
function drawWindow() {
    push();
    strokeWeight(10);
    stroke('white');
    fill('#CAE9F5');
    rect(50, 170, 700, 140);
    pop();

}

/**
 * Draws the counter that shows up behind Vee
 */
function drawBackgroundCounter() {
    push();
    noStroke();
    fill('#fffff2');
    rect(0, 340, width, 50);
    pop();

    push();
    noStroke();
    fill('#D4D4D4');
    rect(0, 380, width, 30);
    pop();

}

/**
 * Draws the 3 cabinets at top 
 */
function drawCabinets() {
    push();
    fill('#fffff2');
    noStroke();
    rect(0, 0, width, 115);
    pop();
    // draws the cabinets at the top to fill up space
    for (let i = cabinets.x; i < 800; i += 100) {

        // draws the square section cabinet 
        push();
        noStroke();
        fill('#ECECEC');
        rect(i, cabinets.y, cabinets.size);
        pop();

        // draws the handle to the cabinet
        push();
        push();
        stroke('#c0c0c0');
        fill('#D4D4D4');
        ellipse(cabinetHandles.x + i, cabinetHandles.y, cabinetHandles.size);
        pop();
    }
}

/**
 * Draws the chairs for the store
 */
function drawChairs() {
    for (let i = 0; i < 800; i += 200) {
        // base of the chair ring
        push();
        strokeWeight(0.1);

        fill("#D4D4D4");

        ellipse(chairs.baseRing.x + i, chairs.baseRing.y, chairs.baseRing.size.x, chairs.baseRing.size.y);
        pop();
        // base of the chair
        push();
        strokeWeight(0.1);
        fill('#c0c0c0');
        rect(chairs.base.x + i, chairs.base.y, chairs.base.size.x, chairs.base.size.y);
        pop();

        // seat of the chair
        push();
        fill('#D4D4D4');
        strokeWeight(0.1);

        ellipse(chairs.seat.x + i, chairs.seat.y, chairs.seat.size.x, chairs.seat.size.y);
        pop();
    }

}
/*
 *   Draws Counter of the store 
 */
function drawStoreCounter() {

    // Draw counter colour
    push();
    noStroke();
    fill('#c79274');
    rect(0, 420, width, 285);
    pop();


    //White counter
    push();
    noStroke();
    fill('#fffff2');
    rect(0, height - 400, width, 50);
    pop();

    //White border
    push();
    noStroke();
    fill('#D4D4D4');
    rect(0, height - 350, width, 20);
    pop();

    //Shade on purple countertop 
    push();
    noStroke();
    fill('#946656');
    rect(0, height - 330, width, 10);
    pop();

}