/*Jolene Bodika
*
* script.js holds all the common functions that this project uses and serves as a connector for 
* the various components and features, ensuring smooth interaction between them.
* 
*   
* Controls:
*  N/A
* Uses:
* p5.js library
* https://p5js.org
* GoogleFonts API
*https://developers.google.com/fonts
*

 */
"use strict"

let bagelFatOneFont;

let evilVeeTalking;

let knifeSound;
let liquidPourSound;
let solidPourSound;
let blenderSound;
let cashRegisterSound;
let putSound;
let swordSound;
let plopSound;
let sadTromboneSound;
let cupFalling;
let isLiquidTurn = true
let dialogActive = true;

let veeHappy;
let veeSad;
let veeCrazy;
let veeAngry;



let menuBtn;
let restartBtn;


let ingredientActionBtn;
let backBtn;

/**
 * Creates the canvas
 */
function setup() {
    var canvas = createCanvas(800, 800);
    canvas.parent("canvasDiv")
}

/*
 * Function to load assets before the page is loaded
 */
function preload() {
    //font
    bagelFatOneFont = loadFont('./assets/fonts/BagelFatOne-Regular.ttf');

    // all food elements, image is the image we see on the counter and openImage is the cut or poured version of the food element
    conflictApple.image = loadImage('./assets/images/apple.png');
    conflictApple.openImage = loadImage('./assets/images/openApple.png');
    apple.image = loadImage('./assets/images/apple.png');
    apple.openImage = loadImage('./assets/images/openApple.png');
    evilApple.image = loadImage('./assets/images/apple.png');
    evilApple.openImage = loadImage('./assets/images/openApple.png');

    // Avocado
    conflictAvocado.image = loadImage('./assets/images/avocado.png');
    conflictAvocado.openImage = loadImage('./assets/images/openAvocado.png');
    avocado.image = loadImage('./assets/images/avocado.png');
    avocado.openImage = loadImage('./assets/images/openAvocado.png');
    evilAvocado.image = loadImage('./assets/images/avocado.png');
    evilAvocado.openImage = loadImage('./assets/images/openAvocado.png');

    // Banana
    conflictBanana.image = loadImage('./assets/images/banana.png');
    conflictBanana.openImage = loadImage('./assets/images/openBanana.png');
    banana.image = loadImage('./assets/images/banana.png');
    banana.openImage = loadImage('./assets/images/openBanana.png');
    evilBanana.image = loadImage('./assets/images/banana.png');
    evilBanana.openImage = loadImage('./assets/images/openBanana.png');


    // Chia Seeds
    conflictChiaSeeds.image = loadImage('./assets/images/chiaSeeds.png');
    conflictChiaSeeds.openImage = loadImage('./assets/images/openChiaSeeds.png');
    chiaSeeds.image = loadImage('./assets/images/chiaSeeds.png');
    chiaSeeds.openImage = loadImage('./assets/images/openChiaSeeds.png');
    evilChiaSeeds.image = loadImage('./assets/images/chiaSeeds.png');
    evilChiaSeeds.openImage = loadImage('./assets/images/openChiaSeeds.png');

    // Cocoa Powder
    conflictCocoaPowder.image = loadImage('./assets/images/cocoaPowder.png');
    conflictCocoaPowder.openImage = loadImage('./assets/images/openCocoaPowder.png');
    cocoaPowder.image = loadImage('./assets/images/cocoaPowder.png');
    cocoaPowder.openImage = loadImage('./assets/images/openCocoaPowder.png');
    evilCocoaPowder.image = loadImage('./assets/images/cocoaPowder.png');
    evilCocoaPowder.openImage = loadImage('./assets/images/openCocoaPowder.png');

    // Coconut
    conflictCoconut.image = loadImage('./assets/images/coconut.png');
    conflictCoconut.openImage = loadImage('./assets/images/openCoconut.png');
    coconut.image = loadImage('./assets/images/coconut.png');
    coconut.openImage = loadImage('./assets/images/openCoconut.png');
    evilCoconut.image = loadImage('./assets/images/coconut.png');
    evilCoconut.openImage = loadImage('./assets/images/openCoconut.png');

    // Frozen Berries
    conflictFrozenBerries.image = loadImage('./assets/images/frozenBerries.png');
    conflictFrozenBerries.openImage = loadImage('./assets/images/openFrozenBerries.png');
    frozenBerries.image = loadImage('./assets/images/frozenBerries.png');
    frozenBerries.openImage = loadImage('./assets/images/openFrozenBerries.png');
    evilFrozenBerries.image = loadImage('./assets/images/frozenBerries.png');
    evilFrozenBerries.openImage = loadImage('./assets/images/openFrozenBerries.png');

    // Honey Jar
    conflictHoneyjar.image = loadImage('./assets/images/honeyjar.png');
    conflictHoneyjar.openImage = loadImage('./assets/images/openHoney.png');
    honeyjar.image = loadImage('./assets/images/honeyjar.png');
    honeyjar.openImage = loadImage('./assets/images/openHoney.png');
    evilHoneyjar.image = loadImage('./assets/images/honeyjar.png');
    evilHoneyjar.openImage = loadImage('./assets/images/openHoney.png');

    // Mango
    conflictMango.image = loadImage('./assets/images/mango.png');
    conflictMango.openImage = loadImage('./assets/images/openMango.png');
    mango.image = loadImage('./assets/images/mango.png');
    mango.openImage = loadImage('./assets/images/openMango.png');
    evilMango.image = loadImage('./assets/images/mango.png');
    evilMango.openImage = loadImage('./assets/images/openMango.png');

    // Milk
    conflictMilk.image = loadImage('./assets/images/milk.png');
    conflictMilk.openImage = loadImage('./assets/images/openMilk.png');
    milk.image = loadImage('./assets/images/milk.png');
    milk.openImage = loadImage('./assets/images/openMilk.png');
    evilMilk.image = loadImage('./assets/images/milk.png');
    evilMilk.openImage = loadImage('./assets/images/openMilk.png');

    // Orange
    conflictOrange.image = loadImage('./assets/images/orange.png');
    conflictOrange.openImage = loadImage('./assets/images/openOrange.png');
    orange.image = loadImage('./assets/images/orange.png');
    orange.openImage = loadImage('./assets/images/openOrange.png');
    evilOrange.image = loadImage('./assets/images/orange.png');
    evilOrange.openImage = loadImage('./assets/images/openOrange.png');

    // Orange Juice
    conflictOrangeJuice.image = loadImage('./assets/images/orangeJuice.png');
    conflictOrangeJuice.openImage = loadImage('./assets/images/openOrangeJuice.png');
    orangeJuice.image = loadImage('./assets/images/orangeJuice.png');
    orangeJuice.openImage = loadImage('./assets/images/openOrangeJuice.png');
    evilOrangeJuice.image = loadImage('./assets/images/orangeJuice.png');
    evilOrangeJuice.openImage = loadImage('./assets/images/openOrangeJuice.png');

    // Peanut Butter
    conflictPeanutButter.image = loadImage('./assets/images/peanutButter.png');
    conflictPeanutButter.openImage = loadImage('./assets/images/openPeanutButter.png');
    peanutButter.image = loadImage('./assets/images/peanutButter.png');
    peanutButter.openImage = loadImage('./assets/images/openPeanutButter.png');
    evilPeanutButter.image = loadImage('./assets/images/peanutButter.png');
    evilPeanutButter.openImage = loadImage('./assets/images/openPeanutButter.png');

    // Pineapple
    conflictPineapple.image = loadImage('./assets/images/pineapple.png');
    conflictPineapple.openImage = loadImage('./assets/images/openPineapple.png');
    pineapple.image = loadImage('./assets/images/pineapple.png');
    pineapple.openImage = loadImage('./assets/images/openPineapple.png');
    evilPineapple.image = loadImage('./assets/images/pineapple.png');
    evilPineapple.openImage = loadImage('./assets/images/openPineapple.png');

    // Spinach

    conflictSpinach.image = loadImage('./assets/images/spinach.png');
    conflictSpinach.openImage = loadImage('./assets/images/openSpinach.png');
    spinach.image = loadImage('./assets/images/spinach.png');
    spinach.openImage = loadImage('./assets/images/openSpinach.png');
    evilSpinach.image = loadImage('./assets/images/spinach.png');
    evilSpinach.openImage = loadImage('./assets/images/openSpinach.png');

    // Strawberry
    conflictStrawberry.image = loadImage('./assets/images/strawberry.png');
    conflictStrawberry.openImage = loadImage('./assets/images/openStrawberry.png');
    strawberry.image = loadImage('./assets/images/strawberry.png');
    strawberry.openImage = loadImage('./assets/images/openStrawberry.png');
    evilStrawberry.image = loadImage('./assets/images/strawberry.png');
    evilStrawberry.openImage = loadImage('./assets/images/openStrawberry.png');

    // Water
    conflictWater.image = loadImage('./assets/images/water.png');
    conflictWater.openImage = loadImage('./assets/images/openWater.png');
    water.image = loadImage('./assets/images/water.png');
    water.openImage = loadImage('./assets/images/openWater.png');
    evilStrawberry.image = loadImage('./assets/images/strawberry.png');
    evilStrawberry.openImage = loadImage('./assets/images/openStrawberry.png');

    // Watermelon
    conflictWatermelon.image = loadImage('./assets/images/watermelon.png');
    conflictWatermelon.openImage = loadImage('./assets/images/openWatermelon.png');
    watermelon.image = loadImage('./assets/images/watermelon.png');
    watermelon.openImage = loadImage('./assets/images/openWatermelon.png');
    evilWatermelon.image = loadImage('./assets/images/watermelon.png');
    evilWatermelon.openImage = loadImage('./assets/images/openWatermelon.png');

    // Yogurt
    conflictYogurt.image = loadImage('./assets/images/yogurt.png');
    conflictYogurt.openImage = loadImage('./assets/images/openYogurt.png');
    yogurt.image = loadImage('./assets/images/yogurt.png');
    yogurt.openImage = loadImage('./assets/images/openYogurt.png'); // Apple
    evilYogurt.image = loadImage('./assets/images/yogurt.png');
    evilYogurt.openImage = loadImage('./assets/images/openYogurt.png');


    // main screen images
    blenderImg = loadImage("./assets/images/blender.png");
    gameBlender.image = loadImage("./assets/images/blender.png");
    cherrySmoothieImg = loadImage("./assets/images/cherrySmoothie.png");
    limeSmoothieImg = loadImage("./assets/images/limeSmoothie.png");
    orangeSmoothieImg = loadImage("./assets/images/orangeSmoothie.png");


    // json files
    smoothies = loadJSON('./assets/data/smoothies.json');


    conflictDialog = loadJSON('./assets/data/foodWarTalking.json');
    veeTalking = loadJSON("./assets/data/veeTalking.json");
    evilVeeTalking = loadJSON("./assets/data/evilVeeTalking.json");

    // vee images
    veeAngry = loadImage("./assets/images/veeAngry.png");
    veeCrazy = loadImage("./assets/images/veeCrazy.png");
    veeHappy = loadImage("./assets/images/veeHappy.png");
    veeSad = loadImage("./assets/images/veeSad.png");
    veeImg = loadImage('./assets/images/Vee.png');

    // all sounds
    knifeSound = loadSound('./assets/audio/knife.mp3');
    blenderSound = loadSound('./assets/audio/blender.mp3')
    cashRegisterSound = loadSound('./assets/audio/cash-register.mp3')
    sadTromboneSound = loadSound('./assets/audio/sad-trombone.mp3')
    putSound = loadSound('./assets/audio/thud.mp3')
    liquidPourSound = loadSound('./assets/audio/liquidPour.mp3')
    solidPourSound = loadSound('./assets/audio/solidPour.mp3')
    plopSound = loadSound('./assets/audio/plop.mp3')
    cupFalling = loadSound('./assets/audio/cupFalling.mp3')
    swordSound = loadSound('./assets/audio/sword.mp3')

}



