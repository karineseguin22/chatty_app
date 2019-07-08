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
          }else if(message.type === 'incomingNotification'){
            return(<div className='message-system'>{message.content}</div>)
          }
        }
       );
    //    let dataNot = messagesData.map((message) => {
    //     if (message.type === 'incomingNotification'){
    //       return(<Message message={message} key={message.id}/>)
    //     }
    //   }
    //  );
        return(
        <main className="messages">
        {dataMsg} 
      </main>
        )
    }
} 

export default MessageList; 