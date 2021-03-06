import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <Link to="/">
            <h6 className="navbar-brand">İş Takip</h6>
          </Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
