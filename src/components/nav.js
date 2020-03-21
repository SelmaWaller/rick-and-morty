import React from 'react';
import {NavLink} from 'react-router-dom';

import userImg from './../images/userImg.png';

const Navigation = ({title}) => {
  return (
    <>
      <nav className="navbar">
        <img src={userImg} alt="placeholder" />
        <ul>
          <li>
            <NavLink to="/">Overview</NavLink>
          </li>
          <li>
            <NavLink to="/about">About</NavLink>
          </li>
          <li>
            <NavLink to="/contact">Contact</NavLink>
          </li>
        </ul>
      </nav>
      <div className="userInfo">
        <div className="loggedInAs">
          <div className="titlePointer"></div>
          <p>{title}</p>
        </div>
      </div>
    </>
  );
};

export default Navigation;
