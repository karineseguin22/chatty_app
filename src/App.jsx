import React, {Component} from 'react';
import Header from './header.jsx'; 
import MessageList from './MessageList.jsx'; 
import ChatBar from './ChatBar.jsx'; 

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
      //component lifecyle excercise 
      componentDidMount() {
        console.log("componentDidMount <App />");
        setTimeout(() => {
          console.log("Simulating incoming message");
          // Add a new message to the list of messages in the data store
          const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
          const messages = this.state.messages.concat(newMessage)
          // Update the state of the app component.
          // Calling setState will trigger a call to render() in App and all child components.
          this.setState({messages: messages})
        }, 3000);
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
      /> 
      </div>
    );
  }
}


export default App;
