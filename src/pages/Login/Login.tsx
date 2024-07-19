import React, { useState } from 'react';
import loginService from "../../services/loginService";
import { FaEyeSlash } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import "./index.scss";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {    
    e.preventDefault();    
    try {
      const response = await loginService.login(username, password);
      console.log(response);
      localStorage.setItem("user-token", response.token);
      localStorage.setItem("username", response.username);
      setError(false);
      navigate("/", {replace: true});
    } catch (error) {
      setError(true);
      console.log("error ao fazer login: ", error.message, "\nmessage: ", error.response.data.error);
    }
  }

  return (
    <div className="login-container">
        <div className="background">
          <div className="bg-image-login"></div>
          <div className="bg-image-login"></div>  
          <div className="bg-image-login"></div>
        </div>        
        <h1 className="title">Login</h1>
        <form onSubmit={handleLogin}>          
            <input type="text" name=""className="username-input" minLength={3} required placeholder='username' value={username} onChange={(e) => setUsername(e.target.value)}/>
            <div className="password-input">
              <input type={passwordVisible ? "text" : "password"} name="" className="password-input" minLength={6} required placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)}/>              
              {passwordVisible ? <FaEyeSlash  className="FaEyeSlash" onClick={() => setPasswordVisible(false)} size={35}/> :
                                 <FaEye className="FaEye" onClick={() => setPasswordVisible(true)} size={35}/>}
            </div>
            {error && <p className="error">Nome de usuário ou senha invalidos.</p>}
            <button type="submit" className="login-button">Login</button>
            <div className="links">
              <p><Link className='guest-link' to={"/"}>Continue as Guest</Link></p>
              <p><Link className='guest-link' to={"/signUp"}>create account</Link></p>
            </div>
        </form>
    </div>
  )
}

export default Login