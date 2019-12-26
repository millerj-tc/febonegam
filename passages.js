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
    constructor(spiritID, name, easyQuotes, mediumQuotes, hardQuotes, sitAssignment = "unassigned"){
        this._id = spiritID;
        this._name = name;
        this._easyQuotes = easyQuotes;
        this._mediumQuotes = mediumQuotes;
        this._hardQuotes = hardQuotes;
        this._sitAssignment = sitAssignment; //assignment is situation object
        
        
        spiritArray.push(this);
    }
}

wynn = new Spirit(0,"Wynn", ["No problem!"], ["I can handle it!...I think.", "I've got a strong idea! We'll see how it works out."], ["This is wearing me down..."]);
aragorn = new Spirit(1,"Aragorn", ["I'm the right warrior for the job!", "Pray, a harder task next time", "Done in a jiff"]);
gandalf = new Spirit(2,"Gandalf");

//SITUATIONS
var situationArray = [];
class Situation {
    constructor(name, spiritCompatability = [], understandingEntries = [], understood = false, actions, storyFX, tapFX = [], effort = 0, situationID) {
        
        this._name = name;
        this._spiritCompatability = spiritCompatability;  //an array of spirit compatibility info for this situation
        this._understandingEntries = understandingEntries;
        this._understood = understood;
        this._actions = actions;
        this._storyFX = storyFX;
        this._tapFX = tapFX;
        this._assignedSpirits = []; //an array to track currently assigned spirits
        this._effort = effort;
        situationArray.push(this);
        this._situationID = situationArray.length-1;
        
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
    constructor(situationID, spiritCompatName, spiritCompatLevel, spiritCompatEffort, spiritCompatQuote){
        
        this._situationID = situationID;
        this._spiritCompatName = spiritCompatName;
        this._spiritCompatQuote = spiritCompatQuote;
        this._spiritCompatLevel = spiritCompatLevel;
        this._spiritCompatEffort = spiritCompatEffort;
        
    }
}

//An understanding entry is a class whose properties describe how the player gains increasing understanding of the situation as they meet different effort thresholds

class understandingEntry {
    constructor(situationID, understandingID, understandingQuote, understandingEffort, firstView = true, storyFX){
        
        this._situationID = situationID;
        this._understandingID = understandingID;
        this._understandingQuote = understandingQuote;
        this._understandingEffort = understandingEffort;
        this._firstView = firstView;
        this._storyFX = storyFX;
        
    }
}


//Tap rate is a class that describes how different tap rates (by the player) contribute to the situation.

// YOU COULD HAVE THE PLAYER TAP AS FAST AS THEY CAN AT THE BEGINNING OF THE GAME AND THEN HAVE TAPRATES BE PROPORTIONAL TO EACH PLAYER'S MAX TAP RATE. THIS WOULD MAKE THE GAME MORE ACCESSIBLE FOR PEOPLE WITH FINE MOTOR/OTHER DISABLITIES. MAKING THE CHANNEL/OTHER BUTTONS LARGER.

class tapRate{
    constructor(situationID, rateMin,rateMax, tapQuote, effort){
        
        this._situationID = situationID;
        this._rateMin = rateMin;
        this._rateMax = rateMax;
        this._tapQuote = tapQuote;
        this._effort = effort;
        
    }
}


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
passage6._ptext = "You reach in your bag, pulling out your pen and paper.<br><br><i>In this game, you must sometimes exert effort to complete a task or overcome a challenge. You do this by hitting the 'Channel' button. Different channeling rates will affect challenges in different ways. Pay attention to how you feel to see which rate is most effective. You can refresh the rate by hitting 'Refresh'.</i>";
class p6FX {
    constructor() {}
    execute(){
        availableSituations.push(frostfire);
    }
}
passage6._storyFX = new p6FX;
frostfire = new Situation("Frostfire");
frostfire._understandingEntries.push(new understandingEntry(0,0,"There is a fire in your chest. You must keep drawing.", 5));
frostfire._understandingEntries.push(new understandingEntry(0,1,"Your shoulders start to relax.", 10));
frostfire._understandingEntries.push(new understandingEntry(0,2,"You complete the figure. The pressure is gone. You feel a presence over your shoulder.", 15));
class uFX0 {
    constructor(){}
    execute(){
        passage6._progressButtons.push(passage7);
        passage7._linkText = "Look up.";
        refreshPassageButtons();
    }
}
frostfire._understandingEntries[2]._storyFX = new uFX0;
frostfire._tapFX.push(new tapRate(0,5,2.1,"You draw the symbols with a steady hand, forcing yourself to be calm. It feels like you are vibrating.",.9));
frostfire._tapFX.push(new tapRate(0,2,1.6,"The symbols pour from your pen onto paper. It barely feels like you are doing it at all.", 1.5));
frostfire._tapFX.push(new tapRate(0,1.5,.01,"Your hand shakes. You draw the symbols hastily. You are driven by frenetic energy.", 8));

passage7._ptext = "A gray haired, steely eyed person is looking at you. They have taken notice of your symbols...";
class p7FX {
    constructor(){}
    execute(){
        availableSituations = availableSituations.filter(x => x != frostfire);
        //funcSpirit._sitAssignment._assignedSpirits.filter(x => x != funcSpirit)
    }
}
passage7._storyFX = new p7FX;
passage7._progressButtons.push(passage8);

passage8._linkText = "\"Um...hi...\"";
passage8._ptext = "\"I'm She Charlotte. You heard about the frostfire...and then made those?\" She indicates the paper."
class p8FX {
    constructor(){}
    execute(){
        availableSituations.push(paper);
    }
}
passage8._storyFX = new p8FX;
paper = new Situation("Paper");
paper._understandingEntries.push(new understandingEntry(paper._situationID, 0, "\"Um.\"", 1));
paper._understandingEntries.push(new understandingEntry(paper._situationID, 1, "\"...well...\"", 5));
paper._understandingEntries.push(new understandingEntry(paper._situationID, 2, "\"...it's just that...\"", 10));
class uFXpaper3 {
    constructor(){}
    execute() {
        passage8._progressButtons.push(passage9);
        passage9._linkText = "\"I...\"";
        refreshPassageButtons();
    }
}
paper._understandingEntries[2]._storyFX = new uFXpaper3;
paper._tapFX.push(new tapRate(paper._situationID, 5,2.5, "Your thoughts are at a halt.", 0));
paper._tapFX.push(new tapRate(paper._situationID, 2.4, 1.7, "You gather your thoughts, but you'll have to spit them out.", 0));
paper._tapFX.push(new tapRate(paper._situationID, 1.6, .01, "You push your hair out of your face and give an apologetic smile as you speak.", 1));


passage9._ptext = "She looks at you kindly, lets you stumble for a bit. And then gently: \"It's alright, you don't have to explain. I understand.\"";
class p9FX {
    constructor(){};
    execute(){
        availableSituations = availableSituations.filter(x => x != paper);
    }
}
passage9._storyFX = new p9FX;
passage9._progressButtons.push(passage10);

passage10._linkText = "\"What?\"";
passage10._ptext= "\"Listen, I don't have a lot of time. If you want to know more about what makes you draw the symbols, follow that impulse to my house. I'll show you what you can do, and I'll introduce you to everyone.\"<br><br>She walks away.";
passage10._progressButtons.push(passage11);

passage11._linkText = "Stay in your seat";
class p11FX {
    constructor(){}
    
