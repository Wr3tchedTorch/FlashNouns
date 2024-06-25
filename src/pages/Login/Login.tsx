import React from 'react';
import "./index.scss";

const Login = () => {
  return (
    <div className="login-container">
        <h1 className="title">Login</h1>
        <form action="">
            <input type="text" name="" id="" className="username-input" minLength={3} required placeholder='username'/>
            <input type="password" name="" id="" className="password-input" minLength={6} required placeholder='password'/>
            <button type="submit" className="login-button">Login</button>
            <p><a href="" className="guest-link">Continue as Guest</a></p>
        </form>
    </div>
  )
}

export default Login