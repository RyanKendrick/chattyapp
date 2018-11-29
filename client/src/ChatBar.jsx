import React, {Component} from 'react';
import App from './App.jsx';


class ChatBar extends Component {
  render() {
    console.log(this.props);
    return (
      <footer className="chatbar">
      <input className="chatbar-username" defaultValue={this.props.userName} onChange={this.props.newUserFn} />
      <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={this.props.newMessageFn} />
      </footer>
    );
  }
}
export default ChatBar;
