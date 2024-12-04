/* Jolene Bodika

 * SmooVees - The Big Conflict
 * Like Vee said, she believes the food and appliances are arguing, which is weird, right?
 * Luckily for you, you can put an end to their bickering with the item they fear the most... the blender!
 * 
 * Controls:
 * Click on the screen to read through the dialog.
 * Once it's over, hurry as quickly as possible to capture as many ingredients as you can with the blender.
 * Click on the screen to read through the dialog again.
 * 
 * Uses:
 * p5.js library
 * https://p5js.org
 * GoogleFonts API
 *https://developers.google.com/fonts
 *
 */
"use strict"
let conflictDialog;
// All ingredients
let conflictApple = new Ingredient("Green Apple", undefined, undefined, 30, -100, 32, 'solid');
let conflictAvocado = new Ingredient("Avocado", undefined, undefined, 75, -100, 64, 'solid');
let conflictBanana = new Ingredient("Banana", undefined, undefined, 600, -100, 64, 'solid');
let conflictChiaSeeds = new Ingredient("Chia Seeds", undefined, undefined, 740, -100, 90, 'solid');
let conflictCocoaPowder = new Ingredient("Cocoa Powder", undefined, undefined, 775, -100, 90, 'solid');
let conflictMango = new Ingredient("Mango Chunks", undefined, undefined, 500, -100, 64, 'solid');
let conflictOrange = new Ingredient("Orange", undefined, undefined, 630, -100, 32, 'solid');
let conflictPineapple = new Ingredient("Pineapple", undefined, undefined, 720, -100, 125, 'solid');
let conflictSpinach = new Ingredient("Spinach Leaves", undefined, undefined, 635, -100, 64, 'solid');
let conflictStrawberry = new Ingredient("Strawberry", undefined, undefined, 635, -100, 32, 'solid');
let conflictWatermelon = new Ingredient("Watermelon", undefined, undefined, 550, -100, 125, 'solid');
let conflictFrozenBerries = new Ingredient("Frozen Berries", undefined, undefined, 670, -100, 125, 'solid');

let conflictCoconut = new Ingredient("Coconut Water", undefined, undefined, Math.random(20, 600), 830, 64, 'liquid');
let conflictHoneyjar = new Ingredient("Honey", undefined, undefined, 510, 845, 90, 'liquid');
let conflictMilk = new Ingredient("Milk", undefined, undefined, 450, 830, 85, 'liquid');
let conflictOrangeJuice = new Ingredient("Orange Juice", undefined, undefined, 325, 845, 80, 'liquid');
let conflictPeanutButter = new Ingredient("Peanut Butter", undefined, undefined, 550, 830, 64, 'liquid');
let conflictWater = new Ingredient("Water", undefined, undefined, 400, 830, 80, 'liquid');
let conflictYogurt = new Ingredient("Yogurt", undefined, undefined, 750, 830, 64, 'liquid');

let liquids = [conflictCoconut, conflictHoneyjar, conflictOrangeJuice, conflictPeanutButter, conflictWater, conflictYogurt];
let solids = [conflictApple, conflictAvocado, conflictBanana, conflictChiaSeeds, conflictCocoaPowder, conflictFrozenBerries, conflictMango, conflictOrange, conflictPineapple, conflictSpinach, conflictStrawberry];
let escapedIngredients = [];
let blended = []; // stores splatter locations

// watermelon leader object
let solidLeaderImg = {
    x: 350,
    y: -10,
    size: 175
};

// milk leader object
let liquidsLeaderImg = {
    x: 350,
    y: 800,
    size: 175
};

let blenderCursor = {
    x: undefined,
    y: undefined,
    size: 175
};

/**
 * Function to move the leader ingredients on the screen
 */
function moveLeaders() {
    liquidsLeaderImg.y = constrain(liquidsLeaderImg.y, liquidsLeaderImg.y - 2.5, 420);
    solidLeaderImg.y = constrain(solidLeaderImg.y + 1, 10, 145);

}


/**
 * Function to display dialog between the leaders
 */
function drawDialog() {
    if (dialogActive) {
        let textBox = new TextArea(300, 325, 275, 120, 20);
        if (solids.length === 0 && liquids.length === 0) {
            if (currSpeechIndex >= conflictDialog.dialog2.liquids.length || currSpeechIndex >= conflictDialog.dialog2.solids.length) {
                moveLeadersBackconflictds();
            }
            // Display dialog2 for the second phase
            if (isLiquidTurn && conflictDialog.dialog2.liquids[currSpeechIndex]) {
                textBox.addText(conflictDialog.dialog2.liquids[currSpeechIndex], 430, 355, 20, 'black');
                textBox.display('lightblue');
            } else if (!isLiquidTurn && conflictDialog.dialog2.solids[currSpeechIndex]) {
                textBox.addText(conflictDialog.dialog2.solids[currSpeechIndex], 430, 355, 20, 'black');
                textBox.display('lightgreen');
            }
        } else {
            // Display dialog for the first phase
            if (isLiquidTurn && conflictDialog.dialog.liquids[currSpeechIndex]) {
                textBox.addText(conflictDialog.dialog.liquids[currSpeechIndex], 430, 355, 20, 'black');
                textBox.display('lightblue');
            } else if (!isLiquidTurn && conflictDialog.dialog.solids[currSpeechIndex]) {
                textBox.addText(conflictDialog.dialog.solids[currSpeechIndex], 430, 355, 20, 'black');
                textBox.display('lightgreen');
            }
        }
    }
}

