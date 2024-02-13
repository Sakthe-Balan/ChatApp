const ioClient = require('socket.io-client');

const socket = ioClient('http://localhost:3001/connect'); 

socket.on('updateUserList', (userList) => {
  console.log('Updated User List:', userList);
});


const username = 'TestUser';
socket.emit('setUsername', username);