/**
 * Draws elements on the canvas
 */
function draw() {
    textFont(bagelFatOneFont);
    mainScreenLayout();
    smooVeesLayout();

}


/**
 * Draws the welcome screen
 */
function mainScreenLayout() {
    if (gameState == 'main') {
        background('#946656');
        drawWindow();
        drawReflectiveGlass();

        drawBackgroundCounter();
        image(veeImg, width / 2, 145, 200, 600)

        drawFloor();

        drawStoreCounter();
        drawDecorations();

        drawChairs();
        drawCabinets();
        drawWelcomeMessage();
        drawSpeechBubble();
        drawVeesSpeech();

    }
}




/**
 * Fucntion to switch between states
 */
function smooVeesLayout() {
    if (gameState == 'playOriginalGame') {
        //All functions here can be found in the smooVees.js file
        background('#c79274');
        drawInGameCounter();
        drawSmoothieCup();
        drawIncorrectIngredientCount();

        drawCounterItems();
        drawMenu();
        drawRestartBtn();
        drawOrder();

        drawMovesLeft();
        previewFoodSelection();

    } else if (gameState === "playConflictGame") {
        //All functions here can be found in the conflictGame.js file
        currSpeechIndex = 0;
        drawMenu();
        background('#fffff2');
        drawAliveItems();
        moveLeaders();
        movePawns();
        drawSplatters();
        displayEscapedIngredients()
        checkAndShowDialog();
        drawDialog();

    } else
    if (gameState == 'playStoryGame') {
        //All functions here can be found in the storyGame.js file
        background('#946656');
        drawInGameCounter();
        drawMenu();
        displayItems();
        displayVee();
        removeIngredients();
        moveVee();
        changeOfScenery();

    } else if (gameState == 'main') {
        resetGameSettings();
    }

}

