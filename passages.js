//PASSAGES
class Passage {
    constructor(passageStoryID, passageText, passageLinks) {
        
        this.storyID = passageStoryID;
        this.ptext = passageText;
      this.progressbuttons = passageLinks;
        }
        get ptext() {
            return this.ptext;   
        }
        get progressbuttons() {
            return this.progressbuttons;   
        }
}

passage0 = new Passage(0, "Grigory was a penguin", passage1);
passage1 = new Passage(1, "...but he was also a very big lion.", passage2);
//passage2 = new Passage(2, "Practical.", passage3);
//passage3 = new Passage(3, "Perfect.", passage4);


var wings = "rando";
window.onload = document.getElementById("passages").innerHTML = "passages 0-3, corrected to non-var";
