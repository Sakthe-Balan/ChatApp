const ioClient = require('socket.io-client');

const socket = ioClient('http://localhost:3001/connect'); 


const username = 'TestUser';
socket.emit('setUsername', username);


