import React, {Component} from 'react'

class Message extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
        <div className="message">
        <span className="message-username">{this.props.data.username}</span>
        <span className="message-content">{this.props.data.content}</span>
      </div>
        )
    }
} 

export default Message; 