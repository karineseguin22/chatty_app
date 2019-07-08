import React, {Component} from 'react';
import Header from './header.jsx'; 
import MessageList from './MessageList.jsx'; 
import ChatBar from './ChatBar.jsx'; 
//import generateRandomId from './utils.js'; 


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
          currentUser: {name: 'Anonymous1'}, // optional. if currentUser is not defined, it means the user is Anonymous
          usersOnline: 0,
          messages: []
    }; 
    this.socketServer = undefined;

  }

  //handling user actions 
  handleInput = (event) => { 
    event.preventDefault()
    console.log(`Value outside:${event.target.value}`); 
   if (event.key === 'Enter'){ 
     //send message to server
     //this.updateMessages(event.target.value); //no longer passing message from here
     console.log(`Value inside:${event.target.value}`); 
     const msg = {type: 'postMessage', content:event.target.value, username:this.state.currentUser.name}
      this.socketServer.send(JSON.stringify(msg))
      }
    
  }
  //to update user name
  handleInputUserName = (event) => { 
    event.preventDefault()
    console.log(`Value username outside:${event.target.value}`); 
    if (event.key === 'Enter'){ 
      console.log(`Value inside:${event.target.value}`); 
      const username = event.target.value;
   //console.log('type: incomingNotification, content: this.state.currentUser.name changes their name to username') //send this to server
   const notification = {type: 'postNotification', content:`${this.state.currentUser.name} changed their name to ${event.target.value}`}
      this.socketServer.send(JSON.stringify(notification))
    this.setState({currentUser: {name: username}}); 
  }
  }
  
      componentDidMount() {
        this.socketServer = new WebSocket('ws://localhost:3001');
          console.log('Connected to Server');  
      //client react need to display message 
        this.socketServer.onmessage = (event) => { //need arrow function to use keyword this and have access to this in constructor
          const msg = JSON.parse(event.data)
          const command = msg.type
          switch (command){
            case 'incomingMessage': 
          this.setState({ 
            messages: [...this.state.messages, msg ] 
          })
          break;
          case 'incomingNotification':
            console.log('front end received notification')
            this.setState({ 
              messages: [...this.state.messages, msg ] 
            })
            break; 
            case 'usersOnline': //to update state that displays number of users online
            console.log(msg.content); 
            this.setState({ 
              usersOnline: msg.content  
            })
          break; 
          default:
          console.log('default');
          }  
        }
      }
  
  render() {
    return (
      <div>
      <Header
      onlineUsers={this.state.usersOnline}
      /> 
      <MessageList
       messages={this.state.messages}
      />
      <ChatBar 
        handleInputUserName={this.handleInputUserName}
        handleInput={this.handleInput}
      /> 
      </div>
    );
  }
}


export default App;
