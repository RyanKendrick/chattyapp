import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import Navbar from './Navbar.jsx';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {
        name: "Bob",
        changeName: "",

      },
      messages: [], //  messages coming from the server will be stored here as they arrive
      amountUsers: 0
    };
  }

  // function adds input message to existing messages
  newMessageFn = (event) => {
    if (event.key === 'Enter') {
      const newMessage = {type: "postMessage", username: this.state.currentUser.name, content: event.target.value};
      const messages = this.state.messages.concat(newMessage);
      console.log("mesages", messages);
      // send new message to the websocket server
      this.socket.send(JSON.stringify(newMessage));
    }
  }

  // function updates username to username in input field
  newUserFn = (event) => {
      if (event.key === 'Enter') {
          console.log("newuserfunction", event);
          const newUsername = event.target.value;
          const oldUsername = this.state.currentUser.name;

          const notificationMessage = {type: "postNotification",
                                  content: `${oldUsername} has changed their name to ${newUsername}`};


          this.setState({currentUser: {name: newUsername}});
          this.socket.send(JSON.stringify(notificationMessage));
      }
  }


  //connect websockets in componentdidmount
  componentDidMount() {

    console.log("componentDidMount <App />");
    // creates websocket object
    this.socket = new WebSocket("ws://localhost:3001", "protocolOne");
    this.socket.onopen = event => {
      console.log("Connected to Server");

    }

    this.socket.onmessage = (event) => {

      const message = JSON.parse(event.data);

      switch(message.type) {

      case "incomingMessage":

        // message.type = "postMessage"
        this.setState({ messages: [...this.state.messages, message ] });
        // handle incoming message
        break;
      case "incomingNotification":
        message.type = "postNotification";
        this.setState({ messages: [...this.state.messages, message ] });

        // handle incoming notification
        break;
      case "incomingUserUpdate":
        this.setState({amountUsers: message.amount});
        break;
      default:
        // show an error in the console if the message type is unknown
        throw new Error("Unknown event type " + message.type);

      }
    }
  }

  render() {
    return (
      <div>
         <Navbar amountUsers={this.state.amountUsers} />
          <MessageList messages={this.state.messages} />
        <ChatBar newUserFn={this.newUserFn} newMessageFn={this.newMessageFn} userName={this.state.currentUser.name} />
      </div>
    );
  }
}
export default App;
