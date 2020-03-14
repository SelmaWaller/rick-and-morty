import React, {Component} from 'react';

import userImg from './../images/userImg.png';

export default class Login extends Component {
  state = {
    username: '',
    password: '',
    usernameError: true,
    passwordError: true,
  };

  handleChange = input => {
    let name = input.target.name;
    let value = input.target.value;
    let username = /^Johndoe$/;
    let password = /^123456$/;

    switch (name) {
      case 'username':
        username.test(value)
          ? this.setState({usernameError: false})
          : this.setState({usernameError: true});
        break;
      case 'password':
        password.test(value)
          ? this.setState({passwordError: false})
          : this.setState({passwordError: true});
        break;
      default:
        break;
    }
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    localStorage.setItem('username', 'Johndoe');
    localStorage.setItem('password', '123456');
    localStorage.setItem('token', 'faketoken');
    this.props.updateLoginStatus();
  };

  render() {
    const {usernameError, passwordError} = this.state;

    return (
      <div className="loginContainer">
        <div className="loginCard textCenter innerCard boxShadow">
          <h1>Log in</h1>
          <img src={userImg} alt="userImg" />
          <form onSubmit={this.handleSubmit}>
            <h4>
              <label htmlFor="username">
                USERNAME{' '}
                <span className={usernameError ? '' : 'error__hide'}>
                  {' '}
                  &nbsp;(Johndoe)
                </span>
              </label>
            </h4>
            <input
              onChange={this.handleChange}
              id="username"
              type="text"
              name="username"
              placeholder="Johndoe"
            />

            <h4>
              <label htmlFor="password">
                PASSWORD{' '}
                <span className={passwordError ? '' : 'error__hide'}>
                  {' '}
                  &nbsp;(123456)
                </span>
              </label>
            </h4>
            <input
              onChange={this.handleChange}
              id="password"
              type="password"
              name="password"
              placeholder="••••••••"
            />
            <button
              onClick={this.updateLogin}
              type="submit"
              disabled={usernameError || passwordError}
              className="loginButton"
            >
              Log in
            </button>
          </form>
        </div>
      </div>
    );
  }
}
