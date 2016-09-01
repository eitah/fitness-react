/* eslint-disable max-len, arrow-body-style, no-underscore-dangle, react/no-string-refs, react/self-closing-comp, eqeqeq, array-callback-return */
/* global localStorage */

import React from 'react';
import axios from 'axios';
import base64 from 'base-64';
import { browserHistory } from 'react-router';
import UserDetails from './UserDetails';

export default class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.create = this.create.bind(this);
    this.state = { userList: [] };
    this.error = '';
  }

  componentDidMount() {
    console.log('in the did mount');
    axios.get('http://localhost:9001/api/users')
    .then((res) => {
      this.setState({ userList: res.data });
    });
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
    let users = (<p> Please Wait... </p>);
    if (this.state.userList) { users = (this.state.userList.map(u => <UserDetails key={u.id} user={u} />)); }
    return (
      <div>
        <h1>Admin</h1>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>&nbsp;</th>
              <th>Is Enabled</th>
            </tr>
          </thead>
          <tbody>
            {users}
          </tbody>
        </table>
      </div>
    );
  }
}
