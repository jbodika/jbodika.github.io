/*
 *
 * Class to handle all text boxes displayed on the screen
 * 
 */
"use strict"
class TextArea {
    constructor(x, y, w, h, r) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.r = r;
        this.texts = [];

    }
    addText(txt, txtX, txtY, txtSize, txtCol = 'white') {
            this.texts.push({ txt, txtX, txtY, txtSize, txtCol })


        }
        /**
         * display the text area on the canvas
         */
    display(bgCol = '#fff', stkCol = '#fff') {
        push();
        stroke(stkCol);
        strokeWeight(2);
        fill(bgCol);
        rect(this.x, this.y, this.w, this.h, this.r);

        for (let textData of this.texts) {
            fill(textData.txtCol);
            textSize(textData.txtSize);
            textAlign(CENTER);
            text(textData.txt, textData.txtX, textData.txtY);
        }

        pop();


    }
    clearText() {
        this.text = "";
    }
}