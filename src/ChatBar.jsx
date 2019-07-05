import React, {Component} from 'react'

class ChatBar extends Component{
    render(){
        return(
        <footer className="chatbar">
        <input className="chatbar-username" placeholder="Your Name (Optional)" onChange={this.props.handleInputUserName}/>
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyUp={this.props.handleInput}/>
      </footer>
        )
      
    }
} 

export default ChatBar; 