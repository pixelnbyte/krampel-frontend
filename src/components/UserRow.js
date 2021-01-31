import React, { useState } from 'react';

const UserRow = (props) => {
  return (
    <tr key={props.user.id}>
      <td>{props.user.firstName} {props.user.lastName}</td>
      <td>{props.user.email}</td>
      <td><span className={`role ${props.user.role}`}>{props.user.role}</span></td>
      <td>{props.user.login}</td>
      <td><a href="#" className="button tiny icon" onClick={() => props.delete(props.user.id)}><i className="delete"></i> Delete</a></td>
    </tr>
  );
}

export default UserRow;
