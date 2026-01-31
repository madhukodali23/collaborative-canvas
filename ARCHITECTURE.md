# Architecture Overview – Real-Time Collaborative Drawing Canvas

## High-Level Design
The application follows a server-authoritative real-time architecture.

Clients are responsible only for:
- Capturing user input
- Rendering strokes on the canvas

The server is responsible for:
- Maintaining the global drawing state
- Ordering events
- Broadcasting updates to all users

---

## Data Flow
1. User draws on the canvas
2. Client converts drawing into stroke data
3. Stroke data is sent to the server via Socket.IO
4. Server stores the stroke and broadcasts it
5. All clients redraw the canvas using server data

---

## WebSocket Protocol (Socket.IO Events)

### Events from Client → Server
- `stroke` : Sends completed stroke data
- `undo` : Requests global undo
- `redo` : Requests global redo
- `cursor` : Sends cursor position

### Events from Server → Client
- `init` : Sends full drawing history to new user
- `stroke` : Broadcasts new stroke
- `redraw` : Sends updated stroke list after undo/redo
- `cursor` : Broadcasts cursor positions

---

## Undo / Redo Strategy
The server maintains two stacks:
- `strokes` : Current canvas state
- `redoStack` : Undone strokes

Undo:
- Pop from `strokes`
- Push into `redoStack`
- Broadcast updated state

Redo:
- Pop from `redoStack`
- Push back into `strokes`
- Broadcast updated state

This ensures global consistency across all users.

---

## Conflict Handling
Multiple users can draw simultaneously.
The server determines the order of strokes based on arrival time.
Later strokes naturally render above earlier strokes.

---

## Performance Considerations
- Canvas redraw is optimized by replaying stored strokes
- Only stroke data is transmitted (not images)
- Cursor updates are lightweight events

---

## Conclusion
This architecture ensures:
- Consistent global state
- Real-time collaboration
- Scalable and maintainable design
