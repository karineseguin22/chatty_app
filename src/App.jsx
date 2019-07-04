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
  const newMess = {username: this.state.currentUser.name, 
   content: chatBarMess//, 
   //id: generateRandomId()  -> add id in server instead 
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
     this.updateMessages(event.target.value); //pass the message 
     const msg = {type: 'sendMessage', content:event.target.value, username:this.state.currentUser.name}
      this.socketServer.send(JSON.stringify(msg))
  
      }
    
  }

 

  
      componentDidMount() {
        this.socketServer = new WebSocket('ws://localhost:3001');
          console.log('Connected to Server');  
      
      //client react need to display message 
        this.socketServer.onmessage = function (event){
          console.log('Hello world');
          console.log(JSON.parse(event.data)); 
        }
    
        // console.log("componentDidMount <App />");
        // setTimeout(() => {
        //   console.log("Simulating incoming message");
        //   // Add a new message to the list of messages in the data store
        //   const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
        //   const messages = this.state.messages.concat(newMessage)
        //   // Update the state of the app component.
        //   // Calling setState will trigger a call to render() in App and all child components.
        //   this.setState({messages: messages})
        // }, 3000);
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
