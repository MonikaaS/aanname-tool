const server = require("http").createServer();
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

const PORT = 4000;
const NEW_CHAT_MESSAGE_EVENT = "newAssumptionMessage";
const NEW_USER_EVENT = "newUser";
const ALL_USERS = "AllUsers"; // Name of the event
const QUESTIONS = "questions"; // Name of the event
const SEND_TIME = "SendTime"; // Name of the event
const RECEIVE_TIME = "ReceiveTime"; // Name of the event



const usersPerRoom = {};

io.on("connection", (socket) => {
  
  // Join a conversation
  const { roomId } = socket.handshake.query;
  socket.join(roomId);

//   let countdown = 100;
// setInterval(function() {
//    countdown--;
//    console.log(countdown--);
//    io.in(roomId).emit(SEND_TIME, {
//     countdown: countdown
//  });;
// }, 100);

  if (usersPerRoom[roomId] === undefined) {
    usersPerRoom[roomId] = [];
  }

  // Listen for new messages
  socket.on(NEW_CHAT_MESSAGE_EVENT, (data) => {
    io.in(roomId).emit(NEW_CHAT_MESSAGE_EVENT, data);
  });


  socket.on(NEW_USER_EVENT, (userInfo) => {
    io.in(roomId).emit(NEW_USER_EVENT, userInfo);
    usersPerRoom[roomId].push(userInfo);

    io.in(roomId).emit(ALL_USERS, usersPerRoom);    
  });

  socket.on(ALL_USERS, (usersPerRoom) => {
    io.in(roomId).emit(ALL_USERS, usersPerRoom);
    
  });

  socket.on(QUESTIONS, (data) => {
    io.in(roomId).emit(QUESTIONS, data);
  })

  // socket.on(SEND_TIME, (data) => {
  //   //console.log(data)
  //   io.in(roomId).emit(SEND_TIME, { datetime: new Date().getTime() });
  // })
    //here the data object is correct
    //sending back to client

  
  // Leave the room if the user closes the socket
  socket.on("disconnect", () => {
    socket.leave(roomId);
  });
});

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

//used from https://medium.com/swlh/build-a-real-time-chat-app-with-react-hooks-and-socket-io-4859c9afecb0