require("dotenv").config();
const express = require('express');
const massive = require("massive");
const session = require('express-session');
const auth_controller = require("./controllers/auth_controller.js");
const { default: userEvent } = require("@testing-library/user-event");


const { SESSION_SECRET, SERVER_PORT, CONNECTION_STRING } = process.env;
const app = express();
app.use(express.json());

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: {
      maxAge: 1000 * 60 * 24 * 60
    }
  })
);

massive({
  connectionString: CONNECTION_STRING,
  ssl: { rejectUnauthorized: false }
})
  .then(dbInstance => {
    app.set("db", dbInstance);
    console.log("database connected");
  })
  .catch(err => console.log(err));

app.post("/auth/create", auth_controller.create);
app.post("/auth/login", auth_controller.login);
app.get("/auth/logout", auth_controller.logout);
app.put("/auth/updateusername", auth_controller.updateUsername);
app.put("/auth/updateuserabout", auth_controller.updateUserAbout);
app.get("/auth/readuser", auth_controller.readUser);

const io = require('socket.io')((app.listen(SERVER_PORT, () => console.log(`server listening on port ${SERVER_PORT}`))), { cors: { origin: true } })

io.on('connection', (socket) => {
  console.log(`Socket ${socket.id} connected`)

  socket.emit('relaySocketId', socket.id)

  socket.on('disconnect', () => {
    console.log(`Socket ${socket.id} disconnected`)
  })

  socket.on('sendPieceSelected', piece => {
    io.emit('receivePieceSelected', piece)
  })

  socket.on('sendMsgs', (message) => {
    io.emit('receiveMsgs', message)
  })

  socket.on('sendMoveHistory', moveHistory => {
    io.emit('receiveMoveHistory', moveHistory)
  })

  socket.on('sendBoardState', checkerboard => {
    socket.broadcast.emit('receiveBoardState', checkerboard)
  })

  socket.on('sendTurnState', turnState => {
    io.emit('receiveTurnState', turnState)
  })

  socket.on('sendOneScore', score => {
    io.emit('receiveOneScore', score)
  })

  socket.on('sendTwoScore', score => {
    io.emit('receiveTwoScore', score)
  })

  socket.on('sendResetMoves', moves => {
    io.emit('receiveResetMoves', moves)
  })

  socket.on('sendGameState', gameObj => {
    io.emit('receiveGameState', gameObj)
  })

  socket.on('sendWin', wonObj => {
    io.emit('receiveWin', wonObj )
  })

  socket.on('concede', str => {
    io.emit('receiveConcede', str)
  })
})
