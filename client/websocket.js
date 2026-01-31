const socket = io("https://collaborative-canvas-vp9s.onrender.com",
  {
    transports: ["websocket"]
  }
);


socket.on("connect", () => {
  console.log("CONNECTED TO SERVER:", socket.id);
});


socket.on("init", (serverStrokes) => {
  strokes = serverStrokes;
  redrawCanvas();
});

socket.on("stroke", (stroke) => {
  strokes.push(stroke);
  redrawCanvas();
});

socket.on("cursor", (data) => {
  cursors[data.id] = { x: data.x, y: data.y };
   redrawCanvas();
});


socket.on("redraw", (serverStrokes) => {
  strokes = serverStrokes;
  redrawCanvas();
});
