//PASSAGES
//class Passage {
 //   constructor(storyID, text, progressbuttons) {
        
//        this.storyID = storyID;
//        this.text = text;
 //       this.progressbuttons = progressbuttons;
        
 //   }
//}

//import { wings } from 'passages';

//new Passage(tempPassID, tempPassText, tempPassButt)

//passages

//passages[0] = 

var xmen = wings;
window.onload = document.getElementById("span").innerHTML = xmen;
window.onload = document.getElementById("buttonImg2").innerHTML = "<img src='rotatingArrow.gif' class='mark'>";
window.onload = document.getElementById("buttonImg3").innerHTML = "<img src='arrow.png'>";
function testClick() {
    document.getElementById("span").innerHTML = xmen;
}

var buttonRotation = 0;

function buttonSwitch() {
  if (buttonRotation == 0) {
      buttonRotation = 1;
      document.getElementById("buttonImg").innerHTML =  "<button class='button' onclick='buttonSwitch()'><img src='rotatingArrow.gif'></button>";
      var buttonTimer = window.setInterval(resetButton, 805)
      } 
    
 function resetButton() {
      buttonRotation = 0;
     clearInterval(buttonTimer);
      document.getElementById("buttonImg").innerHTML =  "<button class='button' onclick='buttonSwitch()'><img src='arrow.png'></button>";      
  }
  
}

var i = 0;
function move() {
  if (i == 0) {
    i = 1;
    var elem = document.getElementById("myBar");
    console.log("?" + String(elem));
    var width = 1;
    var id = setInterval(frame, 10);
    function frame() {
      if (width >= 100) {
        clearInterval(id);
        i = 0;
      } else {
        width++;
        elem.style.width = width + "%";
      }
    }
  }
}

var count = 0;

window.setInterval(report, 1000);

function report() {
    count = count + 1;
    document.getElementById("count").innerHTML = count;
}
