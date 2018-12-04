import React, {Component} from 'react';

class Message extends Component {
  render() {
    if (this.props.mess.type === "incomingMessage") {
      return (
        <div className="message">
          <span className="message-username">{this.props.mess.username}</span>
          <span className="message-content">{this.props.mess.content}</span>
        </div>)
    } else {
      return (
        <div className="message system">
          {this.props.mess.content}
        </div>)
    };
  }
}

export default Message;
