import React, {useState} from 'react';

import userImg from './../images/userImg.png';
import Particles from 'react-particles-js';
import particleSetup from './../components/particles';

export default function Login({updateLoginStatus, updateLogin}) {
  const [usernameError, setUsernameError] = useState(true);
  const [passwordError, setPasswordError] = useState(true);

  let handleChange = input => {
    let name = input.target.name;
    let value = input.target.value;
    let username = /^Johndoe$/;
    let password = /^123456$/;

    switch (name) {
      case 'username':
        username.test(value) ? setUsernameError(false) : setUsernameError(true);
        break;
      case 'password':
        password.test(value) ? setPasswordError(false) : setPasswordError(true);
        break;
      default:
        break;
    }
  };

  let handleSubmit = event => {
    event.preventDefault();
    localStorage.setItem('username', 'Johndoe');
    localStorage.setItem('password', '123456');
    localStorage.setItem('token', 'faketoken');
    updateLoginStatus();
  };

  return (
    <>
      <Particles
        canvasClassName="particles"
        width="1400px"
        params={particleSetup}
      />
      <div className="loginContainer">
        <div className="loginCard textCenter innerCard boxShadow">
          <h1>Log in</h1>
          <img src={userImg} alt="userImg" />
          <form onSubmit={handleSubmit}>
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
              onChange={handleChange}
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
              onChange={handleChange}
              id="password"
              type="password"
              name="password"
              placeholder="••••••••"
            />
            <button
              onClick={updateLogin}
              type="submit"
              disabled={usernameError || passwordError}
              className="loginButton"
            >
              Log in
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
