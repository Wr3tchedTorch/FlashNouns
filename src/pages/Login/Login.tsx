import React, { useState } from 'react';
import loginService from "../../services/loginService";
import "./index.scss";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();    
    try {
      const response = await loginService.login(username, password);          
      console.log(response);
    } catch (error) {
      setError(true);
      console.log("error ao fazer login: ", error.message, "\nmessage: ", error.response.data.error);
    }
  }

  return (
    <div className="login-container">
        <div className="background">
          <div className="bg-image"></div>
          <div className="bg-image"></div>  
          <div className="bg-image"></div>
        </div>        
        {error && <h1 style={{backgroundColor: "red"}}>Erro ao fazer login, tente novamente.</h1>}
        <h1 className="title">Login</h1>
        <form onSubmit={handleLogin}>          
            <input type="text" name="" id="" className="username-input" minLength={3} required placeholder='username' value={username} onChange={(e) => setUsername(e.target.value)}/>
            <input type="password" name="" id="" className="password-input" minLength={6} required placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
            <button type="submit" className="login-button">Login</button>
            <p><a href="" className="guest-link">Continue as Guest</a></p>
        </form>
    </div>
  )
}

export default Login