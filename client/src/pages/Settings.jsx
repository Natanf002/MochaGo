import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaPhone, FaCreditCard, FaUpload } from 'react-icons/fa';
import axios from '../api/axios';

export default function Settings() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await axios.get('/auth/me');
        setUser(res.data);
      } catch (err) {
        console.error('Failed to fetch user:', err);
      }
    }

    fetchUser();
  }, []);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', width: '100vw' }}>
      {/* LEFT SIDE – Settings Form */}
      <div style={{ flex: 2, backgroundColor: '#050505', color: 'white', padding: '3rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem' }}>Settings</h1>

        <div style={{ marginBottom: '2rem' }}>
          <label>Email Address</label>
          <div style={inputBoxStyle}>{user?.email || 'Loading...'}</div>
          <button style={buttonStyle}><FaEnvelope style={iconStyle} /> Change Email</button>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <label>Phone Number</label>
          <div style={inputBoxStyle}>{user?.phone ? `Ending in ${user.phone.slice(-4)}` : 'Loading...'}</div>
          <button style={buttonStyle}><FaPhone style={iconStyle} /> Change Phone Number</button>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <label>Payment Method</label>
          <div style={inputBoxStyle}>Card Ending in 0123</div>
          <button style={buttonStyle}><FaCreditCard style={iconStyle} /> Change Payment Method</button>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <label>Profile Photo</label>
          <div style={inputBoxStyle}>Profile-Photo.jpg</div>
          <button style={buttonStyle}><FaUpload style={iconStyle} /> Upload Photo</button>
        </div>
      </div>

      {/* RIGHT SIDE – Profile Summary */}
      <div style={{
        flex: 1,
        backgroundColor: '#6A7D4F',
        color: 'white',
        padding: '3rem',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative'
      }}>
        {/* Logo top-right */}
        <div
          onClick={() => navigate('/')}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '2rem',
            fontSize: '1.5rem',
            fontWeight: 'bold',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.3rem'
          }}
        >
          <span role="img" aria-label="coffee">☕</span> MochaGo
        </div>

        <div style={{ marginTop: '4rem', marginBottom: '2rem' }}>
          <div style={{
            width: '140px',
            height: '140px',
            borderRadius: '50%',
            backgroundColor: '#d9d9d9',
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
              style={{ width: '60%', height: '60%', color: '#333' }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
              />
            </svg>
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginTop: '1rem' }}>
            {user?.first_name || 'John'} {user?.last_name || 'Doe'}
          </h2>
          <p style={{ color: '#ddd' }}>{user?.email || 'johndoe@email.com'}</p>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center', width: '100%' }}>
          <hr style={dividerStyle} />
          <Link to="/settings" style={navLinkStyle}>Settings</Link>
          <hr style={dividerStyle} />
          <Link to="/orders" style={navLinkStyle}>Order History</Link>
          <hr style={dividerStyle} />
          <Link to="/forgot-password" style={navLinkStyle}>Reset Password</Link>
        </nav>
      </div>
    </div>
  );
}

// STYLES
const inputBoxStyle = {
  backgroundColor: '#D9CDB4',
  padding: '1rem',
  borderRadius: '30px',
  marginTop: '0.5rem',
  fontWeight: 'bold',
  color: '#111',
  fontSize: '1rem',
  textAlign: 'center'
};

const buttonStyle = {
  marginTop: '0.5rem',
  backgroundColor: '#1e1e1e',
  color: '#fff',
  padding: '0.5rem 1rem',
  borderRadius: '10px',
  border: 'none',
  fontSize: '0.9rem',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.5rem',
  cursor: 'pointer'
};

const iconStyle = {
  fontSize: '1rem'
};

const navLinkStyle = {
  color: '#EAEAEA',
  textDecoration: 'none',
  fontSize: '1rem',
  fontWeight: '500'
};

const dividerStyle = {
  width: '60%',
  border: 'none',
  borderBottom: '1px solid #ccc'
};
