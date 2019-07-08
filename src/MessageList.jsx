import React, {Component} from 'react'
import Message from './Message.jsx'

class MessageList extends Component{
    constructor(props){
        super(props)
    }
    
    

    render(){

        let messagesData = this.props.messages
       
        let data = messagesData.map((message) => {
            return(<Message message={message} key={message.id}/>)
        }
       );
        return(
        <main className="messages">
        <div className="message system">
          Anonymous1 changed their name to nomnom.
        </div>
        {data} 
      </main>
        )
    }
} 

export default MessageList; 