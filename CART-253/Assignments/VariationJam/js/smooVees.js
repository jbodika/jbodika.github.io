/*  Jolene Bodika

 * SmoooVees - Original Game
 * Relax after a long day by playing a smoothie making simulator.  
 * 
 * Controls:
 * Follow the recipe or don't, who cares really...
 * Click on the ingredient of your choice to start prepping.
 * Depending on which ingredient you chose, you might have to chop, pour, or scoop.
 * Once you've completed that, you can drop the prepped food in the blender.
 * Keep doing so until you have no moves left.
 * Once you make your final move, you're ready to serve your drink.
 * Bring your cursor closer to the smoothie cup by hovering over the lid.
 * Ta-da! You've made a perfect smoothie!... or not.
 * 
 * Uses:
 * 
 * p5.js library
 * https://p5js.org
 * GoogleFonts API
 *https://developers.google.com/fonts
 *
 */
"use strict"
let activeSmoothie; // current smoothie the player has to make
let activeIngredientElement; //current food selected
let originalIngredientData = { x: 0, y: 0, image: undefined }
let gameInProgress = false;
let randomizedValue;
let ingredientAction = null;
let numOfChops = 0; // max amount of times the player can chop 
let numOfPours = 0; // max amount of time the player can pour
let chosenIngredients = []
let ingredientsCount = 0
let smoothies;
let movesLeft;
let cuttingBoardImg = undefined
let incorrectIngredientsCount = 0

/**
 * Object for the interactive blender
 */
const gameBlender = {
        name: "Blender",
        image: undefined,
        x: 150,
        y: 400,
        size: 300,
        action: "blend"
    }
    // All ingredient objects
const apple = new Ingredient("Green Apple", undefined, undefined, 670, 450, 32, "cut", "cut");
const avocado = new Ingredient("Avocado", undefined, undefined, 700, 450, 64, "cut", "cut");
const banana = new Ingredient("Banana", undefined, undefined, 600, 430, 64, "cut", "cut");
const chiaSeeds = new Ingredient("Chia Seeds", undefined, undefined, 740, 500, 90, "plop", "scoop");
const cocoaPowder = new Ingredient("Cocoa Powder", undefined, undefined, 775, 350, 90, "plop", "scoop");
const coconut = new Ingredient("Coconut Water", undefined, undefined, 450, 375, 64, "cut", "cut");
const frozenBerries = new Ingredient("Frozen Berries", undefined, undefined, 670, 260, 125, "solidPour", "scoop");
const honeyjar = new Ingredient("Honey", undefined, undefined, 510, 450, 90, "plop", "scoop");
const mango = new Ingredient("Mango Chunks", undefined, undefined, 500, 375, 64, "cut", "cut");
const milk = new Ingredient("Milk", undefined, undefined, 450, 290, 85, "liquidPour", "pour");
const orange = new Ingredient("Orange", undefined, undefined, 630, 400, 32, "cut", "cut");
const orangeJuice = new Ingredient("Orange Juice", undefined, undefined, 325, 300, 80, "liquidPour", "pour");
const peanutButter = new Ingredient("Peanut Butter", undefined, undefined, 550, 400, 64, "plop", "scoop");
const pineapple = new Ingredient("Pineapple Chunks", undefined, undefined, 720, 375, 125, "cut", "cut");
const spinach = new Ingredient("Spinach Leaves", undefined, undefined, 635, 350, 64, "cut", "cut");
const strawberry = new Ingredient("Strawberry", undefined, undefined, 635, 480, 32, "cut", "cut");
const water = new Ingredient("Water", undefined, undefined, 400, 300, 80, "liquidPour", "pour");
const watermelon = new Ingredient("Watermelon", undefined, undefined, 550, 300, 125, "cut", "cut");
const yogurt = new Ingredient("Yogurt", undefined, undefined, 750, 280, 64, "plop", "scoop");
// array of ingredient objects
const ingredients = [yogurt, apple, avocado, banana, chiaSeeds, cocoaPowder, coconut, frozenBerries, honeyjar, mango, milk, orange, orangeJuice, peanutButter, pineapple, spinach, strawberry, water, watermelon];

