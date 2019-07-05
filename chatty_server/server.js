const express = require('express');
const SocketServer = require('ws');
const uuidv4 = require('uuid/v4');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer.Server({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');
  ws.on('open', () => console.log('Client Connected'));
  ws.on('message', function incoming(data) {
    console.log(JSON.parse(data))
    const receiveMsg = JSON.parse(data)

    //need to add id to message 
    receiveMsg.id = uuidv4(); 
  console.log(receiveMsg); 

  //message w/out type
  const sendMsg ={
    type: incomingMessage, 
    id: receiveMsg.id,
    content: receiveMsg.content,
    username:receiveMsg.username
  }


    //broadcast message to all clients and including itself 
    wss.clients.forEach(function each(client){
      console.log({client: client.readyState, SOCKET: SocketServer.OPEN});
      if (client.readyState === SocketServer.OPEN){
        console.log('Currently sending the message to the front end'); 
        client.send(JSON.stringify(sendMsg));
      }
    });


  })
  // Set up a callback for when a Client closes the socket. This usually means they closed their browser.
  ws.on('close', () => console.log('Client disconnected'));
});