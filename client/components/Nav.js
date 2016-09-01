/* eslint-disable max-len, jsx-a11y/href-no-hash */
/* global localStorage */

import React from 'react';
import { Link } from 'react-router';

export default class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  render() {
    let admin = (<p />);
    if (localStorage.roles) { admin = (<ul className="nav navbar-nav navbar-right"><li><Link to="/admin"><i className="fa fa-key fa-heartbeat" /> Admin</Link></li></ul>); }
    let loggedIn = (<p />);
    if (!localStorage.token) {
      loggedIn = (<ul className="nav navbar-nav navbar-right"><li><Link to="/register"><i className="fa fa-user fa-fw" /> Register</Link></li>
        <li><Link to="/login"><i className="fa fa-key fa-lock" /> Login</Link></li></ul>);
    } else {
      loggedIn = (<ul className="nav navbar-nav navbar-right"><li><Link to="/logout"><i className="fa fa-key fa-unlock" /> Logout</Link></li>
        <li><Link to="/exercises"><i className="fa fa-key fa-heartbeat" />Exercises</Link></li>
        <li><Link to="/profile"><i className="fa fa-key fa-heartbeat" /> Profile</Link></li></ul>);
    }
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar" />
              <span className="icon-bar" />
              <span className="icon-bar" />
            </button>
            <a className="navbar-brand" href="#">Fitness</a>
          </div>

          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav" />
            <ul className="nav navbar-nav navbar-right">
              <li><Link to="/"><i className="fa fa-home fa-fw" /> Home</Link></li>
              <li><Link to="/about"><i className="fa fa-hashtag fa-fw" /> About</Link></li>
              <li><Link to="/faq"><i className="fa fa-question-circle-o fa-fw" /> Faq</Link></li>
            </ul>
              {loggedIn}
              {admin}
          </div>
        </div>
      </nav>
  );
  }
}