/**
 * Displays ingredients who escaped on the canvas
 */
function displayEscapedIngredients() {
    let x = width - 200; // set starting values for x and y positions
    let y = 50;

    push();
    textSize(16);
    fill(0);
    textAlign(LEFT, TOP); // align at th top left of the canvas

    text("Ingredients who escaped:", x, y - 30);

    // Loop through escaped ingredients and display their names/images
    escapedIngredients.forEach((ingredient, index) => {
        image(ingredient.image, x, y + index * 30, 20, 20);
        text(ingredient.name, x + 25, y + index * 30);

    });
    pop()
}
/**
 * Display all images on the canvas
 */
function drawAliveItems() {
    // Display all solids
    solids.forEach((element) => {
        element.display();

    });

    // Display all liquids
    liquids.forEach((element) => {
        element.display();

    });

    // Leaders
    image(watermelon.image, solidLeaderImg.x, solidLeaderImg.y, solidLeaderImg.size, solidLeaderImg.size);
    image(milk.image, liquidsLeaderImg.x, liquidsLeaderImg.y, liquidsLeaderImg.size, liquidsLeaderImg.size);

    // cursor image
    image(gameBlender.image, mouseX, mouseY, blenderCursor.size, blenderCursor.size);

    // remove elements that are offscreen
    removeOffscreenItems();
}
/**
 * Deletes ingredients that you failed to catch
 */
function removeOffscreenItems() {
    // Remove solids that are fully offscreen and add them to escapedIngredients
    solids = solids.filter(ingredient => {
        if (ingredient.y > height + ingredient.size) {
            escapedIngredients.push(ingredient);
            return false; // Remove from solids
        }
        return true;
    });

    // Remove liquids that are fully offscreen and add them to escapedIngredients
    liquids = liquids.filter(ingredient => {
        if (ingredient.y < -ingredient.size) {
            escapedIngredients.push(ingredient);
            return false; // Remove from liquids
        }
        return true;
    });
}

/**
 * Function to move the pawn ingredients on their own
 */
function movePawns() {
    if (!dialogActive) {
        // Move solids with their randomized speeds
        solids.forEach(ingredient => {
            ingredient.y += ingredient.speed; // moves downconflictd with random speed
            ingredient.x += random(-1, 1); // tiny random horizontal movement
            ingredient.x = constrain(ingredient.x, 0, width - ingredient.size); // in order to keep the xPos within the canvas
        });

        // Move liquids with their randomized speeds
        liquids.forEach(ingredient => {
            ingredient.y -= ingredient.speed; // moves upconflictd with random speed
            ingredient.x += random(-1, 1); // tiny random horizontal movement
            ingredient.x = constrain(ingredient.x, 0, width - ingredient.size); // in order to keep the xPos within the canvas
        });
    }
}


/**
 * Function to handle deconstructing the ingredient and storing its image
 */
function pushIngredient() {
    if (!dialogActive) {
        swordSound.play();
        solids.forEach((ingredient, index) => {
            if (checkOverlap(mouseX, mouseY, ingredient.x, ingredient.y, ingredient.size)) {
                // add splatter to the splatters array at the caught ingredient's location
                blended.push({ image: ingredient.openImage, x: ingredient.x, y: ingredient.y });

                // draw the splatter image at the ingredient's location
                image(ingredient.image, ingredient.x, ingredient.y, 125);

                // Remove ingredient from solids
                solids.splice(index, 1);
            }
        });

        liquids.forEach((ingredient, index) => {
            if (checkOverlap(mouseX, mouseY, ingredient.x, ingredient.y, ingredient.size)) {
                // add splatter to the splatters array at the caught ingredient's location
                blended.push({ image: ingredient.openImage, x: ingredient.x, y: ingredient.y });

                // draw the splatter image at the ingredient's location
                image(ingredient.image, ingredient.x, ingredient.y, 125);
                // Remove ingredient from liquids
                liquids.splice(index, 1);
            }

        });

    }
}

/**
 * Function to check if dialog should be shown
 */
function checkAndShowDialog() {
    if (solids.length === 0 && liquids.length === 0 && !dialogActive) {
        dialogActive = true;
        currSpeechIndex = 0; // Reset index for dialog2
        isLiquidTurn = true; // Start with liquids
    }
}


/**
 * Function to draw splatters
 */
function drawSplatters() {
    blended.forEach(splatter => {
        // Draw the splatter at the stored location
        image(splatter.image, splatter.x, splatter.y, 64, 64);
    });
}