/**
 * Draws restart button
 */
function drawRestartBtn() {
    if (!restartBtn) {

        restartBtn = createButton('Restart');
        restartBtn.parent("canvasDiv") // parent the element to a div on the page so that it can have absolute positioning
        restartBtn.position(500, 730);
        restartBtn.addClass('btn'); //for styling purposes

        restartBtn.mousePressed(() => {
            if (ingredientActionBtn) {
                ingredientActionBtn.elt.remove();
                ingredientActionBtn = null;
            }

            if (restartBtn) {
                restartBtn.elt.remove();
                restartBtn = null;
                resetGameSettings();

            }


        });

    }
}

/**
 * Draws the main menu button 
 */
function drawMenu() {
    // checks if there's already a menuBtn element on the canvas
    if (!menuBtn) {
        menuBtn = createButton('Main Menu');
        menuBtn.parent("canvasDiv")
        menuBtn.position(650, 730);
        menuBtn.addClass('btn'); //for styling purposes

        menuBtn.mousePressed(() => {

            if (menuBtn) {
                menuBtn.elt.remove();
                menuBtn = null; // set to null to ensure the next screen will have a main menu btn
                resetGameSettings()
            }
            // checks if there's already a restartBtn element on the canvas
            if (restartBtn) {
                restartBtn.elt.remove(); // delete, if so
                restartBtn = null;

            }
            // checks if there's already a ingredientActionBtn element on the canvas
            if (ingredientActionBtn) {
                ingredientActionBtn.elt.remove(); // delete, if so
                ingredientActionBtn = null;
            }

            gameState = "main";
            mainScreenLayout();
        });

    }


}
/**
 * Function that runs when the mouse is clicked
 */
