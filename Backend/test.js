const WebSocket = require('ws');

const ws = new WebSocket('wss://wordle-j9ojz5y3c-sakthe-balan.vercel.app/connect');

ws.on('open', () => {
  console.log('WebSocket connection opened');

  const setUsernameMessage = { type: 'setUsername', username: 'TestUser' };
  ws.send(JSON.stringify(setUsernameMessage));
});

ws.on('message', (data) => {
  const message = JSON.parse(data);
  if (message.type === 'updateUserList') {
    console.log('Updated User List:', message.userList);
  }
});

ws.on('close', () => {
  console.log('WebSocket connection closed');
});
