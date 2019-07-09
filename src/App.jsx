import React, {Component} from 'react';
import Header from './header.jsx'; 
import MessageList from './MessageList.jsx'; 
import ChatBar from './ChatBar.jsx'; 


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
          currentUser: {name: 'Anonymous'}, 
          usersOnline: 0,
          messages: []
    }; 
    this.socketServer = undefined;

  }

  //handling user actions 
  handleInput = (event) => { 
    event.preventDefault()
   if (event.key === 'Enter' && event.target.value){ 
     const msg = {type: 'postMessage', content:event.target.value, username:this.state.currentUser.name}
     event.target.value = '';   
      this.socketServer.send(JSON.stringify(msg))
      }
    
  }
  //to update user name
  handleInputUserName = (event) => { 
    event.preventDefault()
    if (event.key === 'Enter' && event.target.value && event.target.value !== this.state.currentUser.name){ 
      const username = event.target.value;
   const notification = {type: 'postNotification', content:`${this.state.currentUser.name} changed their name to ${event.target.value}`}
      this.socketServer.send(JSON.stringify(notification))
    this.setState({currentUser: {name: username}}); 
  }
  }
  
      componentDidMount() {
        this.socketServer = new WebSocket('ws://localhost:3001');
          console.log('Connected to Server');  
        this.socketServer.onmessage = (event) => { 
          const msg = JSON.parse(event.data)
          const command = msg.type
          switch (command){
            case 'incomingMessage': 
          this.setState({ 
            messages: [...this.state.messages, msg ] 
          })
          break;
          case 'incomingNotification':
            this.setState({ 
              messages: [...this.state.messages, msg ] 
            })
            break; 
            case 'usersOnline': 
            this.setState({ 
              usersOnline: msg.content  
            })
            break;
            case 'incomingTotalUsers':
            this.setState({
              currentUser: {name: `Anonymous${msg.content}`}  
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
