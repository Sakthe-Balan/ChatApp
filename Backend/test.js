const io = require('socket.io-client');

const messagesSocket = io('http://localhost:3001/messages');

messagesSocket.on('userMessages', (userMessages) => {
  console.log('User Messages (Messages Namespace):', userMessages);

  // Disconnect from the /messages namespace after receiving messages
  messagesSocket.disconnect();
});

// Set a username and send a message in the /messages namespace
const username = 'TestUser';
const message = 'Hello, world!';
messagesSocket.emit('sendMessage', { username, message });
