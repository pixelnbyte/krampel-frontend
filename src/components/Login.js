import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';

import logoImg from '../assets/img/logo.png';
import { useAuth } from '../context/auth';
import '../assets/css/login.css';

function Login(props) {
  const [isLoggedin, setLoggedIn] = useState(false);
  const [isError, setIsError] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [adminRole, setadminRole] = useState(false);
  const { setAuthTokens } = useAuth();

  var referer = '';
  if(props.location.state) {
    referer = props.location.state.referer || '/'; 
  } else {
    referer = '/';
  }

  function postLogin() {
    const success = true;
    if(success) {
      if(userName == 'admin' && password == 'admin') setAuthTokens('admin');
      if(userName == 'user' && password == 'user') setAuthTokens('user');
      setLoggedIn(true);
    } else {
      setIsError(true);
    }
  }

  if (isLoggedin) {
    return <Redirect to={referer} />;
  }

  return (
    <div className="login-wrapper">
      <img className="login-logo" src={logoImg} />
      <form>
        <h5>Login</h5>
        <input type="username" value={userName} onChange={e => { setUserName(e.target.value); }} placeholder="Username" />
        <input type="password" value={password} onChange={e => { setPassword(e.target.value); }} placeholder="Password" />
        <button onClick={postLogin} className="button filled">Sign In</button>
      </form>
      <Link to="/">Forgot your password?</Link>
      { isError && <p>The username or password provided were incorrect!</p> }
    </div>
  );
}

export default Login;