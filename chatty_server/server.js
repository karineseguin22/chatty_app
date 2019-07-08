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
let usersOnline = 0;
console.log(usersOnline); 
wss.on('connection', (ws) => {
  usersOnline++; 
  console.log(usersOnline); 
  console.log('Client connected1');
  ws.on('open', () => console.log('Client Connected2'));
  

  //message that represent users online 
  const usersOnl ={
    type: 'usersOnline', 
    content: usersOnline,
  }
  wss.clients.forEach(function each(client){
    if (client.readyState === SocketServer.OPEN){
      console.log('Currently sending the notification to the front end'); 
      client.send(JSON.stringify(usersOnl));
    }
  });

  ws.on('message', function incoming(data) {
    const receiveMsg = JSON.parse(data)

    //need to add id to message 
    receiveMsg.id = uuidv4(); 

  //create a switch statement to see what type of message it is 
  const command = receiveMsg.type
  console.log(`Type of message: ${receiveMsg.type}`); 
    switch (command){
      case 'postMessage': 
      //message w/out type
  const sendMsg ={
    type: 'incomingMessage', 
    id: receiveMsg.id,
    content: receiveMsg.content,
    username:receiveMsg.username
  }

  //broadcast message to all clients and including itself 
  wss.clients.forEach(function each(client){
    if (client.readyState === SocketServer.OPEN){
      console.log('Currently sending the message to the front end'); 
      client.send(JSON.stringify(sendMsg));
    }
  });
  break; 
  case 'postNotification': 
  console.log('this is a notification in the server')
  const sendNot ={
    type: 'incomingNotification', 
    id: receiveMsg.id,
    content: receiveMsg.content,
  }

  //broadcast message to all clients and including itself 
  wss.clients.forEach(function each(client){
    if (client.readyState === SocketServer.OPEN){
      console.log('Currently sending the notification to the front end'); 
      client.send(JSON.stringify(sendNot));
      console.log(sendNot)
    }
  });
    
    break;
    default:
      console.log('default');
    }
  })
  // Set up a callback for when a Client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected');
    usersOnline--;
    console.log(usersOnline); 
  });
});