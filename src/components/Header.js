import logo from '../assets/img/logo.png';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router";

import '../assets/css/header.css';

function Header(props) {
  var nav = <Link to="/Orders" className="button small">Orders</Link>;
  if(props.page == 'picker') {
    nav = <Link to="/Users" className="button small">Users</Link>;
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
  }

  return (
    <header className="App-header wrapper">
      <img src={logo} className="App-logo" alt="logo" />
      <nav>
        {nav}      
        <a href="#" className="button filled small" onClick={handleLogout} >Logout</a>
      </nav>
    </header>
  );
}

export default Header;
