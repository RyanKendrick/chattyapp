import React, {Component} from 'react';
import App from './App.jsx';


class Navbar extends Component {
  render() {
    return (
      <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          <span className="numberUsers">Users Online: {this.props.amountUsers} </span>
      </nav>
    );
  }
}
export default Navbar;