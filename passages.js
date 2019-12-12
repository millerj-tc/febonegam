//PASSAGES
class Passage {
    constructor(storyID, text, progressbuttons) {
        
        this.storyID = storyID;
        this.text = text;
      this.progressbuttons = progressbuttons;
        }
}

passage0 = new Passage(0, "Grigory was a penguin", passage1);
passage1 = new Passage(1, "...but he was also a very big lion.", passage2);
passage2 = new Passage(2, "Practical.", passage3);
passage3 = new Passage(3, "Perfect.", passage4);


var wings = "rando";
window.onload = document.getElementById("passages").innerHTML = "passages 0-3, corrected to non-var";
