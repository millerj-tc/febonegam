//PASSAGES
class Passage {
    constructor(storyID, text, progressbuttons) {
        
        this.storyID = storyID;
        this.text = text;
      this.progressbuttons = progressbuttons;
        }
}

var passage0 = new Passage(0, "Grigory was a penguin", passage1);
var passage1 = new Passage(1, "...but he was also a very big lion.", passage2);
var passage2 = new Passage(2, "Practical.", passage3);
var passage3 = new Passage(3, "Perfect.", passage4);


var wings = "rando";
window.onload = document.getElementById("passages").innerHTML = "passages 0-3";
