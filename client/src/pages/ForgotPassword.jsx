import { useState } from 'react';
import axios from '../api/axios';
import { Link } from 'react-router-dom';
import bulb from '../assets/lightbulb.png';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/auth/forgot-password', { email });
      setMessage('Password reset instructions sent!');
    } catch (err) {
      setMessage('Failed to send reset link');
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw' }}>
      {/* LEFT PANEL */}
      <div
        style={{
          flex: 1,
          backgroundColor: '#050505',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
        }}
      >
        <img
          src={bulb}
          alt="lightbulb"
          style={{
            height: '100%',
            width: 'auto',
            objectFit: 'cover',
          }}
        />
      </div>

      {/* RIGHT PANEL */}
      <div
        style={{
          flex: 1,
          backgroundColor: '#6A7D4F',
          color: 'white',
          padding: '3rem',
          position: 'relative',
        }}
      >
        {/* MochaGo Logo */}
        <Link
          to="/"
          style={{
            position: 'absolute',
            top: '1.5rem',
            left: '2rem',
            fontWeight: 'bold',
            fontSize: '2rem',
            textDecoration: 'none',
            color: 'white',
          }}
        >
          ☕ MochaGo
        </Link>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            height: '100%',
            alignItems: 'center',
            paddingTop: '3rem',
          }}
        >
          <h1
            style={{
              fontSize: '2.6rem',
              fontWeight: 'bold',
              marginBottom: '1rem',
              textAlign: 'center',
            }}
          >
            Reset Password
          </h1>
          <p
            style={{
              marginBottom: '2rem',
              textAlign: 'center',
              maxWidth: '400px',
              fontSize: '1.2rem',
              color: '#E5DAC2',
              lineHeight: '1.7',
            }}
          >
            Kindly enter the Email Address tied to your account.
            <br />
            We’ll help you recover your password.
          </p>

          <form
            onSubmit={handleSubmit}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
              width: '100%',
              maxWidth: '400px',
            }}
          >
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                padding: '1rem',
                borderRadius: '30px',
                border: 'none',
                backgroundColor: '#E6DCC7',
                fontSize: '1rem',
              }}
            />
            <button
              type="submit"
              style={{
                border: '2px solid white',
                backgroundColor: 'transparent',
                color: 'white',
                padding: '12px 24px',
                borderRadius: '30px',
                fontWeight: 'bold',
                cursor: 'pointer',
                fontSize: '1.1rem',
              }}
            >
              Recover Password
            </button>
            {message && (
              <p
                style={{
                  color: 'white',
                  fontSize: '1rem',
                  textAlign: 'center',
                  marginTop: '0.5rem',
                }}
              >
                {message}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
