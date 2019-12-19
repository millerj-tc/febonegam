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

//SPIRITS
class Spirit {
    constructor(name){
        this._name = name;
    }
}

wynn = new Spirit("Wynn");
aragorn = new Spirit("Aragorn");
gandalf = new Spirit("Gandalf");

//SITUATIONS
class Situation {
    constructor(situationID, name, spiritCompatability, understandingEntries, actions, storyFX, tapFX) {
        
        this._situationID = situationID;
        this._name = name;
        this._spiritCompatability = spiritCompatability;  //an array of spirit compatibility info for this situation
        this._understandingEntries = understandingEntries;
        this._actions = actions;
        this._storyFX = storyFX;
        this._tapFX = tapFX;
        
    }
}

//Spirit Compat(abilty) is a class whose properties describes how well any given spirit contributes to the situation -- both in terms of player feedback and effort.

class spiritCompat {
    constructor(situationID, spiritCompatName, spiritCompatQuote, spiritCompatEffort){
        
        this._situationID = situationID;
        this._spiritCompatName = spiritCompatName;
        this._spiritCompatQuote = spiritCompatQuote;
        this.__spiritCompatEffort = spiritCompatEffort;
        
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
    constructor(situationID, rate, tapQuote, effort){
        
        this._situationID = situationID;
        this._rate = rate;
        this._tapQuote = tapQuote;
        this._effort = effort;
        
    }
}

frostfire = new Situation();

frostfire._situationID = 0;
frostfire._name = "Frostfire";
frostfire._spiritCompatability = [];
frostfire._understandingEntries = [];
frostfire._tapFX = [];

frostfire._spiritCompatability.push(new spiritCompat(0, "Wynn", "I'll do my best.", 1));
frostfire._spiritCompatability.push(new spiritCompat(0, "Aragorn", "I'm the right warrior for the job.", 1.5));
frostfire._spiritCompatability.push(new spiritCompat(0, "Gandalf", "This task must not fall to me.", .5));


frostfire._understandingEntries.push(new understandingEntry(0,0,"Frostfire spreads across the land of Ysos, leaving destruction in its wake.", 10));
frostfire._understandingEntries.push(new understandingEntry(0,1,"The progress of the frostfire has been halted at the mountain ranges by unusually early thaw.", 15));
frostfire._understandingEntries.push(new understandingEntry(0,2,"The frostfire has died down, and the inhabitants of Ysos start to pick up the pieces of their lives", 20));                                     
frostfire._tapFX.push(new tapRate(0,12,"You don't feel much.",.2));
frostfire._tapFX.push(new tapRate(0,30,"Warmth fills your chest", 1));
frostfire._tapFX.push(new tapRate(0,50,"In your mind, you can see a sparkle of frostfire guttering.", 2));


passage0 = new Passage(0);
passage1 = new Passage(1, "...but he was also a very big lion.", []);
passage2 = new Passage(2, "Practical.", []);
passage3 = new Passage(3, "Perfect.", []);

//what if you initiate object with no args, then define later like this? That way you don't need a separate passage mapping section and the classes with more arguments (like Situations) are more readable

passage0.ptext = "Grigory was a penguin";
passage0.passageLinks = passage1;



//passage mapping
passage0.passageLinks = passage1;
passage1.passageLinks = passage2;
passage2.passageLinks = passage3;
