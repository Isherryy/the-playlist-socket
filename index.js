const http = require("http");
const socketIo = require("socket.io");
const server = http.createServer();
require("dotenv").config();

const PORT = process.env.PORT;
const LISTING = process.env.SOCKET_LISTNER_API_URL;

const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("addSongToPlaylistApi", (data) => {
    io.emit("addSongToPlaylistApiResponse", data);
  });
  socket.on("votingRequest", (data) => {
    io.emit("votingResponse", data);
  });
  socket.on("acceptedRejectStreamReq", (data) => {
    io.emit("acceptedRejectStreamRes", data);
  });
  socket.on("sendReqToMasterApi", (data) => {
    io.emit("sendReqToMasterRes", data);
  });
  socket.on("themeChangeByMasterApi", (data) => {
    io.emit("themeChangeByMasterRes", data);
  });
  socket.on("limitChangeByMasterApi", (data) => {
    io.emit("limitChangeByMasterRes", data);
  });
  socket.on("advanceTheQueueApi", (data) => {
    io.emit("advanceTheQueueRes", data);
  });
  socket.on("startIntroSecondsRequest", (data) => {
    io.emit("startIntroSecondsResponse", data);
  });
  socket.on("insertSongIntoPlaylistRequest", (data) => {
    io.emit("insertSongIntoPlaylistResponse", data);
  });
  socket.on("emptyPlaylistRequest", (data) => {
    io.emit("emptyPlaylistResponse", data);
  });
  socket.on("RemoveSongFromPlaylistRequest", (data) => {
    io.emit("RemoveSongFromPlaylistResponse", data);
  });
  socket.on("voteCastingRequest", (data) => {
    io.emit("voteCastingResponse", data);
  });
  socket.on("undoActionRequest", (data) => {
    io.emit("undoActionResponse", data);
  });
  socket.on("songAddByCustomerReq", (data) => {
    io.emit("songAddByCustomerRes", data);
  });
  socket.on("bufferTimeReq", (data) => {
    io.emit("bufferTimeRes", data);
  });
  socket.on("undoFavReq", (data) => {
    io.emit("undoFavRes", data);
  });
  socket.on("wallPlayerViewReq", (data) => {
    io.emit("wallPlayerViewRes", data);
  });
  socket.on("handleDragReq", (data) => {
    io.emit("handleDragRes", data);
  });
});
const votingRoom = io.of("/voting");
votingRoom.on("connection", (socket) => {
  socket.join("voteRoom");

  socket.on("voteCastingRequest", (data) => {
    // Emit to clients in the 'voteRoom' only
    votingRoom.to("voteRoom").emit("voteCastingResponse", data);
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
