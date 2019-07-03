import React, {Component} from 'react';
import Header from './header.jsx'; 
import MessageList from './MessageList.jsx'; 
import ChatBar from './ChatBar.jsx'; 
import generateRandomId from './utils.js'; 


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
          currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
          messages: [
            {
              username: "Bob",
              content: "Has anyone seen my marbles?",
              id: 111
            },
            {
              username: "Anonymous",
              content: "No, I think you lost them. You lost your marbles Bob. You lost them for good.",
              id: 112
            }
          ]
    }; 
  }

//function to update state
 updateMessages =(chatBarMess) => {
   //create your new object message
   const newMess = {username: this.state.currentUser.name, //get usernmae in state
    content: chatBarMess, //get the content from the value your passing in the function 
    id: generateRandomId() //call generateRamdomId()
  }
   this.setState({ //when want to have current state and add your new message
     messages: [...this.state.messages, newMess ] //... to remoove array, otherwise you have 2 arrays bc this.state.messages is in an array
   })
   
 }

  //handling user actions 
  handleInput = (event) => { 
    event.preventDefault()
    console.log(event.target.value) //this gives the value of the key 
   console.log(event.key) //this gives the key type
   if (event.key === 'Enter'){ //if your key type is enter
    this.updateMessages(event.target.value); //call updateMessages function and pass the message 
      }
      //Creating the connection to the Socket Server
  this.SocketServer = new WebSocket('ws://localhost:3001');
  }

  
      //component lifecyle excercise 
      componentDidMount() {
        console.log('Connected to server')
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