// create smoothie  object
let smoothie = new Smoothie(
    400, 530, 180, 100, // Lid properties
    310, 530, 180, 200, // Cup properties
    390, 400, 20, 330, // Straw properties
    '#ebe6d9' // Cup color
);

/**
 * Draws the countertop
 */
function drawInGameCounter() {
    push();
    stroke('#c0c0c0');
    strokeWeight(2)
    fill('#fffff2');
    rect(0, 300, width, height / 1.5);
    pop();

}



/**
 * Displays the pixelated foods on the counter top and centers them within their bounding box 
 */
function drawCounterItems() {
    image(cuttingBoardImg, 530, 520, 230, 180); // draw inactive cutting board for styling

    // Check if the ingredient action is not equal to blend, and use the original position for the blender.
    if (ingredientAction != 'blend') {
        image(gameBlender.image, gameBlender.x - gameBlender.size / 2, gameBlender.y - gameBlender.size / 2, gameBlender.size, gameBlender.size)
    }

    // loop through ingredients array to display the ingredient object images
    ingredients.forEach(ingredientObj => {
        ingredientObj.display()
    });

}

/**
 * Draws the smoothie's cup 
 */
function drawSmoothieCup() {
    smoothie.display();
}


/**
 * Reset all the settings for the SmooVees game
 */
function resetGameSettings() {
    gameInProgress = false;
    ingredientAction = null;
    numOfChops = 0; // max amount of time the player can chop 
    numOfPours = 0;
    chosenIngredients = [];
    ingredientsCount = 0;
    incorrectIngredientsCount = 0;

    smoothie = new Smoothie(
        400, 530, 180, 100, // Lid properties
        310, 530, 180, 200, // Cup properties
        390, 400, 20, 330, // Straw properties
        '#ebe6d9' // Cup color
    );

}

/**
 * Draws the order section at the top left of the screen
 */
function drawOrder() {
    let yStartPos = 105; // default y position
    let yIncrement = 20; // space between each line
    activeSmoothie = randomizeElement(smoothies.drinks); // selects random drink object from the smoothies array

    // create textArea object to display a textox with text in it
    let textArea = new TextArea(10, 10, 300, 185, 20);
    textArea.addText(`SmooVee`, 150, 50, 30, '#8e7cc3');
    textArea.addText(`SmooVee`, 153, 52, 30, '#b4a7d6');
    textArea.addText(`${activeSmoothie.name}\n`, 160, 80, 25, activeSmoothie.color);

    textArea.display('#c0c0c0');

    push();

    activeSmoothie.ingredients.forEach((element, index) => { // displays all the ingredients for the randomized drink
        textSize(20);
        // if the user adds the correct ingredients in the blender,it will turn the specific text in this list green
        if (chosenIngredients.includes(element)) {
            fill('lightgreen');
            stroke('black');
            textArea.addText(`${index + 1}. ${element}`, 80, yStartPos + index * yIncrement, 25, activeSmoothie.color);

            text(`${index + 1}. ${element}`, 80, yStartPos + index * yIncrement);
        } else {
            // default to white text
            fill('white');
            stroke('black');
            text(`${index + 1}. ${element}`, 80, yStartPos + index * yIncrement);

        }

    });
    pop()
}
/**
 * Draws the incorrect ingredient count
 */
function drawIncorrectIngredientCount() {
    let textArea = new TextArea(500, 10, 275, 75, 20);
    textArea.addText(`Incorrect Ingredients`, 640, 40, 25, 'black');
    textArea.addText(`${incorrectIngredientsCount}`, 640, 70, 25, 'black');
    textArea.display('#c0c0c0');
}

/**
 * Displays the remaining moves for the player
 */
function drawMovesLeft() {
    movesLeft = activeSmoothie.ingredients.length - ingredientsCount;
    let textArea = new TextArea(500, 100, 275, 75, 20);
    textArea.addText(`Moves Left\n${movesLeft}`, 640, 130, 25, '#c27ba0');
    textArea.display('#c0c0c0');
}

/**
 * Creates the action button (either cut or pour) for the food element
 */
