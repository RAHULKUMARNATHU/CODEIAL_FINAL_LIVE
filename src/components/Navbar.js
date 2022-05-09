import React from 'react';
import {Link} from 'react-router-dom'

function Navbar(props) {
  return (
    <nav className="nav">
      <div className="left-div">
        <Link to="/">
        <img
          src="https://ninjasfiles.s3.amazonaws.com/0000000000003454.png"
          alt="logo"
        />
        </Link>
      </div>

      <div className="search-container">
        <img
          className="search-icon"
          src="https://cdn-icons-png.flaticon.com/512/1296/1296902.png"
          alt="search-icon"
        />
        <input placeholder="Search" />
        <div className="search-results">
          <ul>
            <li className="search-results-row">
              <img
                src="https://cdn-icons-png.flaticon.com/512/1177/1177568.png"
                alt="user-dp"
              />
              <span>Nathu</span>
            </li>

            <li className="search-results-row">
              <img
                src="https://cdn-icons-png.flaticon.com/512/1177/1177568.png"
                alt="user-dp"
              />
              <span>Nathu</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="right-nav">
        <div className="user">
          <img
            src="https://cdn-icons-png.flaticon.com/512/1177/1177568.png"
            id="user-dp"
            alt="user-dp"
          />
          <span>Nathu</span>
        </div>
        <div className="nav-links">
          <ul>
            <li>
              <Link to ="/login">Log in</Link></li>
            <li>
            <Link to ="/logout">Log out</Link></li>
            <li>
            <Link to ="/signup">Register</Link></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
