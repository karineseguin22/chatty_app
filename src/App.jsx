import React, {Component} from 'react';

class App extends Component {
  constructor(){
    super();
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
      <Body>

      </Body>
    );
  }
}


export default App;
