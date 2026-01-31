==============================
REAL-TIME COLLABORATIVE DRAWING CANVAS
FULL SUBMISSION CONTENT
==============================


==============================
FOLDER STRUCTURE
==============================

collaborative-canvas/
├── client/
│   ├── index.html
│   ├── style.css
│   ├── canvas.js
│   ├── websocket.js
├── server/
│   ├── server.js
├── package.json
├── package-lock.json
├── README.md
└── ARCHITECTURE.md


==============================
README.md
==============================

# 🎨 Real-Time Collaborative Drawing Canvas

## 📌 Overview
This project is a real-time multi-user drawing canvas where multiple users can draw simultaneously on a shared board.  
All drawing actions are synchronized instantly across users using Socket.IO, and the application supports global undo and redo.

The project is built using the raw HTML5 Canvas API (no drawing libraries), focusing on real-time systems, state synchronization, and clean architecture.

---

## 🚀 Features
- Real-time collaborative drawing
- Multiple users drawing simultaneously
- Smooth drawing using raw HTML5 Canvas API
- Global undo and redo (server-controlled)
- Ghost cursor indicators for user presence
- Server-authoritative state management
- No canvas or drawing libraries used

---

## 🛠 Tech Stack
- Frontend: HTML, CSS, Vanilla JavaScript
- Backend: Node.js
- Real-Time Communication: Socket.IO
- Canvas API: HTML5 getContext("2d")

---

## ⚙️ Installation & Setup

1. Install dependencies
npm install

2. Start the server
node server/server.js

3. Run the frontend
Open client/index.html using Live Server in VS Code or any local static server.

---

## 🧪 Testing with Multiple Users
- Open the app in two or more browser tabs
- Draw in one tab and observe real-time updates in others
- Test undo and redo from different tabs
- Observe ghost cursors moving across screens

---

## 🔄 Undo / Redo Behavior
- Undo and redo are global
- Any user can undo or redo any stroke
- New drawing clears redo history
- Server maintains the global history state

---

## ⚠️ Known Limitations
- Drawings are not persisted after server restart
- Performance may degrade with very large stroke histories
- Advanced tools (eraser, shapes) are not included

---

## ⏱ Time Spent
Approximately 4–5 days

---

## 📄 Documentation
See ARCHITECTURE.md for detailed system design and data flow.


==============================
ARCHITECTURE.md
==============================

# Architecture Overview – Real-Time Collaborative Drawing Canvas

## 1. Overview
This application is a real-time collaborative drawing canvas where multiple users interact on a shared HTML5 canvas.  
A server-authoritative architecture is used to maintain a consistent global drawing state.

---

## 2. High-Level Architecture
The system is divided into two layers:

Client (Browser):
- Captures mouse or pointer input
- Converts drawing actions into stroke data
- Renders strokes using the Canvas API
- Communicates with server via Socket.IO

Server (Node.js + Socket.IO):
- Maintains global drawing state
- Orders drawing events
- Handles global undo and redo
- Broadcasts updates to all clients

The server is the single source of truth.

---

## 3. Data Model
Each drawing action is represented as a stroke object:

{
  color: "#000000",
  width: 4,
  points: [
    { x: 120, y: 240 },
    { x: 125, y: 245 }
  ]
}

A stroke represents one continuous pointer action.

---

## 4. Data Flow
1. User draws on the canvas
2. Client records points into a stroke object
3. Client sends the stroke to the server
4. Server stores the stroke in global history
5. Server broadcasts the update
6. All clients redraw the canvas

---

## 5. WebSocket Communication

Client to Server Events:
- stroke: send completed stroke
- undo: request global undo
- redo: request global redo
- cursor: send cursor position

Server to Client Events:
- init: send existing strokes to new user
- stroke: broadcast new stroke
- redraw: broadcast updated canvas state
- cursor: broadcast cursor positions

---

## 6. Global Undo / Redo Strategy
The server maintains two stacks:
- strokes: current canvas state
- redoStack: undone strokes

Undo:
- Pop stroke from strokes
- Push to redoStack
- Broadcast updated strokes

Redo:
- Pop stroke from redoStack
- Push back to strokes
- Broadcast updated strokes

New drawing clears the redo stack.

---

## 7. Conflict Handling
Multiple users can draw simultaneously.  
The server orders strokes based on arrival time.  
Later strokes naturally render above earlier ones.

---

## 8. Ghost Cursors
Ghost cursors show where other users are currently interacting.  
They are temporary visual indicators and do not affect drawing history.

---

## 9. Performance Considerations
- Stroke data is transmitted instead of images
- Canvas is redrawn from stored stroke history
- Socket.IO ensures low-latency communication

---

## 10. Conclusion
This architecture ensures:
- Real-time collaboration
- Consistent global state
- Reliable undo and redo
- Clean separation of responsibilities

==============================
END OF SUBMISSION CONTENT
==============================
