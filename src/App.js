import React, {useState} from 'react';
import './scss/styles.scss';

import Login from './pages/Login';
import Navigation from './components/nav';
import Footer from './components/footer';

export default function App({children}) {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const currentUser = localStorage.username;

  let updateLogin = () => {
    setIsLoggedIn(true);
  };

  let updateLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('username');
    localStorage.removeItem('password');
    localStorage.removeItem('token');
  };

  return localStorage.getItem('token') !== null && isLoggedIn ? (
    <>
      <div className="navbar">
        <button className="boldText" onClick={updateLogout}>
          Log out
        </button>
      </div>
      <Navigation title={`Logged in as ${currentUser}`} />
      <div className="container">{children}</div>
      <Footer />
    </>
  ) : (
    <Login updateLoginStatus={updateLogin} />
  );
}
