/*
 * Jolene Bodika
 * SmooVees - Right Place Bad Time
 * In this 'mini-game' story, you’re very hungry after your shift and notice all the food on the counter, so you decide to eat it all.
 *
 * Controls:
 * Hover over all the ingredients to collect them.
 * Wait for the reading screen to pass.
 * Respond to a prompt by clicking on the button.
 *
 * Uses:
 * p5.js library
 * https://p5js.org
 * GoogleFonts API
 *https://developers.google.com/fonts
 *
 * Check README for full attribution list
 */
"use strict";
let evilIndex = 0;
let answerBtn;
let vee = new Vee(undefined, 0, 10, 200, 600);
let veeMood = 'neutral';
let veeTextArea = new TextArea(20, 675, 500, 80, 20);
//all ingredients
let evilApple = new Ingredient("Green Apple", undefined, undefined, 670, 450, 32, "cut", "cut");
let evilAvocado = new Ingredient("Avocado", undefined, undefined, 700, 450, 64, "cut", "cut");
let evilBanana = new Ingredient("Banana", undefined, undefined, 600, 430, 64, "cut", "cut");
let evilChiaSeeds = new Ingredient("Chia Seeds", undefined, undefined, 740, 500, 90, "plop", "scoop");
let evilCocoaPowder = new Ingredient("Cocoa Powder", undefined, undefined, 775, 350, 90, "plop", "scoop");
let evilCoconut = new Ingredient("Coconut Water", undefined, undefined, 450, 375, 64, "cut", "cut");
let evilFrozenBerries = new Ingredient("Frozen Berries", undefined, undefined, 670, 260, 125, "solidPour", "scoop");
let evilHoneyjar = new Ingredient("Honey", undefined, undefined, 510, 450, 90, "plop", "scoop");
let evilMango = new Ingredient("Mango Chunks", undefined, undefined, 500, 375, 64, "cut", "cut");
let evilMilk = new Ingredient("Milk", undefined, undefined, 450, 290, 85, "liquidPour", "pour");
let evilOrange = new Ingredient("Orange", undefined, undefined, 630, 400, 32, "cut", "cut");
let evilOrangeJuice = new Ingredient("Orange Juice", undefined, undefined, 325, 300, 80, "liquidPour", "pour");
let evilPeanutButter = new Ingredient("Peanut Butter", undefined, undefined, 550, 400, 64, "plop", "scoop");
let evilPineapple = new Ingredient("Pineapple Chunks", undefined, undefined, 720, 375, 125, "cut", "cut");
let evilSpinach = new Ingredient("Spinach Leaves", undefined, undefined, 635, 350, 64, "cut", "cut");
let evilStrawberry = new Ingredient("Strawberry", undefined, undefined, 635, 480, 32, "cut", "cut");
let evilWater = new Ingredient("Water", undefined, undefined, 400, 300, 80, "liquidPour", "pour");
let evilWatermelon = new Ingredient("Watermelon", undefined, undefined, 550, 300, 125, "cut", "cut");
let evilYogurt = new Ingredient("Yogurt", undefined, undefined, 750, 280, 64, "plop", "scoop");
let evilIngredients = [evilApple, evilAvocado, evilBanana, evilChiaSeeds, evilCocoaPowder, evilCoconut, evilFrozenBerries, evilHoneyjar, evilMango, evilMilk, evilOrange, evilOrangeJuice, evilPeanutButter, evilPineapple, evilSpinach, evilStrawberry, evilWater, evilWatermelon]

let currentScene = null // trigger variable for the different scenes
    /**
     * Function to switch picture of the character
     */
function displayVee() {
    vee.height = 600;
    vee.width = 200;
    if (veeMood === 'neutral') {
        vee.image = veeImg;

    }
    if (veeMood === 'angry') {
        vee.image = veeAngry;
    } else if (veeMood === 'crazy') {
        vee.image = veeCrazy;

    } else if (veeMood === 'happy') {
        vee.image = veeHappy;
    } else if (veeMood === 'sad') {
        vee.image = veeSad;
    }
    vee.display();

    veeTextArea = new TextArea(200, 600, 400, 100, 20);

    evilVeeTalking.speech.forEach((el) => {
        veeTextArea.addText(el.text, 410, 630, 20);
    })
    veeTextArea.display('black', '#000');
}

