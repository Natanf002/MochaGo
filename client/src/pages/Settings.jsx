import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaPhone, FaCreditCard, FaUpload, FaSave } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from '../api/axios';

export default function Settings() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [profilePhotoPreview, setProfilePhotoPreview] = useState(null);
  const [name, setName] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get('/auth/me');
        setFirstName(res.data.first_name || '');
        setLastName(res.data.last_name || '');
        setEmail(res.data.email || '');
        setPhone(res.data.phone || '');
        setPaymentMethod(res.data.payment_method || '');
        setProfilePhotoPreview(res.data.profile_photo || '');
        setName(`${res.data.first_name || 'John'} ${res.data.last_name || 'Doe'}`);
      } catch (err) {
        console.error(err);
        toast.error('Failed to load profile.');
      }
    };
    fetchProfile();
  }, []);

  const handleUpdateProfile = async () => {
    const formData = new FormData();
    formData.append('first_name', firstName);
    formData.append('last_name', lastName);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('payment_method', paymentMethod);
    if (profilePhoto) formData.append('profile_photo', profilePhoto);

    try {
      const response = await axios.put('/auth/me', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      toast.success('Profile updated successfully!');
      setName(`${firstName} ${lastName}`);

      if (profilePhoto) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setProfilePhotoPreview(reader.result);
        };
        reader.readAsDataURL(profilePhoto);
      } else if (response.data?.updatedPhotoPath) {
        setProfilePhotoPreview(`http://localhost:5050${response.data.updatedPhotoPath}`);
      }
    } catch (err) {
      console.error(err);
      toast.error('Error updating profile.');
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', width: '100vw' }}>
      <ToastContainer />

      {/* LEFT SIDE – Settings Form */}
      <div style={{ flex: 2, backgroundColor: '#050505', color: 'white', padding: '3rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem' }}>Settings</h1>

        <div style={{ marginBottom: '2rem' }}>
          <label>First Name</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            style={inputBoxStyle}
          />
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <label>Last Name</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            style={inputBoxStyle}
          />
        </div>

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
            onChange={(e) => {
              const file = e.target.files[0];
              if (file && file.size <= 1024 * 1024) {
                setProfilePhoto(file);
                const reader = new FileReader();
                reader.onloadend = () => {
                  setProfilePhotoPreview(reader.result);
                };
                reader.readAsDataURL(file);
              } else {
                toast.error('Only PNG files under 1MB allowed.');
              }
            }}
            style={{ marginTop: '0.5rem', color: '#ccc' }}
          />
        </div>

        <button onClick={handleUpdateProfile} style={buttonStyle}>
          <FaSave style={iconStyle} /> Save Changes
        </button>
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
            overflow: 'hidden',
          }}>
            {profilePhotoPreview ? (
              <img
                src={profilePhotoPreview.startsWith('/uploads/') ? `http://localhost:5050${profilePhotoPreview}` : profilePhotoPreview}
                alt="Profile"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              <span style={{ color: '#333' }}>Profile</span>
            )}
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginTop: '1rem' }}>{name}</h2>
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
};