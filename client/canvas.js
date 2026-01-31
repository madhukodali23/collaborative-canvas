const canvas = document.getElementById("canvas");
const colorPicker = document.getElementById("colorPicker");
const brushSize = document.getElementById("brushSize");
const redoBtn = document.getElementById("redo");
const undoBtn = document.getElementById("undo");
const ctx = canvas.getContext("2d");

window.strokes = [];
let currentStroke = null;

let redoStack = [];
const cursors = {};


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let x = 0;
let y = 0;
let isDrawing = false;

canvas.addEventListener("pointerdown", (e) => {
    redoStack = [];
    isDrawing = true;
    currentStroke = {
        color: ctx.strokeStyle,
        width: ctx.lineWidth,
        points: [{
            x: e.offsetX,
            y: e.offsetY
        }]
    };
    x = e.offsetX;
    y = e.offsetY;
})

canvas.addEventListener("pointermove", (e) => {
    if (!isDrawing) return;
    const point = {
        x: e.offsetX,
        y: e.offsetY
    }
    socket.emit("cursor", {
        x: e.offsetX,
        y: e.offsetY
    });

    currentStroke.points.push(point);
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    x = e.offsetX;
    y = e.offsetY;
})

canvas.addEventListener("pointerup", (e) => {
    if (!isDrawing) return;
    socket.emit("stroke", currentStroke);
    currentStroke = null;
    isDrawing = false;
})

ctx.lineCap = "round";
ctx.lineJoin = "round";

colorPicker.addEventListener("change", (e) => {
    ctx.strokeStyle = e.target.value;
});

brushSize.addEventListener("change", (e) => {
    ctx.lineWidth = e.target.value;
});

function drawCursors() {
  for (const id in cursors) {
    const c = cursors[id];

    ctx.beginPath();
    ctx.arc(c.x, c.y, 8, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255, 0, 0, 0.7)";
    ctx.fill();

    ctx.font = "12px Arial";
    ctx.fillText("User", c.x + 10, c.y);
  }
}


function redrawCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (const stroke of strokes) {
    ctx.strokeStyle = stroke.color;
    ctx.lineWidth = stroke.width;

    ctx.beginPath();
    const first = stroke.points[0];
    ctx.moveTo(first.x, first.y);

    for (let i = 1; i < stroke.points.length; i++) {
      ctx.lineTo(stroke.points[i].x, stroke.points[i].y);
    }
    ctx.stroke();
  }

  drawCursors(); 
}



undoBtn.addEventListener("click", () => {
    socket.emit("undo");
});


redoBtn.addEventListener("click", () => {
  console.log("REDO CLICKED");
  socket.emit("redo");
});
