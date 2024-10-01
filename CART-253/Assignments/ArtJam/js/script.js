/*
* Arcade Claw Machine Simulation
* Jolene Bodika
*
* Controls:
* - you must pay before using the machine! insert a coin in the coin slot to start the game
* - press and hold on the machine joystick to move around
* - press and hold on the colour changing button to claim your prize
* Uses:
* p5.js library
* https://p5js.org
*
* Out of order image flyer based on the Wreck it Ralph movie made by graphic artist aki5 
* https://www.deviantart.com/aki5/art/Wreck-It-Ralph-Out-of-Order-336189999
*
* Condition to check if the cursor overlaps an object, taken from example in week 4's Conditionals Challenge 
* by Pippin Barr(https://pippinbarr.com/cart253/topics/conditionals/conditionals-in-practice-part-2.html)
*/

"use strict";

// DECLARE CONSTANT VARIABLES

// arcade machine's claw 
const claw = {
  left: {
    x: 380,
    y: 290
  },
  right: {
    x: 410,
    y: 290
  }
}
// the chain attcahed to the claw
const clawChain = {
  x: 395,
  y: 110
};

// joystick to control the claw/clawchain
const joystick = {
  top: {
    x: 435,
    y: 480,
    size: 45,
  },
  bottom: {
    x: 435,
    y: 510
  }
}

// coin to pay to use the machine
const coin = {
  x: undefined,
  y: undefined,
  size: 25
}

// toys inside the machine
const plushies = {
  x: 265,
  y: 350
}
// button to pick up your prize
const convexBtn = {
  x: 520,
  y: 540,
  size: 20
}

// all colours used in the program
const colours = {
  mainBlue: "#6b82e0",
  secondaryBlue: "#1f3694",
  shadingBlue: "#415fd7",
  lightGray: "#D3D3D3",
  darkGray: "#808080",
  groundColour: "#c0caf2",
  black: "#000",
  white: "#fff",
  backgroundColour: "#eaedfb"

}

//DECLARE FLAG VARIABLES 
let isClicked = false
let isCoinVisible = true;
let isMouseOverlapping;

// DECLARE GLOBAL VARIABLES
let img;


// FUNCTIONS
//Loads content on the page before canvas is drawn
function preload() {
  img = loadImage('./images/wreck_it_ralph___out_of_order_by_aki5-d5k5pv3.jpg');
}


function setup() {
  createCanvas(800, 800);
}

// Continously gets called to display content on the canvas
function draw() {
  background(colours.backgroundColour);

  //draws all the key components of the arcade machine
  drawGround();
  drawMachine();
  drawClawChainBase();
  drawClawChain();
  drawReflectiveGlass();
  drawToySlot();
  drawConvexButton();
  drawCoinSlot();
  drawAirVents();
  drawJoystick();

  // flag to check if the coin is on the screen or not
  if (!isCoinVisible) {
    moveJoystick();
    moveClaw();
    buttonPressed();
  }
  else {
    drawCoin();
  }

  insertCoin(); //sets isCoinVisible to false

}

/* Checks if the cursor overlaps with an object
*
* @param firstValPosX - Object 1's value X position
* @param firstValPosY - Object 1's value Y position
* @param secondValPosX - Object 2's value X position
* @param secondValPosY - Object 2's value Y position
* @param size - Object 2's size value
*/

function checkOverlap(firstValPosX, firstValPosY, secondValPosX, secondValPosY, size) {
  const distance = dist(firstValPosX, firstValPosY, secondValPosX, secondValPosY); // code snippet taken from the conditionals challenge
  // calculates the distance between the first value's X position and first value's Y position positions and the second value's X and y positions
  return isMouseOverlapping = (distance < size / 2);//checks if the distance is lower than the radius of the size of the second value if yes then it is overlapping if no then it is not overlapping

}

// When the machine's button is pressed
function buttonPressed() {
  // returns true or false if the cursor is overlapping with the machine's button and the cursor is pressed
  if (checkOverlap(mouseX, mouseY, convexBtn.x, convexBtn.y, convexBtn.size) && mouseIsPressed) {
    isClicked = true
    plushies.y += 1 // removes the plushies row by row once the user presses on the button
    brokenGame();
  } else {
    isClicked = false
  }

}

