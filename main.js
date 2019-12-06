var xmen = 17;
function testClick() {
    document.getElementById("span").innerHTML = xmen;
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

window.setInterval(report, 1000);

function report() {
    console.log("~~~");
    //console.log(elem);
    //console.log(width);
    console.log(i);
}
