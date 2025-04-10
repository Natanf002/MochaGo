import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../api/axios';

export default function Checkout() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [name, setName] = useState('John Doe');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get('/auth/me');
        setEmail(res.data.email || '');
        setPhone(res.data.phone || '');
        setPaymentMethod(res.data.payment_method || '');
        setProfilePhoto(res.data.profile_photo || null);
        setName(`${res.data.first_name || 'John'} ${res.data.last_name || 'Doe'}`);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProfile();
  }, []);

  return (
    <div className="flex min-h-screen">
      {/* Checkout Summary */}
      <div className="w-2/3 bg-black text-white p-8">
        <h1 className="text-3xl font-bold mb-6">Checkout</h1>
        <p className="mb-4">Confirm your order and payment method below:</p>

        <div className="mb-4">
          <label className="block text-gray-300">Email:</label>
          <p className="font-semibold">{email}</p>
        </div>

        <div className="mb-4">
          <label className="block text-gray-300">Phone:</label>
          <p className="font-semibold">{phone}</p>
        </div>

        <div className="mb-4">
          <label className="block text-gray-300">Payment Method:</label>
          <p className="font-semibold">{paymentMethod}</p>
        </div>

        <button className="mt-6 bg-green-700 text-white px-6 py-2 rounded hover:bg-green-800 transition duration-300">
          Confirm Order
        </button>
      </div>

      {/* Profile Summary */}
      <div className="w-1/3 bg-green-700 text-white p-8 flex flex-col items-center space-y-6">
        <div className="w-32 h-32 rounded-full overflow-hidden">
          {profilePhoto ? (
            <img
              src={`http://localhost:5050${profilePhoto}`}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-300 text-black">
              Profile
            </div>
          )}
        </div>
        <h2 className="text-xl font-bold">{name}</h2>
        <p>{email}</p>
        <nav className="space-y-3 text-center">
          <button onClick={() => navigate('/')} className="block underline w-full">🏠 Home</button>
          <button onClick={() => navigate('/settings')} className="block underline w-full">⚙️ Settings</button>
          <button onClick={() => navigate('/forgot-password')} className="block underline w-full">🔐 Reset Password</button>
        </nav>
      </div>
    </div>
  );
}
