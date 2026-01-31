const express = require('express');
const {Server} = require('socket.io');
const app = express();
const cors = require('cors');

const http = require('http');
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "https://collaborative-canvas-vp9s.onrender.com",
    methods: ["GET", "POST"]
  }
});



let strokes = [];
let redoStack = [];

io.on('connection', (socket)=>{
     console.log("User connected:", socket.id);

     socket.emit('init', strokes);

     socket.on('stroke', (stroke)=>{
            strokes.push(stroke);
            redoStack = []; 
            io.emit('stroke', stroke);
     })

     socket.on("undo", () => {
        if (strokes.length === 0) return;

        const undoneStroke = strokes.pop();
        redoStack.push(undoneStroke);

        io.emit("redraw", strokes);
    });

    socket.on("redo", () => {
        if (redoStack.length === 0) return;

        const stroke = redoStack.pop();
        strokes.push(stroke);

        io.emit("redraw", strokes);
    });

   socket.on("cursor", (cursorData) => {
    socket.broadcast.emit("cursor", {
        id: socket.id,
        x: cursorData.x,
        y: cursorData.y
    });
    });




     console.log("Ready for drawing");
})




server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});