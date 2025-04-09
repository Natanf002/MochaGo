import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import loginBg from "../assets/login-background-img.png";
import axios from "../api/axios"; // make sure axios instance is configured correctly.

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/auth/login", { email, password });
      const token = response.data.token;
      localStorage.setItem("mochago_token", token);
      window.dispatchEvent(new Event("storage")); // triggers reactivity
      navigate("/"); // redirect to MainEvent
    } catch (err) {
      setMessage("Invalid credentials. Try again.");
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh", width: "100vw", overflow: "hidden" }}>
      {/* Left */}
      <div style={{
        flex: 1,
        backgroundImage: `url(${loginBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "40px"
      }}>
        <div style={{ maxWidth: "400px", margin: "0 auto" }}>
          <h1 style={{ fontSize: "2.2rem", fontWeight: "bold", marginBottom: "20px" }}>
            We haven't met before right ?
          </h1>
          <p style={{ fontSize: "1.1rem", lineHeight: "1.6" }}>
            Then we should have matcha together!
          </p>
          <Link to="/signup">
            <button style={{
              marginTop: "30px",
              padding: "14px 36px",
              borderRadius: "30px",
              backgroundColor: "white",
              color: "#6A7D4F",
              fontWeight: "bold",
              fontSize: "1rem",
              border: "none",
              cursor: "pointer"
            }}>
              Sign Up
            </button>
          </Link>
        </div>
      </div>

      {/* Right - Login */}
      <div style={{
        flex: 1,
        backgroundColor: "#6A7D4F",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        position: "relative",
        color: "#F5EEDC"
      }}>
        <Link to="/" style={{
          position: "absolute",
          top: "2rem",
          left: "2rem",
          fontSize: "1.8rem",
          fontWeight: "bold",
          textDecoration: "none",
          color: "white"
        }}>
          ☕ MochaGo
        </Link>

        <div style={{ width: "80%", maxWidth: "400px" }}>
          <h1 style={{ fontSize: "2rem", textAlign: "center", marginBottom: "30px" }}>
            Welcome back,<br />Comrade!
          </h1>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                padding: "12px 20px",
                borderRadius: "25px",
                border: "none",
                backgroundColor: "#E6DCC7"
              }}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                padding: "12px 20px",
                borderRadius: "25px",
                border: "none",
                backgroundColor: "#E6DCC7"
              }}
            />
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <input type="checkbox" />
              <label>Keep me Signed in</label>
            </div>

            <button
              type="submit"
              style={{
                padding: "12px",
                borderRadius: "25px",
                border: "2px solid white",
                backgroundColor: "transparent",
                color: "white",
                fontWeight: "bold",
                cursor: "pointer"
              }}
            >
              Sign In
            </button>
            {message && <p style={{ color: "white", fontSize: "0.9rem", textAlign: "center" }}>{message}</p>}
          </form>

          <div style={{ textAlign: "center", marginTop: "15px" }}>
            <Link to="/forgot-password" style={{ color: "#F5EEDC", textDecoration: "underline" }}>
              Forgot Password?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
