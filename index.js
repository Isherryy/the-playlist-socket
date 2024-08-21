const http = require("http");
const socketIo = require("socket.io");
const server = http.createServer();
require("dotenv").config();
const PORT = process.env.PORT;
const io = socketIo(server, {
  reconnection: true, // Enable reconnection
  reconnectionAttempts: 5, // Number of reconnection attempts
  reconnectionDelay: 1000, // Delay between reconnections in milliseconds
  reconnectionDelayMax: 5000, // Maximum delay between reconnections
  timeout: 20000, // Connection timeout before reconnection
  autoConnect: true, // Automatically connect when the socket is created
  // transports: ["websocket"], // Use WebSocket transport only
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("addSongToPlaylistApi", (data) => {
    socket.broadcast.emit("addSongToPlaylistApiResponse", data);
  });
  socket.on("votingRequest", (data) => {
    socket.broadcast.emit("votingResponse", data);
  });
  socket.on("acceptedRejectStreamReq", (data) => {
    socket.broadcast.emit("acceptedRejectStreamRes", data);
    socket.broadcast.emit("checkActiveStream", data);
  });
  socket.on("sendReqToMasterApi", (data) => {
    socket.broadcast.emit("sendReqToMasterRes", data);
    socket.broadcast.emit("checkActiveStream", data);
  });
  socket.on("themeChangeByMasterApi", (data) => {
    socket.broadcast.emit("themeChangeByMasterRes", data);
  });
  socket.on("limitChangeByMasterApi", (data) => {
    socket.broadcast.emit("limitChangeByMasterRes", data);
  });
  socket.on("advanceTheQueueApi", (data) => {
    socket.broadcast.emit("advanceTheQueueRes", data);
  });
  socket.on("startIntroSecondsRequest", (data) => {
    socket.broadcast.emit("startIntroSecondsResponse", data);
  });
  socket.on("insertSongIntoPlaylistRequest", (data) => {
    socket.broadcast.emit("insertSongIntoPlaylistResponse", data);
  });
  socket.on("emptyPlaylistRequest", (data) => {
    socket.broadcast.emit("emptyPlaylistResponse", data);
  });
  socket.on("RemoveSongFromPlaylistRequest", (data) => {
    socket.broadcast.emit("RemoveSongFromPlaylistResponse", data);
  });
  socket.on("voteCastingRequest", (data) => {
    socket.broadcast.emit("voteCastingResponse", data);
  });
  socket.on("undoActionRequest", (data) => {
    socket.broadcast.emit("undoActionResponse", data);
  });
  socket.on("songAddByCustomerReq", (data) => {
    socket.broadcast.emit("songAddByCustomerRes", data);
  });
  socket.on("bufferTimeReq", (data) => {
    socket.broadcast.emit("bufferTimeRes", data);
  });
  socket.on("undoFavReq", (data) => {
    socket.broadcast.emit("undoFavRes", data);
  });
  socket.on("wallPlayerViewReq", (data) => {
    socket.broadcast.emit("wallViewRes", data);
    socket.broadcast.emit("playerViewRes", data);
  });
  socket.on("wallViewJumbotronRequest", (data) => {
    socket.broadcast.emit("wallViewJumbotronResponse", data);
  });
  socket.on("handleDragReq", (data) => {
    socket.broadcast.emit("handleDragRes", data);
  });
});
const votingRoom = io.of("/voting");
votingRoom.on("connection", (socket) => {
  socket.join("voteRoom");

  socket.on("voteCastingRequest", (data) => {
    votingRoom.to("voteRoom").emit("voteCastingResponse", data);
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
