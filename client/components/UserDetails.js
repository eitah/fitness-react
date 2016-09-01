/* eslint-disable max-len, arrow-body-style, no-underscore-dangle, react/no-string-refs, react/self-closing-comp, eqeqeq, array-callback-return, react/prop-types */
/* global localStorage */

import React from 'react';


export default class UserDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = { users: '' };
  }

  componentDidMount() {
  }

  render() {
    const user = this.props.user;
    return (
      <tr>
        <td> {user.username} </td>
        <td>&nbsp;</td>
        <td>{user.enabled.toString()}&nbsp;&nbsp;</td>
      </tr>
    );
  }
}
