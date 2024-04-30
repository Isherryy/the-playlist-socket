const http = require("http");
const socketIo = require("socket.io");
const server = http.createServer();
require("dotenv").config();

const PORT = process.env.PORT;
const LISTING = process.env.SOCKET_LISTNER_API_URL;
const io = socketIo(server, {
  cors: {
    origin: LISTING,
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("addSongToPlaylistApi", (data) => {
    io.emit("addSongToPlaylistApiResponse", data);
  });
  socket.on("message", (data) => {
    console.log("message", data);
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});