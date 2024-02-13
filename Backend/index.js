const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
app.use(cors());

app.use(express.static('public'));

const connectedUsers = {};
const userMessages = [];


const connectNamespace = io.of('/connect');

connectNamespace.on('connection', (socket) => {
  console.log('User connected to /connect:', socket.id);

  socket.on('setUsername', (username) => {
    connectedUsers[socket.id] = username;

    connectNamespace.emit('updateUserList', Object.values(connectedUsers));

    console.log(`${username} set username in /connect namespace`);

    
    socket.emit('userMessages', userMessages);

    console.log('Current User List:', Object.values(connectedUsers));
  });

  socket.on('disconnect', () => {
    const username = connectedUsers[socket.id];
    delete connectedUsers[socket.id];

    connectNamespace.emit('updateUserList', Object.values(connectedUsers));

    console.log(`${username} disconnected from /connect`);

   
    console.log('Current User List:', Object.values(connectedUsers));
    console.log('User Messages:', userMessages);
  });
});


const messagesNamespace = io.of('/messages');

messagesNamespace.on('connection', (socket) => {
  console.log('User connected to /messages:', socket.id);

  socket.on('sendMessage', (message) => {
    const username = connectedUsers[socket.id];

   
    userMessages.push({ username, message });

    
    messagesNamespace.emit('userMessages', userMessages);

    

   
    console.log('User Messages:', userMessages);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected from /messages:', socket.id);
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});