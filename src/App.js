import React, {Component} from 'react';
import './scss/styles.scss';

import Login from './pages/Login';
import Navigation from './components/nav';
import Footer from './components/footer';

export default class App extends Component {
  state = {
    isLoggedIn: true,
  };

  updateLogin = () => {
    this.setState({
      isLoggedIn: true,
    });
  };

  updateLogout = () => {
    this.setState({
      isLoggedIn: false,
    });
    localStorage.removeItem('username');
    localStorage.removeItem('password');
    localStorage.removeItem('token');
  };

  render() {
    const currentUser = localStorage.username;

    return localStorage.getItem('token') !== null && this.state.isLoggedIn ? (
      <>
        <div className="navbar">
          <button className="boldText" onClick={this.updateLogout}>
            Log out
          </button>
        </div>
        <Navigation title={`Logged in as ${currentUser}`} />
        <div className="container">{this.props.children}</div>
        <Footer />
      </>
    ) : (
      <Login updateLoginStatus={this.updateLogin} />
    );
  }
}
