//PASSAGES
class Passage {
    constructor(passageStoryID, passageText, passageLinks) {
        
        this._storyID = passageStoryID;
        this._ptext = passageText;
        this._progressbuttons = passageLinks;
        }
    get storyID() {
        return this._storyID;
    }
    get ptext() {
        return this._ptext;
    }
    set ptext(x) {
        this._ptext = x;
    }
    get passageLinks() {
        return this._passageLinks;
    }
    set passageLinks(x) {
        this._passageLinks = x;
    }
}

passage0 = new Passage(0, "Grigory was a penguin", []);
passage1 = new Passage(1, "...but he was also a very big lion.", []);
passage2 = new Passage(2, "Practical.", []);
passage3 = new Passage(3, "Perfect.", []);

//passage mapping
passage0.passageLinks = passage1;
passage1.passageLinks = passage2;
passage2.passageLinks = passage3;

var wings = "rando";
window.onload = document.getElementById("passages").innerHTML = "passages 0, empty third arg, technically";
window.onload = document.getElementById("passageDisplay").innerHTML = "test";
