var xmen = 533;
window.onload = document.getElementById("span").innerHTML = xmen;
window.onload = document.getElementById("buttonImg2").innerHTML = "<img src='rotatingArrow.gif' class='mark'>";
window.onload = document.getElementById("buttonImg3").innerHTML = "<img src='arrow.png'>";
function testClick() {
    document.getElementById("span").innerHTML = xmen;
}

function buttonSwitch() {
  document.getElementById("buttonImg").innerHTML =  "<img src='rotatingArrow.gif'>";
  document.getElementById("buttonImg2").innerHTML = "<img src='arrow.png'>";
  document.getElementById("buttonImg3").innerHTML = "PLORP";
  
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