function foodActionBtn(action) {
    // check if the button exists already, if not create it
    if (!ingredientActionBtn) {
        ingredientActionBtn = createButton(action.toUpperCase());
        ingredientActionBtn.parent("canvasDiv");
        ingredientActionBtn.position(width / 2, 650);
        ingredientActionBtn.addClass('food-action-btn'); //for styling purposes
    }
    ingredientActionBtn.mousePressed(() => { // event listener
        ingredientAction = activeIngredientElement.action;

        playActionSound(); // plays the sound for the specific action
        backBtn.hide();
    });

}

/**
 * Display a back button
 */
function drawBackBtn() {
    if (!backBtn) {
        backBtn = createButton('Go Back');
        backBtn.parent("canvasDiv");
        backBtn.position(0, 50);
        backBtn.addClass('btn'); //for styling purposes
    }
    backBtn.mousePressed(() => { // event listener
        ingredientAction = null;

        playActionSound();

        backBtn.hide();
        ingredientActionBtn.hide();
    });

}

/**
 * Play specific sound bite
 */
function playActionSound() {
    if (ingredientAction == 'cut') {
        numOfChops++
        knifeSound.play();
    } else if (ingredientAction === 'plop' || ingredientAction === 'liquidPour' || ingredientAction === 'solidPour') {
        if (ingredientAction === 'plop') plopSound.play(); // one line if statements to play the sound based on the specific action
        if (ingredientAction === 'liquidPour') liquidPourSound.play();
        if (ingredientAction === 'solidPour') solidPourSound.play();
        numOfPours++
    }
    if (numOfChops == 2 || numOfPours == 2) {
        activeIngredientElement.image = activeIngredientElement.openImage;
        numOfChops = 0;
        numOfPours = 0;
        ingredientAction = 'putInBlender';
        ingredientActionBtn.elt.remove();
        ingredientActionBtn = null;
    };

}


/**
 * Dsiplays the buttons available for navigation
 */
function showPreviewScreenButtons() {
    backBtn.show();
    ingredientActionBtn.show();

}


/**
 * Shows the selected food element up close and makes sure the user actually wants to select it
 */
function previewFoodSelection() {

    if (ingredientAction == 'preview') {
        push();
        background('#fffff2'); //counter top
        pop();
        push();

        textSize(40);
        textAlign(CENTER);
        image(activeIngredientElement.image, 200, 120, 500, 500);
        text('You chose the ' + activeIngredientElement.name + '\nclick the button to ' + activeIngredientElement.actionBtnLbl + ' it!', width / 2, 50);

        foodActionBtn(activeIngredientElement.actionBtnLbl); // creates a button with the name of the action
        drawBackBtn();
        showPreviewScreenButtons();
        pop();


    } else if (ingredientAction === 'cut') {
        drawCuttingScreen();
    } else if (ingredientAction === 'solidPour' || ingredientAction === 'liquidPour' || ingredientAction === 'plop') {
        drawPouringScreen();
    } else if (ingredientAction === 'putInBlender') {
        switchMouseToFood(); // adds the chopped or poured ingredient to the mouse positions


    } else if (ingredientAction == 'serve') {
        gameBlender.x = 150; // reset the x and y pos of the blender
        gameBlender.y = 400;


    } else if (ingredientAction === 'blend') {
        blendIngredients();
    }

}

/**
 * Function to handle the blending functionality
 */
function clickToBlend() {
    if (ingredientAction == 'putInBlender' && checkOverlap(mouseX, mouseY, gameBlender.x, gameBlender.y, gameBlender.size)) {
        putSound.play()

        // check if the ingredient is not in the recipe, increment the incorrect ingredient count
        if (!activeSmoothie.ingredients.includes(activeIngredientElement.name)) {
            incorrectIngredientsCount++;
        }

        // check if the ingredient has not already been selected
        if (!chosenIngredients.includes(activeIngredientElement.name)) {
            chosenIngredients.push(activeIngredientElement.name); // add it to the chosen fruit array

        }
        //reset the active ing
        activeIngredientElement.x = originalIngredientData.x;
        activeIngredientElement.y = originalIngredientData.y;
        activeIngredientElement.image = originalIngredientData.image;
        ingredientsCount++;

        mouseX = 0;
        mouseY = 0;
        ingredientAction = null;
        if (ingredientsCount == activeSmoothie.ingredients.length) {
            blenderSound.play();

            ingredientAction = 'blend';
        }

    }
}