// Displays the broken game sign and darkens the room
function brokenGame() {
  push();
  image(img, 340, 230, 150, 200);
  noStroke();
  fill(0, 0, 0, 127);
  rect(0, 0, 800, 800);
  pop();

}

// draws the floor area
function drawGround() {
  push();
  noStroke();
  fill(colours.groundColour);
  rect(0, 700, 800, 100);
  pop();
};

// draws the machine
function drawMachine() {
  //main section
  push();
  noStroke();
  fill(colours.mainBlue);
  rect(200, 50, 400, 700);
  rect(175, 720, 450, 40);
  drawMachineBackground();
  drawPlushies();
  rect(175, 490, 450, 60);


  //top section
  rect(175, 20, 450, 70);

  triangle(175, 500, 150, 580, 215, 580);
  triangle(625, 500, 580, 580, 650, 580);

  //shading section
  fill(colours.shadingBlue);
  rect(200, 580, 400, 10);
  pop();

}
//draws the toy slot 
function drawToySlot() {
  push();
  noStroke();
  fill(colours.lightGray);
  rect(460, 620, 80, 70);
  pop();
}

// draws the subtle white background from the inside of the machine
function drawMachineBackground() {
  push();
  noStroke();
  fill(colours.white);
  rect(250, 80, 300, 410);
  pop();

}

// draws air vents to cool down the machine
function drawAirVents() {
  push();
  noStroke();
  fill(colours.secondaryBlue);
  rect(280, 520, 50, 10);
  rect(280, 535, 50, 10);
  rect(280, 550, 50, 10);
  pop();

}

// draws the coin slot 
function drawCoinSlot() {
  push();
  noStroke();
  fill(colours.lightGray);
  rect(250, 515, 20, 40);
  fill(colours.black);
  rect(257, 525, 5, 20);
  pop();
}

// draws the machine's button to collect the toy the user selected
function drawConvexButton() {
  push();
  noStroke();
  fill(colours.secondaryBlue);
  rect(500, 520, 40, 40);
  fill(colours.darkGray);
  ellipse(518, 540, 20);

  // uses p5's map function to change the colour of the game button based on mouseX and mouseY positions
  let blue = map(mouseX, 0, width, 0, 255);
  let green = map(mouseY, 0, height, 0, 255);

  fill(0, green, blue);
  ellipse(convexBtn.x, convexBtn.y, 20, 20);
  pop();
}

//draws the base of the claw's chain
function drawClawChainBase() {
  push();
  noStroke();
  fill(colours.black);
  rect(250, 80, 300, 20);
  ellipse(clawChain.x + 5, 100, 15, 15);
  pop();
}

// draws the claw's chain
function drawClawChain() {
  push();
  noStroke();
  fill(colours.black);
  rect(clawChain.x, clawChain.y, 10, 180);
  rect(claw.left.x, claw.left.y, 10, 30);
  rect(claw.right.x, claw.right.y, 10, 30);
  pop();
}

// draws a reflective glass to make it look more real
function drawReflectiveGlass() {
  push();
  noStroke();
  fill(167, 199, 203, 127);
  rect(250, 80, 300, 410);

  fill(219, 225, 227, 127);
  noStroke();
  triangle(250, 100, 550, 490, 550, 100);
  pop();
}

// draws a joystick to control the machine
function drawJoystick() {
  push();
  noStroke();
  //joystick base bottom
  fill(colours.secondaryBlue);
  rect(400, 520, 70, 40);
  fill(colours.black);
  rect(257, 525, 5, 20);

  //joystick base bottom circle
  fill(colours.darkGray);
  ellipse(435, 540, 30, 30);
  fill(colours.secondaryBlue);

  // joystick
  ellipse(435, 540, 20, 20);
  fill(colours.black);
  ellipse(joystick.bottom.x, joystick.bottom.y, 10, 70);
  fill(colours.secondaryBlue);
  ellipse(joystick.top.x, joystick.top.y, joystick.top.size);
  pop();
}

