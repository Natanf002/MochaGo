// File: src/pages/OrderHistory.jsx
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';

export default function OrderHistory() {
  const navigate = useNavigate();
  const [orders] = useState([
    { date: '3/11/2025', time: '6:22 PM', items: ['Latte Macchiato', 'Grilled Cheese Sandwich'] },
    { date: '3/10/2025', time: '8:10 AM', items: ['Americano'] },
    { date: '3/07/2025', time: '5:35 PM', items: ['Latte Macchiato'] },
  ]);

  const [email, setEmail] = useState('');
  const [name, setName] = useState('Jane Doe');
  const [profilePhotoPreview, setProfilePhotoPreview] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get('/auth/me');
        setEmail(res.data.email || '');
        setName(`${res.data.first_name || 'John'} ${res.data.last_name || 'Doe'}`);
        setProfilePhotoPreview(res.data.profile_photo || '');
      } catch (err) {
        console.error(err);
      }
    };
    fetchProfile();
  }, []);

  return (
    <>
      <Header />
      <div className="flex min-h-screen">
        {/* Left Order History */}
        <div className="w-2/3 bg-black text-white p-8">
          <h1 className="text-3xl font-bold mb-6">Order History</h1>
          {orders.map((order, idx) => (
            <div key={idx} className="bg-gray-800 p-4 mb-4 rounded">
              <p className="font-semibold mb-1">Ordered on: {order.date} at {order.time}</p>
              <ul className="list-disc list-inside ml-4">
                {order.items.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </div>
          ))}
          <button className="mt-4 underline">View More</button>
        </div>

        {/* Right Profile Summary */}
        <div className="w-1/3 bg-green-700 text-white p-8 flex flex-col items-center space-y-6">
          <div className="w-32 h-32 rounded-full bg-gray-300 overflow-hidden">
            {profilePhotoPreview ? (
              <img
                src={`http://localhost:5050${profilePhotoPreview}`}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-black flex items-center justify-center h-full">Profile</span>
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
    </>
  );
}
