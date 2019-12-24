//PASSAGES
var passageArray = [];
class Passage {
    constructor(passageStoryID, linkText, passageText, passageLinks = [], storyFX) {
        
        this._storyID = passageStoryID;
        this._linkText = linkText;
        this._ptext = passageText;
        this._progressButtons = passageLinks;
        this._storyFX = storyFX;
        passageArray.push(this);
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

//SPIRITS
var spiritArray = [];
class Spirit {
    constructor(spiritID, name, sitAssignment){
        this._id = spiritID;
        this._name = name;
        this._sitAssignment = sitAssignment; //assignment is situation object
        spiritArray.push(this);
    }
}

wynn = new Spirit(0,"Wynn");
aragorn = new Spirit(1,"Aragorn");
gandalf = new Spirit(2,"Gandalf");

//SITUATIONS
var situationArray = [];
class Situation {
    constructor(situationID, name, spiritCompatability = [], understandingEntries = [], actions, storyFX, tapFX = [], effort = 0) {
        
        this._situationID = situationID;
        this._name = name;
        this._spiritCompatability = spiritCompatability;  //an array of spirit compatibility info for this situation
        this._understandingEntries = understandingEntries;
        this._actions = actions;
        this._storyFX = storyFX;
        this._tapFX = tapFX;
        this._assignedSpirits = []; //an array to track currently assigned spirits
        this._effort = effort;
        situationArray.push(this);
        
    }
    
    findCompatibility(spiritID) {
        
        var methodSpi = findSpiritByID(spiritID);
        var compat;

        for(compat of this._spiritCompatability) {
        
            if(compat._spiritCompatName == methodSpi._name) {
          
                return compat;
          
        }
        
      }
        
    }
}

//Spirit Compat(abilty) is a class whose properties describe how well any given spirit contributes to the situation -- both in terms of player feedback and effort.

class spiritCompat {
    constructor(situationID, spiritCompatName, spiritCompatQuote, spiritCompatEffort){
        
        this._situationID = situationID;
        this._spiritCompatName = spiritCompatName;
        this._spiritCompatQuote = spiritCompatQuote;
        this._spiritCompatEffort = spiritCompatEffort;
        
    }
}

//An understanding entry is a class whose properties describe how the player gains increasing understanding of the situation as they meet different effort thresholds

class understandingEntry {
    constructor(situationID, understandingID, understandingQuote, understandingEffort){
        
        this._situationID = situationID;
        this._understandingID = understandingID;
        this._understandingQuote = understandingQuote;
        this._understandingEffort = understandingEffort;
        
    }
}


//Tap rate is a class that describes how different tap rates (by the player) contribute to the situation.

class tapRate{
    constructor(situationID, rateMin,rateMax, tapQuote, effort){
        
        this._situationID = situationID;
        this._rateMin = rateMin;
        this._rateMax = rateMax;
        this._tapQuote = tapQuote;
        this._effort = effort;
        
    }
}

frostfire = new Situation();
rampagingDogs = new Situation();

frostfire._situationID = 0;
frostfire._name = "Frostfire";

frostfire._spiritCompatability.push(new spiritCompat(0, "Wynn", "I'll do my best.", 1));
frostfire._spiritCompatability.push(new spiritCompat(0, "Aragorn", "I'm the right warrior for the job.", 1.5));
frostfire._spiritCompatability.push(new spiritCompat(0, "Gandalf", "This task must not fall to me.", .5));


frostfire._understandingEntries.push(new understandingEntry(0,0,"Frostfire spreads across the land of Ysos, leaving destruction in its wake.", 0));
frostfire._understandingEntries.push(new understandingEntry(0,1,"The progress of the frostfire has been halted at the mountain ranges by unusually early thaw.", 20));
frostfire._understandingEntries.push(new understandingEntry(0,2,"The frostfire has died down, and the inhabitants of Ysos start to pick up the pieces of their lives", 30));                                     
frostfire._tapFX.push(new tapRate(0,5,2.1,"You don't feel much.",.2));
frostfire._tapFX.push(new tapRate(0,2,1.6,"Warmth fills your chest", 1));
frostfire._tapFX.push(new tapRate(0,1.5,.01,"In your mind, you can see a sparkle of frostfire guttering.", 2));

rampagingDogs._situationID = 1;
rampagingDogs._name = "Rampaging Dogs";

rampagingDogs._spiritCompatability.push(new spiritCompat(1,"Wynn", "I will calm the puppers.", 2));
rampagingDogs._spiritCompatability.push(new spiritCompat(1, "Aragorn", "Dogs?", .5));
rampagingDogs._spiritCompatability.push(new spiritCompat(1, "Gandalf", "A calming spell should work...", 1));

rampagingDogs._understandingEntries.push(new understandingEntry(1,0, "The dags are everywhere!", 0));


function passageInit() {

    passage0 = new Passage(0);
    passage1 = new Passage(1);
    passage2 = new Passage(2);
    passage3 = new Passage(3);
    passage4 = new Passage(4);
    passage5 = new Passage(5);
    passage6 = new Passage(6);
    passage7 = new Passage(7);
    passage8 = new Passage(8);
    passage9 = new Passage(9);
    passage10 = new Passage(10);
    passage11 = new Passage(11);
    passage12 = new Passage(12);
    passage13 = new Passage(13);
    passage14 = new Passage(14);
    passage15 = new Passage(15);
    passage16 = new Passage(16);
    passage17 = new Passage(17);
    passage18 = new Passage(18);
    passage19 = new Passage(19);
    passage20 = new Passage(20);
    
}

passageInit();


//what if you initiate object with no args, then define later like this? That way you don't need a separate passage mapping section and the classes with more arguments (like Situations) are more readable

passage0._ptext = "You are sitting in a cafe, one you frequent almost every day.<br><br><i>...what always brings you here?...</i>";
passage0._progressButtons.push(passage1);

passage1._linkText = "Keep to yourself";
passage1._ptext = "There are two people chattering at the table next to you.";
passage1._progressButtons.push(passage2);

passage2._linkText = "Try not to listen";
passage2._ptext = "\"Did you hear about the massive frostfire that broke out?\"<br>\"Yeah, I can't believe it. People are dying, homes destroyed. It's awful.\""
passage2._progressButtons.push(passage3);

passage3._linkText = "...";
passage3._ptext = "<i>You know people talk about this shit, and yet you still show up.</i>";
passage3._progressButtons.push(passage4);

passage4._linkText = "Look around";
passage4._ptext = "You can feel it. That pressure. It's tugging at you."
passage4._progressButtons.push(passage5);
passage4._progressButtons.push(passage6);

passage5._linkText = "Resist...";

class p5FX {
    constructor(){}
    
    execute() {
        
        availableSituations.push(frostfire);
        
        var pickQuote = Math.floor(Math.random()*3);
        
        if(pickQuote == 0) {passage5._ptext = "You can feel it in your teeth.";}
        if(pickQuote == 1) {passage5._ptext = "It's not like it hurts anyone...";}
        if(pickQuote == 2) {passage5._ptext = "You take a deep breath.";}
        
    }
}

passage5._storyFX = new p5FX;
passage5._progressButtons.push(passage5);
passage5._progressButtons.push(passage6);

passage6._linkText = "Reach for your bag";
passage6._ptext = "You reach in your bag.";


 //Put any code that executes when you arrive at the passage inside of execute()
//class passage1FX {
//    constructor() {   
//    }
//    execute() {
//        availableSituations.push(frostfire);   
//    }
//}
//
//passage1._storyFX = new passage1FX;




//passage mapping
passage0.passageLinks = passage1;
passage1.passageLinks = passage2;
passage2.passageLinks = passage3;
