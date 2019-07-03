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
