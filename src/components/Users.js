import React from 'react';
import '../assets/css/users.css';

import Header from './Header';
import Search from './Search';
import UserTable from './UserTable';
import Select from 'react-select';

export default class Users extends React.Component {

  constructor(props) {
    super();

    this.state = {
      users: this.getUsers(),
      selected: false,
      newUser: {
        firstName: 'Jane',
        lastName: 'Duke',
        email: 'jane@duke.com',
        password: '12391',
        role: 'picker'
      },
      addUser: false
    }
  }

  getUsers = () => {
    var users = [
      {
        id: 1,
        firstName: 'Duddy',
        lastName: 'Rosenberg',
        email: 'duddyrosenberg@gmail.com',
        role: 'picker',
        login: '12/01/2021 5:00PM',
        selected: false
      },
      {
        id: 2,
        firstName: 'Esty',
        lastName: 'Engel',
        email: 'esty@pixelnbyte.com',
        role: 'admin',
        login: '12/01/2021 1:00PM',
        selected: false
      },
      {
        id: 3,
        firstName: 'John',
        lastName: 'Doe',
        email: 'duddyrosenberg@gmail.com',
        role: 'picker',
        login: '12/01/2021 5:00PM',
        selected: false
      }
    ];

    return users;
  }

  handleSearch = (event) => {
    var term = event.target.value;
    this.setState({users: this.getUsers().filter(function(user) {
      var match = false;
      for (const [key, value] of Object.entries(user)) {
        if(value.toString().toLowerCase().includes(term.toLowerCase())){
          match = true;
        }
      }   
      return match;
    })});
  }

  handleDelete = (id) => {
    var users = this.state.users;
    this.setState({users: this.state.users.filter(function(user) {
      var match = false;
      for (const [key, value] of Object.entries(user)) {
        if(user.id != id){
          match = true;
        }
      }   
      return match;
    })});
  }

  refresh = () => {
    this.setState({users: this.getUsers()})
  }

  handleChange = (key, value) => {
    var newUser = this.state.newUser;
    newUser[key] = value;
    this.setState({newUser: newUser});
  }

  addUser = () => {

  }

  newUser = () => {
    this.setState({addUser: !this.state.addUser});
  }

  render(){
    const options = [
      { value: 'picker', label: 'Picker' },
      { value: 'admin', label: 'Admin' }
    ]

    var addUser = '';
    if(this.state.addUser) {
      addUser = (
        <div className="new-user action-dropdown">
          <form>
            <input type="text" placeholder="Fisrt Name" value={this.state.newUser.firstName} onChange={(e) => this.handleChange('firstName', e.target.value)} />
            <input type="text" placeholder="Last Name" value={this.state.newUser.lastName} onChange={(e) => this.handleChange('lastName', e.target.value)} />
            <input type="email" placeholder="Email" value={this.state.newUser.email} onChange={(e) => this.handleChange('email', e.target.value)} />
            <input type="text" placeholder="Password" value={this.state.newUser.password} onChange={(e) => this.handleChange('password', e.target.value)} />
            <Select options={options} className="select" placeholder="Role" onChange={(e) => this.handleChange('role', e.value)} />
            <a href="#" className="button filled" onClick={this.addUser}>Add</a>
          </form>
        </div>);
    }

    return (
      <div className="App">
        <Header page="users" />
        <div className="App-body wrapper">
          <div className="table-header">
            <Search handleSearch={this.handleSearch} />
            <div className="actions">
              <a href="#" className="button filled" onClick={this.newUser}>New User</a>
              <a href="#" className="button icon" onClick={this.refresh}><i className="refresh"></i></a>
            </div>
          </div>
          {addUser}
          <UserTable users={this.state.users} delete={this.handleDelete} />
        </div>
      </div>
    );
  }
}