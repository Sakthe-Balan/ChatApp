const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
app.use(cors());

app.use(express.static('public'));



io.of('/connect').on('connection', (socket) => {
  console.log('User connected to /connect:', socket.id);

  socket.on('setUsername', (username) => {
  console.log(`${username} set username in /connect namespace`);
    });

});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
