import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "Bob"},
      messages: [] // messages coming from the server will be stored here as they arrive
    };
  }
  // constructor(props) {
  //   super(props);
  //   this.newMessageFn = this.newMessageFn.bind(this);
  //   // this is the *only* time you should assign directly to state:
  //   this.state =
  //     {
  //     currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
  //     messages: [
  //   {
  //     username: "Bob",
  //     content: "Has anyone seen my marbles?",
  //     id: 1
  //   },
  //   {
  //     username: "Anonymous",
  //     content: "No, I think you lost them. You lost your marbles Bob. You lost them for good.",
  //     id: 2
  //   }
  // ]
  // };


  // function adds input message to existing messages
  newMessageFn = (event) => {
    if (event.key === 'Enter') {
      const newMessage = {username: this.state.currentUser.name, content: event.target.value};
      const messages = this.state.messages.concat(newMessage)
      console.log("mesages", messages);
      // send new message to the websocket server
      this.socket.send(JSON.stringify(newMessage))
      // this.setState({messages: messages})
    }
  }

  // function updates username to username in input field
  newUserFn = (event) => {
    const newUser = event.target.value;
    // send new message to the websocket server
    this.socket.send(JSON.stringify(newUser));
    this.setState({currentUser: {name: newUser}});

  }




  //connect websockets in componentdidmount
  // in App.jsx
  componentDidMount() {
    // creates websocket object
    this.socket = new WebSocket("ws://localhost:3001", "protocolOne");
    this.socket.onopen = event => {
      console.log("Connected to Server");
    }
    this.socket.onmessage = (event) => {
      console.log(event.data);
      const message = JSON.parse(event.data);
      this.setState({ messages: [...this.state.messages, message ] });
    }
    console.log("componentDidMount <App />");
    // setTimeout(() => {
    //   console.log("Simulating incoming message");
    //   this.newMessageFn();
    //   // Add a new message to the list of messages in the data store
    //   // Update the state of the app component.
    //   // Calling setState will trigger a call to render() in App and all child components.

    // }, 3000);
  }
  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          </nav>
          <MessageList messages={this.state.messages} />
        <ChatBar newUserFn={this.newUserFn} newMessageFn={this.newMessageFn} userName={this.state.currentUser.name} />
      </div>
    );
  }
}
export default App;
