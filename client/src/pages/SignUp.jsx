import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import backgroundImage from '../assets/login-background-img.png';
import axios from '../api/axios';

export default function SignUp() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setMessage("❌ Passwords do not match");
      return;
    }

    try {
      const res = await axios.post('/auth/register', {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password
      });

      setMessage("✅ Account created successfully! You can now log in.");
    } catch (err) {
      setMessage("❌ Failed to register user. Email might already exist.");
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw' }}>
      {/* Left Side – Form */}
      <div style={{ flex: 1, backgroundColor: '#6A7D4F', color: 'white', padding: '3rem' }}>
        <header style={{ marginBottom: '2rem' }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
            <h1 style={{ fontSize: '2rem' }}>☕ MochaGo</h1>
          </Link>
        </header>
        <h2 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Sign Up</h2>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <input name="firstName" type="text" placeholder="First Name" value={formData.firstName} onChange={handleChange} style={inputStyle} required />
            <input name="lastName" type="text" placeholder="Last Name" value={formData.lastName} onChange={handleChange} style={inputStyle} required />
          </div>
          <input name="email" type="email" placeholder="Email Address" value={formData.email} onChange={handleChange} style={inputStyle} required />
          <input name="phone" type="tel" placeholder="Phone number" value={formData.phone} onChange={handleChange} style={inputStyle} required />
          <input name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} style={inputStyle} required />
          <input name="confirmPassword" type="password" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} style={inputStyle} required />

          <button type="submit" style={buttonStyle}>Sign Up</button>

          {message && (
            <div style={{ marginTop: "1rem", textAlign: "center" }}>
              <p style={{ color: 'white', fontSize: '1rem' }}>{message}</p>
              {message.includes("successfully") && (
                <Link to="/login">
                  <button
                    style={{
                      marginTop: "0.75rem",
                      padding: "10px 24px",
                      borderRadius: "20px",
                      backgroundColor: "white",
                      color: "#6A7D4F",
                      fontWeight: "bold",
                      border: "none",
                      cursor: "pointer"
                    }}
                  >
                    Go to Login
                  </button>
                </Link>
              )}
            </div>
          )}
        </form>
      </div>

      {/* Right Side – Background and Log In Link */}
      <div
        style={{
          flex: 1,
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
          color: 'white',
          padding: '3rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <div style={{ textAlign: 'center', maxWidth: '80%' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>We have<br />met before right?</h2>
          <p style={{ fontSize: '1rem', marginBottom: '1rem' }}>
            Let's have matcha together!
          </p>
          <p style={{ fontSize: '1rem', marginBottom: '2rem' }}>
            Matcha solves all your problems<br />
            in one delightful little cup.
          </p>

          <Link to="/login">
            <button style={{
              backgroundColor: 'white',
              color: '#6A7D4F',
              padding: '0.75rem 2rem',
              borderRadius: '30px',
              fontWeight: 'bold',
              fontSize: '1.1rem',
              border: 'none',
              cursor: 'pointer'
            }}>
              Log In
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  padding: '0.75rem',
  borderRadius: '20px',
  border: 'none',
  width: '100%',
  backgroundColor: '#C1BAA1',
  color: '#333',
  fontSize: '1rem'
};

const buttonStyle = {
  padding: '0.75rem',
  borderRadius: '30px',
  border: '2px solid white',
  backgroundColor: 'transparent',
  color: 'white',
  fontSize: '1.1rem',
  fontWeight: 'bold',
  cursor: 'pointer',
  marginTop: '1rem'
};
