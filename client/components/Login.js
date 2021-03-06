/* eslint-disable max-len, arrow-body-style, no-underscore-dangle, react/no-string-refs, react/self-closing-comp, eqeqeq, array-callback-return */
/* global localStorage */

import React from 'react';
import axios from 'axios';
import base64 from 'base-64';
import { browserHistory } from 'react-router';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.create = this.create.bind(this);
    this.state = { error: '' };
    this.error = '';
  }

  create(e) {
    e.preventDefault();
    const username = this.refs.username.value;
    const password = this.refs.password.value;
    axios.post('http://localhost:9001/api/authenticate', { username, password })
    .then((res) => {
      localStorage.clear();
      localStorage.setItem('token', res.headers.authorization);
      let roles = base64.decode(localStorage.token.split('.')[1]);
      roles = JSON.parse(roles);
      roles = roles.roles;
      roles.map((role) => {
        if (role.role === 'ADMIN') { localStorage.setItem('roles', 'admin'); }
      });
      browserHistory.push('/');
    })
    .catch((err) => {
      if (err.response.data.status == 401) {
        localStorage.clear();
        this.setState({ error: err.response.data.message });
      }
      // notify user login failed
    });
  }

  render() {
    let errorMessage = (<p />);
    if (this.state.error) { errorMessage = (<p> {this.state.error}</p>); }
    return (
      <div>

        <h1>Login</h1>

        <div className="row">
          <div className="col-xs-3">
            <form>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input ref="username" type="text" className="form-control" id="username" />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input ref="password" type="password" className="form-control" id="password" />
              </div>

              <button onClick={this.create} type="submit" className="btn btn-default">Create</button>
            </form>
          </div>
          <div className="col-xs-9">
          {errorMessage}
          </div>
        </div>

      </div>
    );
  }
}
