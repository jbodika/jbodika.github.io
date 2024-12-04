/*
 *
 * Class to handle the smoothie cup display
 * 
 */
"use strict"
class Smoothie {
    constructor(lidX, lidY, lidWidth, lidHeight, cupX, cupY, cupWidth, cupHeight, strawX, strawY, strawWidth, strawHeight, color) {
            this.lid = {
                x: lidX,
                y: lidY,
                size: {
                    x: lidWidth,
                    y: lidHeight,
                }
            };
            this.cup = {
                x: cupX,
                y: cupY,
                size: {
                    x: cupWidth,
                    y: cupHeight,
                }
            };
            this.straw = {
                x: strawX,
                y: strawY,
                size: {
                    x: strawWidth,
                    y: strawHeight,
                }
            };
            this.color = color; // cup color
            this.lidColor = '#ebe6d9';
            this.strawColor = '#ffbcda80';
            this.strokeColor = '#c0c0c0';
        }
        /**
         * display the cup on the canvas
         */
    display() {
        // draw the lid
        push();
        stroke(this.strokeColor);
        strokeWeight(0.75);
        fill(this.lidColor);
        ellipse(this.lid.x, this.lid.y, this.lid.size.x, this.lid.size.y);
        pop();

        // draw the cup
        push();
        fill(this.color);
        stroke(this.strokeColor);
        strokeWeight(0.75);
        rect(this.cup.x, this.cup.y, this.cup.size.x, this.cup.size.y);
        pop();

        // draw the straw
        push();
        strokeWeight(0.10);
        fill(this.strawColor);
        rect(this.straw.x, this.straw.y, this.straw.size.x, this.straw.size.y);
        pop();
    }


    // method to change the smoothie cup color
    changeColor(newColor) {
        this.color = newColor;
    }
}