/**
 * Function to check if the blender overlaps the smoothie
 */
function pourSmoothie() {
    const lidRadius = Math.min(smoothie.lid.size.x, smoothie.lid.size.y) / 2;

    if (checkOverlap(mouseX, mouseY, smoothie.lid.x, smoothie.lid.y, lidRadius * 2)) {
        ingredientAction = 'serve';
        serveDrink(); // changes colour of the cup and plays sound
    }
}

/**
 * Function to handle the 'cut' action scenery 
 */
function drawCuttingScreen() {

    background('#BA8963');
    push();
    noStroke();
    rect(20, 280, 70, 300, 20);
    image(activeIngredientElement.image, 200, 100, 500, 500);

    fill('#fffff2');

    rect(width - 100, 0, 100, height);
    pop();
}
/**
 * Function to handle the 'pour' action scenery 
 */
function drawPouringScreen() {
    background('#fffff2');
    push();
    fill('#b4a7d6');
    noStroke();
    rect(0, 0, width, 100, 20);
    pop();
    image(activeIngredientElement.image, 200, 100, 500, 500);
}


/**
 * Adds the modified food element to the mouse 
 */
function switchMouseToFood() {
    activeIngredientElement.x = mouseX;
    activeIngredientElement.y = mouseY;
}


/**
 * Interaction that allows the user to select one the food elements on the counter top
 */
function selectFood() {
    ingredients.forEach((element) => {
        if (checkOverlap(mouseX, mouseY, element.x, element.y, element.size) && ingredientAction == null && ingredientsCount < activeSmoothie.ingredients.length) {
            activeIngredientElement = element; // assigns the selected food to the activeIngredientElement variable
            originalIngredientData.x = activeIngredientElement.x;
            originalIngredientData.y = activeIngredientElement.y;
            originalIngredientData.image = activeIngredientElement.image;

            // check if the ingredient has not already been selected
            if (!chosenIngredients.includes(activeIngredientElement.name)) {

                ingredientAction = 'preview'; // Focused screen for the selected food
            }


        }
    })

};


/**
 * Function to change the position of the blender to the user's cursor
 */
function blendIngredients() {
    if (ingredientAction == 'blend') {
        push();
        // Move to the blender's current position
        translate(gameBlender.x, gameBlender.y);

        rotate(PI / 180 * -45); // Rotate blender by -45 degrees

        // Draw the rotated blender at the current position
        imageMode(CENTER);
        image(gameBlender.image, 0, 0, gameBlender.size, gameBlender.size);

        pop();

        // Update the blender's position to follow the mouse
        gameBlender.x = mouseX;
        gameBlender.y = mouseY;
        pourSmoothie();
    }

};



/**
 * Changes the drink colour
 */
function serveDrink() {
    let equalArray = (chosenIngredients.length === activeSmoothie.ingredients.length) && (chosenIngredients.every(val => activeSmoothie.ingredients.includes(val)));
    if (equalArray && ingredientsCount == activeSmoothie.ingredients.length) {

        smoothie.changeColor(activeSmoothie.color);
        cashRegisterSound.play();

    } else if (!equalArray && ingredientsCount == activeSmoothie.ingredients.length) {
        cupFalling.play();
        // simulate a spilled over cup 
        smoothie.cup.x = 100;
        smoothie.cup.y = 575; //base of smoothie cup
        smoothie.cup.size.x = 300;
        smoothie.cup.size.y = 200;

        smoothie.lid.x = 100;
        smoothie.lid.y = 675; //lid of smoothie cup
        smoothie.lid.size.x = 100;
        smoothie.lid.size.y = 200;

        smoothie.straw.x = 0;
        smoothie.straw.y = 750; //straw of smoothie cup
        smoothie.straw.size.x = 400;
        smoothie.straw.size.y = 25;
        smoothie.color = '#ebe6d9';
        sadTromboneSound.play();


    }

};