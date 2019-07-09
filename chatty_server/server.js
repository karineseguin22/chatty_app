const express = require('express');
const SocketServer = require('ws');
const uuidv4 = require('uuid/v4');

const PORT = 3001;


const server = express()
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));


const wss = new SocketServer.Server({ server });

let usersOnline = 0; //create object for total users online during session
wss.on('connection', (ws) => {
  usersOnline++;
  console.log('Client connected1');
  let totalUsers = {     
    type: "incomingTotalUsers",
    content: usersOnline
  }
    ws.send(JSON.stringify(totalUsers)); //only send message to client that just connected 


  const usersOnl ={ //object to send number to be used with Anonymous 
    type: 'usersOnline', 
    content: usersOnline,
  }
  wss.clients.forEach(function each(client){
    if (client.readyState === SocketServer.OPEN){
      client.send(JSON.stringify(usersOnl));
    }
  });

  ws.on('message', function incoming(data) {
    const receiveMsg = JSON.parse(data)

    receiveMsg.id = uuidv4(); 

    const command = receiveMsg.type
    switch (command){
      case 'postMessage': 
        
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
      const sendNot ={
        type: 'incomingNotification', 
        id: receiveMsg.id,
        content: receiveMsg.content,
      }

      //broadcast message to all clients and including itself 
      wss.clients.forEach(function each(client){
        if (client.readyState === SocketServer.OPEN){
          client.send(JSON.stringify(sendNot));
  
          }
        });
      break;
      default:
        console.log('default');
    }
  })

  ws.on('close', () => {
    console.log('Client disconnected');
    usersOnline--;
  
    //message that represent users online 
  const usersOnl ={
    type: 'usersOnline', 
    content: usersOnline,
  }
  wss.clients.forEach(function each(client){
    if (client.readyState === SocketServer.OPEN){
      client.send(JSON.stringify(usersOnl));
    }
  });
  });
});