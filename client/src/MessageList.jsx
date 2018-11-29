import React, {Component} from 'react';
import Message from './Message.jsx';


class MessageList extends Component {
  render() {
    const messages = this.props.messages.map((message, index) => (
      <Message key={index} username={message.username} mess={message} />
    ));
    return (
      <main className="messages">
            {messages}
        </main>
    );
  }
}
export default MessageList;