function mouseClicked() {
    // allows the user to read what Vee has to say over and over again
    if (gameState == "main") {
        currSpeechIndex++;
        if (currSpeechIndex >= veeTalking.speech.length) {
            currSpeechIndex = 0; // restarts the speech 
        }
    } else if (gameState === "playConflictGame") {
        currSpeechIndex++;
        if (
            isLiquidTurn &&
            currSpeechIndex >= conflictDialog.dialog2.liquids.length
        ) {
            currSpeechIndex = 0;
            isLiquidTurn = false; // Switch turn
        } else if (!isLiquidTurn &&
            currSpeechIndex >= conflictDialog.dialog2.solids.length
        ) {
            dialogActive = false; // End dialog

        }
    }
}
/**
 * Function that runs when the mouse is pressed
 */
function mousePressed() {
    if (gameState == "playOriginalGame") {
        selectFood();
        clickToBlend();
        blendIngredients()
    } else if (gameState == "playStoryGame") {} else if (gameState == "playConflictGame") {
        pushIngredient()
        checkAndShowDialog();

    }

}

/**
 * Function that runs when a keyboard key is pressed
 */
function keyPressed() {
    if (key.toUpperCase() === 'L' && gameState == 'main') {
        gameState = 'playOriginalGame';
    } else if (key.toUpperCase() === 'I' && gameState == 'main') {
        gameState = 'playConflictGame';
        currSpeechIndex = 0;

    } else if (key.toUpperCase() === 'E' && gameState == 'main') {
        gameState = 'playStoryGame';

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
    const distance = dist(firstValPosX, firstValPosY, secondValPosX, secondValPosY); // code snippet taken from the conditionals challenge
    // calculates the distance between the first value's X position and first value's Y position positions and the second value's X and y positions
    return distance < secondValSize / 2; //checks if the distance is lower than the radius of the size of the second value if yes then it is overlapping if no then it is not overlapping
}

/**
 * Randomizes an object from an array
 * @param {*} array 
 * @returns object
 */
function randomizeElement(array) {
    if (!gameInProgress) {
        gameInProgress = true;
        randomizedValue = array[Math.floor(Math.random() * array.length)];
    }
    return randomizedValue; // Returns a single smoothie object 
}