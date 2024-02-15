// Login.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { notification } from "../Utils/helper";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/login", {
        email,
        password,
        rememberMe,
      });
      console.log(response.data);
      // If login successful, set loggedIn to true
      setLoggedIn(true);
    } catch (err) {
      // notification('invalid credentials');
      // setError(err?.msg);
      alert(err?.response?.data?.msg);
      console.log(err.response.data);
    }
  };

  if (loggedIn) {
    navigate("/Home");
  }

  return (
    <>
      <ToastContainer />
      <div className="login-container">
        <h2>Login to your account</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="inputElements">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <span style={{ color: "red" }}>{error}</span>}
          <div className="rememberMe">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <span>Remember me</span>
          </div>
          <button className="loginBtn" type="submit">
            Login
          </button>
          <div className="footerContent">
            <span>New to MyApp? </span>
            <Link to="/register">Sign up</Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