/**
 *  removes ingredients from the array and the canvas
 *  
 * */
function removeIngredients() {
    evilIngredients.forEach((element, index) => {
        if (checkOverlap(mouseX, mouseY, element.x, element.y, element.size)) {
            veeMood = 'sad';
            // Remove the element from the array
            evilIngredients.splice(index, 1);
        }
    });


}

/**  
 * displays all the ingredients on the canvas
 */
function displayItems() {
    evilIngredients.forEach((element) => {
        element.display();
    });
}


function moveVee() {
    if (evilIngredients.length === 0) {
        veeMood = 'happy';
        // Move Vee to the right
        vee.x += 2; // Increase Vee's x position
        incorrectIngredientsCount += 2;

        push();
        fill('#00000080'); // adds a translucent layer to the canvas for scenery
        rect(0, 0, 800, 800);
        pop();
    }
    // If Vee gets outside the canvas
    if (vee.x >= width) {
        changeScene('darkScene'); // assign the new scene
    }

}

let textBlock = {
    x: 100,
    y: 100,
    text: ""
};

function darkScene() {
    textBlock.text = "Why did you take my food?";
    background('black');

    // Reset Vee's position and display
    vee.x = 200;
    veeMood = 'crazy';

    vee.height = 2000;
    vee.width = width;

    vee.display();

    // Add text or effects
    push();
    fill('white');
    textSize(32); // Display the text
    textAlign(CENTER);
    text(`${textBlock.text}`, textBlock.x, textBlock.y);
    pop();

    // Limits the text to not completly get lost outside the canvas
    textBlock.x = constrain(textBlock.x, textBlock.x + 1, 500);
    // If the text ges outside the canvas +200
    if (textBlock.x >= width + 200) {
        changeScene('redScene'); // change scenery
    }

}
/**
 * Function to assign the currentScene variable to a scene
 * @param {string} newScene - target secene to assign
 */
function changeScene(newScene) {
    clear();
    currentScene = newScene;

}

/**
 * Function to alternate between the different scenes
 */
function changeOfScenery() {
    if (currentScene == 'darkScene') {
        darkScene();
    } else if (currentScene == 'redScene') {
        redScene();
    } else if (currentScene == 'endScene') {
        endScene();
    }

}

/**
 * Fuction to create button to respond
 */
function drawAnswerBtn() {
    if (!answerBtn) {
        answerBtn = createButton('I got hungry 😅');
        answerBtn.parent("canvasDiv");
        answerBtn.position(30, 650);
        answerBtn.addClass('btn'); //for styling purposes
    }
    answerBtn.mousePressed(() => { // event listener
        answerBtn.hide(); // hides the button 
        changeScene('endScene');

    });
}
/**
 * Function to display the last scene of the story
 */
function endScene() {
    background('white');
    let shakeAmount = 5; // Amount of shake
    let shakeX = random(-shakeAmount, shakeAmount);
    let shakeY = random(-shakeAmount, shakeAmount);

    vee.x = 0 + shakeX; // Apply random offset to x
    vee.y = height / 2 + shakeY; // Set y position with shake

    veeMood = 'angry';

    // set height and width to make her appear very up close
    vee.height = 2000;
    vee.width = width;

    vee.display();

    // Text to display
    textBlock.text = `HUNGRY? You..you..yo-were\nhungry?!\n YOU ATE MY ENTIRE STOCK\n GET OUT OF MY FACE RIGHT NOW `;

    push();
    fill('black');
    textSize(32);
    textAlign(CENTER);
    text(`${textBlock.text}`, 400, textBlock.y);
    pop();


}



function redScene() {
    clear();
    background('#800000');
    textBlock.text = "Tell Vee, Vee is understanding."

    veeMood = 'crazy';

    // Reset Vee's position and display
    vee.x = 200;
    // set height and width to make her appear very up close
    vee.height = 2000;
    vee.width = width;

    vee.display();

    push();
    fill('white');
    textSize(32); // display Vee's answer
    textAlign(CENTER);
    text(`${textBlock.text}`, 270, textBlock.y);
    pop();
    drawAnswerBtn();
}