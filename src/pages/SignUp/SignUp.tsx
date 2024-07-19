import React, { useState } from "react";
import loginService from "../../services/loginService";
import "./index.scss";
import { FaEyeSlash } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import usersService from "../../services/usersService";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await usersService.create(username, password);
      const login = await loginService.login(username, password);
      localStorage.setItem("user-token", login.token);
      localStorage.setItem("username", login.username);
      setError(false);
      navigate("/", { replace: true });
    } catch (error) {
      setError(true);
      console.log(
        "error ao fazer cadastro: ",
        error.message,
        "\nmessage: ",
        error.response.data.error
      );
    }
  };

  return (
    <div className="login-container">
      <div className="background">
        <div className="bg-image-signup"></div>
        <div className="bg-image-signup"></div>
        <div className="bg-image-signup"></div>
      </div>
      <h1 className="title">Sign Up</h1>
      <form onSubmit={handleSignUp}>
        <input
          type="text"
          name=""
          className="username-input"
          minLength={3}
          required
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <div className="password-input">
          <input
            type={passwordVisible ? "text" : "password"}
            name=""
            className="password-input"
            minLength={6}
            required
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {passwordVisible ? (
            <FaEyeSlash
              className="FaEyeSlash"
              onClick={() => setPasswordVisible(false)}
              size={35}
            />
          ) : (
            <FaEye
              className="FaEye"
              onClick={() => setPasswordVisible(true)}
              size={35}
            />
          )}
        </div>
        {error && (
          <p className="error">
            Erro ao fazer cadastro, nome de usuário ou senha invalidos.
          </p>
        )}
        <button type="submit" className="login-button">
          Sign Up
        </button>
        <div className="links">
          <p>
            <Link className="guest-link" to={"/"}>
              Continue as Guest
            </Link>
          </p>
          <p>
            <Link className="guest-link" to={"/login"}>
              login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
