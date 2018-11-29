import React, {Component} from 'react';

class Message extends Component {
  render() {
    return (
      <div className="message">
        <span className="message-username">{this.props.mess.username}</span>
        <span className="message-content">{this.props.mess.content}</span>
      </div>
    );
  }
}

export default Message;
