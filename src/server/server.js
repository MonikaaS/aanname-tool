// const express = require("express");
// const path = require("path");
// const app = express();
const server = require("http").createServer();
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});
const PORT = process.env.PORT || 4000;

// app.use(express.static(path.join(__dirname, "../../build")));
// app.get("*", (req, res, next) =>
//   res.sendFile(path.resolve(__dirname, "../../build", "index.html"))
// );

const NEW_CHAT_MESSAGE_EVENT = "newAssumptionMessage";
const NEW_USER_EVENT = "newUser";
const ALL_USERS = "AllUsers";
const QUESTIONS = "questions";
const SEND_TIME = "SendTime";
const RECEIVE_POSITION = "ReceivePosition";
const ALL_ASSUMPTIONS = "AllAssumptions";
const DELETE_ASSUMPTIONS = "DeleteAssumptions";
const NEW_POSITION = "SetPosition";
const SELECTED_ASSUMPTION = "SelectedAssumption";

const usersPerRoom = {};
const assumptionsPerRoom = {};

io.on("connection", (socket) => {
  // Join a conversation
  const { roomId } = socket.handshake.query;
  socket.join(roomId);

  if (usersPerRoom[roomId] === undefined) {
    usersPerRoom[roomId] = [];
  }

  if (assumptionsPerRoom[roomId] === undefined) {
    assumptionsPerRoom[roomId] = [];
  }

  socket.on(NEW_USER_EVENT, (userInfo) => {
    io.in(roomId).emit(NEW_USER_EVENT, userInfo);
    usersPerRoom[roomId].push(userInfo);
    io.in(roomId).emit(ALL_USERS, usersPerRoom);
  });

  // Listen for new messages
  socket.on(NEW_CHAT_MESSAGE_EVENT, (data) => {
    io.in(roomId).emit(NEW_CHAT_MESSAGE_EVENT, data);
    assumptionsPerRoom[roomId].push(data);
    io.in(roomId).emit(ALL_ASSUMPTIONS, assumptionsPerRoom);
  });

  socket.on(QUESTIONS, (data) => {
    io.in(roomId).emit(QUESTIONS, data);
  });

  socket.on(SEND_TIME, (data) => {
    io.in(roomId).emit(SEND_TIME, data);
  });

  socket.on(RECEIVE_POSITION, (data) => {
    console.log(data.assumption);
    console.log(data);
    assumptionsPerRoom[roomId].find((element) => {
      if (element.assumption === data.assumption) {
        element.xPosition = data.xPosition;
        element.yPosition = data.yPosition;
      }
    });
    console.log(assumptionsPerRoom);
    io.in(roomId).emit(RECEIVE_POSITION, assumptionsPerRoom);
    // io.in(roomId).emit(SET_POSITION, assumptionsPerRoom);
  });

  socket.on(DELETE_ASSUMPTIONS, (data) => {
    if (data.assumption !== "") {
      const index = assumptionsPerRoom[roomId].findIndex((key) => {
        return key.assumption === data.assumption;
      });

      assumptionsPerRoom[roomId].splice(index, 1);
    }
    io.in(roomId).emit(DELETE_ASSUMPTIONS, assumptionsPerRoom);
  });

  socket.on(SELECTED_ASSUMPTION, (data) => {
    assumptionsPerRoom[roomId].find((element) => {
      if (element.assumption === data.assumption) {
        element.active = data.active;
      }
    });
    io.in(roomId).emit(SELECTED_ASSUMPTION, assumptionsPerRoom);
  });

  io.in(roomId).emit(ALL_USERS, usersPerRoom);

  io.in(roomId).emit(ALL_ASSUMPTIONS, assumptionsPerRoom);

  //here the data object is correct
  //sending back to client

  // Leave the room if the user closes the socket
  socket.on("disconnect", () => {
    socket.leave(roomId);
  });
});

server.listen(PORT);
//used from https://medium.com/swlh/build-a-real-time-chat-app-with-react-hooks-and-socket-io-4859c9afecb0