    execute() {
        
        var pickQuote = Math.floor(Math.random()*4);
        
        if(pickQuote == 0) {passage11._ptext = "<i>She feels this too?</i>";}
        if(pickQuote == 1) {passage11._ptext = "<i>\"Everyone?\"</i>";}
        if(pickQuote == 2) {passage11._ptext = "<i>She's the first person to ever understand...</i>";}
        if(pickQuote == 3) {passage11._ptext = "<i>But I'm crazy, right? She's probably crazy too.</i>";}
        
    }
}
passage11._storyFX = new p11FX;
passage11._progressButtons.push(passage11);
passage11._progressButtons.push(passage12);

passage12._linkText = "Follow the impulse outside";
passage12._ptext = "The street is noisy. Carriages roll by, and people too."
thestreet = new Situation("The Street");
thestreet._understandingEntries.push(new understandingEntry(thestreet._situationID, 0, "You can feel a tug on the space in front of you.", 2));
thestreet._understandingEntries.push(new understandingEntry(thestreet._situationID, 1, "You start to follow it.", 6));
thestreet._understandingEntries.push(new understandingEntry(thestreet._situationID, 2, "The tug leads you down an alley.", 8));
class uFXthestreet3 {
    constructor(){}
    execute(){
        passage12._progressButtons.push(passage13);
        passage13._linkText = "Go down the alley";
        refreshPassageButtons();
    }
}
thestreet._understandingEntries[2]._storyFX = new uFXthestreet3;
thestreet._tapFX.push(new tapRate(thestreet._situationID, 5,3.5, "The tug beats in time with your heart.", 3));
thestreet._tapFX.push(new tapRate(thestreet._situationID, 3.4,2.4, "Silence expands in your brain, and a current leads you toward the tug.", 1));
thestreet._tapFX.push(new tapRate(thestreet._situationID, 2.3,.01, "You're trying too hard, you can't feel the impulse at all.", 0));
class p12FX {
    constructor(){}
    execute(){
        availableSituations.push(thestreet);
    }
}
passage12._storyFX = new p12FX;

passage13._ptext = "A dark alley."
class p13FX {
    constructor(){}
    execute(){
        availableSituations = availableSituations.filter(x => x!= thestreet);
    }
}
passage13._storyFX = new p13FX;