import React, {Component} from 'react'

class Header extends Component{
    render(){
    return (
        <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
        <p className="users-online-display"> {this.props.onlineUsers} users online</p>
      </nav> 
    )
    }
}

export default Header;

