import React, {Component} from 'react'
import Message from './Message.jsx'

class MessageList extends Component{
    constructor(props){
        super(props)
    }
    
    

    render(){

        let messagesData = this.props.messages
       
        let dataMsg = messagesData.map((message) => {
          if (message.type === 'incomingMessage'){
            return(<Message message={message} key={message.id}/>)
          }
        }
       );
       let dataNot = messagesData.map((message) => {
        if (message.type === 'incomingNotification'){
          return(<Message message={message} key={message.id}/>)
        }
      }
     );
        return(
        <main className="messages">
        <div className="message system">
          {dataNot}
        </div>
        {dataMsg} 
      </main>
        )
    }
} 

export default MessageList; 