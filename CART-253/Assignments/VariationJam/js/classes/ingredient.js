/*
 *
 * Class to handle all ingredients displayed on the screen
 * 
 */
"use strict"
class Ingredient {
    constructor(name, image, openImage = null, x, y, size, action = null, actionBtnLbl = null, type = null) {
        this.name = name;
        this.image = image;
        this.openImage = openImage;
        this.x = x;
        this.y = y;
        this.size = size;
        this.action = action;
        this.actionBtnLbl = actionBtnLbl;
        this.type = type

        this.speed = Math.random() * 2 + 1; // randomized speed for solid ingredients

        if (this.type === 'liquid') {
            this.speed = -(Math.random() * 2 + 1); // randomized speed for liquid ingredients
        }
    }

    /**
     * display the ingredient on the canvas
     */
    display() {
        if (this.image) {
            image(this.image, this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
        }
    }


}