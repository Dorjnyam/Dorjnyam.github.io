let isDrawing = false;
let x = 0;
let y = 0;

const myPics = document.getElementById("myPics");
const context = myPics.getContext("2d");
const pixel = document.getElementById("number");
const clear = document.getElementById("clear");
const color = document.getElementById("color");

context.strokeStyle = color.value;
context.lineWidth = parseInt(pixel.ariaValueMax, 10);

color.addEventListener("input", ()=> {
    context.strokeStyle = color.value;
})

clear.addEventListener("click", ()=> {
    context.clearRect(0, 0, myPics.width, myPics.height);
});

pixel.addEventListener("input", () => {
    const newWidth = parseInt(pixel.value, 10);
    context.lineWidth = isNaN(newWidth) || newWidth <= 0 ? 1 : newWidth;
})

myPics.addEventListener("mousedown", (e) => {
  x = e.offsetX;
  y = e.offsetY;
  isDrawing = true;
});

myPics.addEventListener("mousemove", (e) => {
  if (isDrawing) {
    drawLine(context, x, y, e.offsetX, e.offsetY);
    x = e.offsetX;
    y = e.offsetY;
  }
});

window.addEventListener("mouseup", () => {
    isDrawing = false;
});

function drawLine(context, x1, y1, x2, y2) {
  context.beginPath();
  context.moveTo(x1, y1);
  context.lineTo(x2, y2);
  context.stroke();
}