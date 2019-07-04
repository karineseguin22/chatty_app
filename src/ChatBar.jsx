import React, {Component} from 'react'

class ChatBar extends Component{
    render(){
        return(
        <footer className="chatbar">
        <input className="chatbar-username" placeholder="Your Name (Optional)" value={this.props.currentUser.name} onKeyUp={this.props.handleInput}/>
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyUp={this.props.handleInput}/>
      </footer>
        )
      
    }
} 

export default ChatBar; 