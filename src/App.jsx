import React, {Component} from 'react';
import Header from './header.jsx'; 
import MessageList from './MessageList.jsx'; 
import ChatBar from './ChatBar.jsx'; 
//import generateRandomId from './utils.js'; 


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
          currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
          messages: []
    }; 
    this.socketServer = undefined;

  }

//function to update state
//  updateMessages =(chatBarMess) => {
//    //create your new object message
//    const newMess = {username: this.state.currentUser.name, //get usernmae in state
//     content: chatBarMess, //get the content from the value your passing in the function 
//     id: generateRandomId() //call generateRamdomId()
//   }
//   //this.socketServer.send(newMess);
//    this.setState({ //when want to have current state and add your new message
//      messages: [...this.state.messages, newMess ] //... to remoove array, otherwise you have 2 arrays bc this.state.messages is in an array
//    })
   
//  }

updateMessages =(chatBarMess) => {
  const newMess = {username: chatBarMess.username, 
   content: chatBarMess.content, 
   id: chatBarMess.id
 }
 //console.log(newMess, chatBarMess)
  this.setState({ 
    messages: [...this.state.messages, newMess ] 
  })

  
}

  //handling user actions 
  handleInput = (event) => { 
    event.preventDefault()
   if (event.key === 'Enter'){ 

     //send message to server
     //console.log(event.target.value)
     //this.updateMessages(event.target.value); //no longer passing message from here
     const msg = {type: 'sendMessage', content:event.target.value, username:this.state.currentUser.name}
      this.socketServer.send(JSON.stringify(msg))
  
      }
    
  }

 

  
      componentDidMount() {
        this.socketServer = new WebSocket('ws://localhost:3001');
          console.log('Connected to Server');  
      //client react need to display message 
        this.socketServer.onmessage = (event) => { 
          console.log('direct dans csocketsoerver onmessage',this.state.messages)

          const msg = JSON.parse(event.data)
          console.log(msg); 
      
        
        
          this.setState({ 
            messages: [...this.state.messages, msg ] 
          })
        }
    
  
      }
  
  render() {
    return (
      <div>
      <Header/> 
      <MessageList
       messages={this.state.messages}
      />
      <ChatBar 
        currentUser={this.state.currentUser}
        handleInput={this.handleInput}
      /> 
      </div>
    );
  }
}


export default App;
