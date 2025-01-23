const http = require("http");
const socketIo = require("socket.io");
const server = http.createServer();
require("dotenv").config();
const PORT = process.env.PORT;
const io = socketIo(server, {
  reconnection: true, // Enable reconnection
  reconnectionAttempts: Infinity, // Number of reconnection attempts
  reconnectionDelay: 1000, // Delay between reconnections in milliseconds
  reconnectionDelayMax: 5000, // Maximum delay between reconnections
  timeout: 20000, // Connection timeout before reconnection
  autoConnect: true, // Automatically connect when the socket is created

  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
  pingTimeout: 30000, // Wait 30 seconds for a pong response
  pingInterval: 10000, // Send pings every 10 seconds
});

io.on("connection", (socket) => {
  // Send heartbeat signal every 25 seconds
  const heartbeatInterval = setInterval(() => {
    socket.emit("heartbeat", { message: "ping" });
  }, 5000); // 25 seconds
  socket.on("addSongToPlaylistApi", (data) => {
    io.emit("addSongToPlaylistApiResponse", data);
  });
  socket.on("votingRequest", (data) => {
    io.emit("votingResponse", data);
  });
  socket.on("acceptedRejectStreamReq", (data) => {
    io.emit("acceptedRejectStreamRes", data);
    io.emit("checkActiveStream", data);
  });
  socket.on("sendReqToMasterApi", (data) => {
    io.emit("sendReqToMasterRes", data);
    io.emit("checkActiveStream", data);
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
    io.emit("wallViewRes", data);
    io.emit("playerViewRes", data);
  });
  socket.on("wallViewJumbotronRequest", (data) => {
    io.emit("wallViewJumbotronResponse", data);
  });
  socket.on("handleDragReq", (data) => {
    io.emit("handleDragRes", data);
  });
  socket.on("favoriteSongReq", (data) => {
    io.emit("favoriteSongRes", data);
  });
  socket.on("remainingTimeReq", (data) => {
    io.emit("remainingTimeRes", data);
  });
  socket.on("addSongToPlaylistApi-v2", (data) => {
    io.emit("addSongToPlaylistApiResponse-v2", data);
  });
  socket.on("votingRequest-v2", (data) => {
    io.emit("votingResponse-v2", data);
  });
  socket.on("acceptedRejectStreamReq-v2", (data) => {
    io.emit("acceptedRejectStreamRes-v2", data);
    io.emit("checkActiveStream-v2", data);
  });
  socket.on("sendReqToMasterApi-v2", (data) => {
    io.emit("sendReqToMasterRes-v2", data);
    io.emit("checkActiveStream-v2", data);
  });
  socket.on("themeChangeByMasterApi-v2", (data) => {
    io.emit("themeChangeByMasterRes-v2", data);
  });
  socket.on("limitChangeByMasterApi-v2", (data) => {
    io.emit("limitChangeByMasterRes-v2", data);
  });
  socket.on("advanceTheQueueApi-v2", (data) => {
    io.emit("advanceTheQueueRes-v2", data);
  });
  socket.on("startIntroSecondsRequest-v2", (data) => {
    io.emit("startIntroSecondsResponse-v2", data);
  });
  socket.on("insertSongIntoPlaylistRequest-v2", (data) => {
    io.emit("insertSongIntoPlaylistResponse-v2", data);
  });
  socket.on("emptyPlaylistRequest-v2", (data) => {
    io.emit("emptyPlaylistResponse-v2", data);
  });
  socket.on("RemoveSongFromPlaylistRequest-v2", (data) => {
    io.emit("RemoveSongFromPlaylistResponse-v2", data);
  });
  socket.on("voteCastingRequest-v2", (data) => {
    io.emit("voteCastingResponse-v2", data);
  });
  socket.on("undoActionRequest-v2", (data) => {
    io.emit("undoActionResponse-v2", data);
  });
  socket.on("songAddByCustomerReq-v2", (data) => {
    io.emit("songAddByCustomerRes-v2", data);
  });
  socket.on("bufferTimeReq-v2", (data) => {
    io.emit("bufferTimeRes-v2", data);
  });
  socket.on("undoFavReq-v2", (data) => {
    io.emit("undoFavRes-v2", data);
  });
  socket.on("wallPlayerViewReq-v2", (data) => {
    io.emit("wallViewRes-v2", data);
    io.emit("playerViewRes-v2", data);
  });
  socket.on("wallViewJumbotronRequest-v2", (data) => {
    io.emit("wallViewJumbotronResponse-v2", data);
  });
  socket.on("handleDragReq-v2", (data) => {
    io.emit("handleDragRes-v2", data);
  });
  socket.on("changeSongStatusReq", (data) => {
    io.emit("changeSongStatusRes", data);
  });
  socket.on("favoriteSongReq-v2", (data) => {
    io.emit("favoriteSongRes-v2", data);
  });
  socket.on("remainingTimeReq-v2", (data) => {
    io.emit("remainingTimeRes-v2", data);
  });

  socket.on("removeReq-v2", (data) => {
    io.emit("removeRes-v2", data);
  });
  socket.on("disconnect", () => {
    console.log("A client disconnected:", socket.id);
    clearInterval(heartbeatInterval); // Clear the interval to avoid memory leaks
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