// draws the coin to start the game with
function drawCoin() {
  push();
  fill("#eeb501");
  ellipse(coin.x, coin.y, coin.size);
  coin.x = mouseX; // sets the coin's position to the mouseX and mouseY values upon starting the program
  coin.y = mouseY; // to simulate the user inserting a coin in the machine
  pop();
}

// checks if the user clicked on the coin slot with the coin
function insertCoin() {
  // returns true or false if the cursor is overlapping on the coin slot and the cursor is pressed
  if (checkOverlap(coin.x, coin.y, 257, 525, coin.size) && mouseIsPressed) {
    isCoinVisible = false; // sets the flag to false once the user presses on the coin slot
  }
}

// moves the joystick based on the direction that the user is pointing towards
function moveJoystick() {

  //returns true or false if the user has the cursor hovering on the top of the joystick while pressing down with the mouse
  if (checkOverlap(mouseX, mouseY, joystick.top.x, joystick.top.y, joystick.top.size) && mouseIsPressed) {
    joystick.top.x = mouseX;
    joystick.bottom.x = mouseX;// moves the joystick top and bottom parts in relation to the position of the mouseX and mouseY properties
    joystick.top.y = mouseY;

    //added constraints to not exaggerate the movements 
    joystick.top.x = constrain(joystick.top.x, 425, 450);
    joystick.top.y = constrain(joystick.top.y, 465, 490);
    joystick.bottom.x = constrain(joystick.bottom.x, 430, 443);

  }

}
// moves the claw and claw chain based on the direction that the user is pointing towards
function moveClaw() {
  let axisX; //declare variables
  let axisY;
  //returns true or false if the user has the cursor hovering on the top of the joystick while pressing down with the mouse
  if (checkOverlap(mouseX, mouseY, joystick.top.x, joystick.top.y, joystick.top.size) && mouseIsPressed) {
    //added constraints to not exaggerate the movements 
    clawChain.x = constrain(clawChain.x, 265, 525);
    clawChain.y = constrain(clawChain.y, 110, 270);
    claw.left.y = constrain(claw.left.y, 290, 450);
    claw.right.y = constrain(claw.right.y, 290, 450);


    claw.left.x = constrain(claw.left.x, 250, 510);
    claw.right.x = constrain(claw.right.x, 280, 540);

    axisX = joystick.top.x - 395; // gets the position of the top of the joystick's x position and substracts it from the hardcoded value of the clawchain's x position
    axisY = joystick.top.y - 110 // gets the position of the top of the joystick's y position and substracts it from the hardcoded value of the clawchain's y position


    // moves the claw left/right pieces as well as the chain in relation to the position of the mouseX and mouseY properties
    clawChain.x += (axisX > 40 ? 0.5 : -0.5); //ternary conditional operator they work exactly the same as an 'if' statement but they're just displayed in one line
    clawChain.y += (axisY > 370 ? -0.5 : 0.5); // for example: axis > 40 if yes increment by 1 if no decrement by 1
    claw.left.y += (axisY > 370 ? -0.5 : 0.5);
    claw.right.y += (axisY > 370 ? -0.5 : 0.5);

    claw.left.x += (axisX > 40 ? 0.5 : -0.5);
    claw.right.x += (axisX > 40 ? 0.5 : -0.5);
  }
}

// draws the circles in the machine to simulate toys or plushies
function drawPlushies() {
  let colourArray = ['#f920aa', '#20aaf9', '#aaf920', '#ad03de', '#FF7518'] //array of hex colours
  let rowJump = 0;

  for (let i = plushies.x; i < 550; i += 30) { //outer loop
    for (let j = plushies.y; j < 500; j += 30) { //inner loop
      push();
      noStroke();
      fill(colourArray.slice(-1)); // gets last value from colourArray
      ellipse(i, j, 30);
      pop();
      // added functionality to change the colours of the toys
      //for every toy drawn, the rowJump varibale gets incremented
      // once it reaches 10 it removes the last colour from the colourArray
      rowJump++;
      if (rowJump == 10) {
        rowJump = 0;
        colourArray.pop();
      }
    }
  }
}