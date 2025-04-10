import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaPhone, FaCreditCard, FaUpload, FaSave } from 'react-icons/fa';
import axios from '../api/axios';

export default function Settings() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [profilePhoto, setProfilePhoto] = useState(null);
<<<<<<< HEAD
  const [profilePhotoPreview, setProfilePhotoPreview] = useState(null);
  const [name, setName] = useState('John Doe');
=======
  const [profilePhotoUrl, setProfilePhotoUrl] = useState('');
>>>>>>> upstream/main
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get('/auth/me');
        setEmail(res.data.email || '');
        setPhone(res.data.phone || '');
        setPaymentMethod(res.data.payment_method || '');
<<<<<<< HEAD
        setProfilePhotoPreview(res.data.profile_photo || '');
        setName(`${res.data.first_name || 'John'} ${res.data.last_name || 'Doe'}`);
=======
        setProfilePhotoUrl(res.data.profile_photo || '');
>>>>>>> upstream/main
      } catch (err) {
        console.error(err);
      }
    };
    fetchProfile();
  }, []);

  const handleUpdateProfile = async () => {
    const formData = new FormData();
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('payment_method', paymentMethod);
    if (profilePhoto) formData.append('profile_photo', profilePhoto);

    try {
<<<<<<< HEAD
      const response = await axios.put('/auth/me', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setMessage('Profile updated successfully!');
      if (response.data?.updatedPhotoPath) {
        setProfilePhotoPreview(response.data.updatedPhotoPath);
      } else {
        // Refetch to get updated image path
        const res = await axios.get('/auth/me');
        setProfilePhotoPreview(res.data.profile_photo || '');
      }
=======
      const res = await axios.put('/auth/me', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setMessage('Profile updated successfully!');
      if (res.data.profile_photo) setProfilePhotoUrl(res.data.profile_photo);
>>>>>>> upstream/main
    } catch (err) {
      console.error(err);
      setMessage('Error updating profile.');
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', width: '100vw' }}>
      {/* LEFT SIDE – Settings Form */}
      <div style={{ flex: 2, backgroundColor: '#050505', color: 'white', padding: '3rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem' }}>Settings</h1>

        <div style={{ marginBottom: '2rem' }}>
          <label>Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputBoxStyle}
          />
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <label>Phone Number</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            style={inputBoxStyle}
          />
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <label>Payment Method</label>
          <input
            type="text"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            style={inputBoxStyle}
          />
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <label>Profile Photo</label>
          <input
            type="file"
            accept="image/png"
<<<<<<< HEAD
            onChange={(e) => {
              const file = e.target.files[0];
              setProfilePhoto(file);
              if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                  setProfilePhotoPreview(reader.result);
                };
                reader.readAsDataURL(file);
              }
            }}
=======
            onChange={(e) => setProfilePhoto(e.target.files[0])}
>>>>>>> upstream/main
            style={{ marginTop: '0.5rem', color: '#ccc' }}
          />
        </div>

        <button onClick={handleUpdateProfile} style={buttonStyle}>
          <FaSave style={iconStyle} /> Save Changes
        </button>

        {message && <p style={{ marginTop: '1rem', color: '#ccc' }}>{message}</p>}
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
            alignItems: 'center',
<<<<<<< HEAD
            overflow: 'hidden',
          }}>
            {profilePhotoPreview ? (
              <img
                src={profilePhotoPreview.startsWith('/uploads/') ? `http://localhost:5050${profilePhotoPreview}` : profilePhotoPreview}
=======
            overflow: 'hidden'
          }}>
            {profilePhotoUrl ? (
              <img
                src={`http://localhost:5050/${profilePhotoUrl}`}
>>>>>>> upstream/main
                alt="Profile"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
<<<<<<< HEAD
              <span style={{ color: '#333' }}>Profile</span>
            )}
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginTop: '1rem' }}>{name}</h2>
=======
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
            )}
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginTop: '1rem' }}>John Doe</h2>
>>>>>>> upstream/main
          <p style={{ color: '#ddd' }}>{email}</p>
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
<<<<<<< HEAD
};
=======
};
>>>>>>> upstream/main
