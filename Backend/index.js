const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const cors = require('cors');

const app = express();

const server = http.createServer(app);
app.use(cors());

const connectWss = new WebSocket.Server({ noServer: true });
const messagesWss = new WebSocket.Server({ noServer: true });

const connectedUsersMap = new Map(); 
const userMessages = [];

connectWss.on('connection', (socket) => {
  console.log('User connected to /connect:', socket._socket.remoteAddress);

  socket.on('message', (data) => {
    const message = JSON.parse(data);
    if (message.type === 'setUsername') {
      const userAddress = socket._socket.remoteAddress;

     
      if (!connectedUsersMap.has(userAddress)) {
        connectedUsersMap.set(userAddress, {});
      }

      const userPort = socket._socket.remotePort;
      const existingUser = connectedUsersMap.get(userAddress)[userPort];

      if (existingUser && existingUser === message.username) {
        
        console.log(`Username ${message.username} already exists for ${userAddress}:${userPort}`);
        
        socket.send(JSON.stringify({ type: 'error', message: 'Username already exists. Choose a different one.' }));
        return;
      }

      
      connectedUsersMap.get(userAddress)[userPort] = message.username;

      const userList = Object.values(connectedUsersMap.get(userAddress));
      connectWss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({ type: 'updateUserList', userList }));
        }
      });

      console.log(`${message.username} set username in /connect namespace`);
      console.log('Current User List:', userList);
    }
  });

  socket.on('close', () => {
    const userAddress = socket._socket.remoteAddress;
    const userList = Object.values(connectedUsersMap.get(userAddress));

    connectWss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ type: 'updateUserList', userList }));
      }
    });

    console.log('User disconnected from /connect:', socket._socket.remoteAddress);
    console.log('Current User List:', userList);
    console.log('User Messages:', userMessages);
  });
});

messagesWss.on('connection', (socket) => {
  console.log('User connected to /messages:', socket._socket.remoteAddress);

  socket.on('message', (data) => {
    const message = JSON.parse(data);
    if (message.type === 'sendMessage') {
      userMessages.push({ username: message.username, message: message.message });
      messagesWss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({ type: 'userMessages', userMessages }));
        }
      });
      console.log('User Messages:', userMessages);
    }
  });

  socket.on('close', () => {
    console.log('User disconnected from /messages:', socket._socket.remoteAddress);
  });
});

server.on('upgrade', (request, socket, head) => {
  const pathname = request.url;

  if (pathname === '/connect') {
    connectWss.handleUpgrade(request, socket, head, (ws) => {
      connectWss.emit('connection', ws, request);
    });
  } else if (pathname === '/messages') {
    messagesWss.handleUpgrade(request, socket, head, (ws) => {
      messagesWss.emit('connection', ws, request);
    });
  } else {
    socket.destroy();
  }
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
