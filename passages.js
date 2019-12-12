//PASSAGES
class Passage {
    constructor(storyID, text, progressbuttons) {
        
        this.storyID = storyID;
        this.text = text;
      this.progressbuttons = progressbuttons;
        }
}

var grigory = new Passage(0, "Grigory was a shit", []);

var wings = "rando";
window.onload = document.getElementById("passages").innerHTML = "added Passages class";
