import React, {Component} from 'react';
import Header from './header.jsx'; 
import MessageList from './MessageList.jsx'; 
import Message from './Message.jsx'; 
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
        },
        {
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
        }
      ]
    }; 
  }
  render() {
    return (
      <div>
      <Header/> 
      <MessageList/>
      <Message/>
      <ChatBar currentUser={this.state.currentUser}/> 
      </div>
    );
  }
}


export default App;
