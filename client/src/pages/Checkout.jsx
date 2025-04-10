<<<<<<< HEAD
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
=======
// File: src/pages/Checkout.jsx
import Header from '../components/Header';
import { useState } from 'react';

export default function Checkout() {
  const [card, setCard] = useState({ name: '', number: '', exp: '', cvv: '' });
  const handleChange = (e) => setCard({ ...card, [e.target.name]: e.target.value });

  const handlePayment = () => {
    alert('Payment submitted!');
  };

  return (
    <>
      <Header />
      <div className="flex min-h-screen">
        {/* Left Billing Form */}
        <div className="w-1/2 bg-gray-900 text-white p-8">
          <h2 className="text-2xl mb-6 font-bold">Billing Information</h2>
          <form onSubmit={(e) => { e.preventDefault(); handlePayment(); }} className="space-y-4">
            <div>
              <label className="block mb-1">Payment Method</label>
              <div className="flex gap-4">
                <label><input type="radio" name="method" defaultChecked /> Credit/Debit</label>
                <label><input type="radio" name="method" disabled /> PayPal</label>
              </div>
            </div>
            <input name="name" value={card.name} onChange={handleChange} placeholder="Name on Card" className="w-full p-2 rounded bg-gray-800" required />
            <input name="number" value={card.number} onChange={handleChange} placeholder="Card Number" className="w-full p-2 rounded bg-gray-800" required />
            <div className="flex gap-4">
              <input name="exp" value={card.exp} onChange={handleChange} placeholder="MM/YY" className="w-1/2 p-2 rounded bg-gray-800" required />
              <input name="cvv" value={card.cvv} onChange={handleChange} placeholder="CVV" className="w-1/2 p-2 rounded bg-gray-800" required />
            </div>
            <p className="text-xs mt-2">By proceeding, you agree to MochaGo’s terms and conditions.</p>
            <div className="flex gap-2 mt-4">
              <button type="button" className="border border-green-500 text-green-500 px-4 py-2 rounded">Back</button>
              <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Proceed to Payment</button>
            </div>
          </form>
        </div>

        {/* Right Cart Summary */}
        <div className="w-1/2 bg-green-700 p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Cart Summary</h2>
          <ul className="space-y-3">
            <li className="flex justify-between">
              <span>Matcha Latte</span>
              <span>$5.99</span>
            </li>
            <li className="flex justify-between">
              <span>Avocado Toast</span>
              <span>$8.99</span>
            </li>
          </ul>
          <button className="mt-4 underline">View More</button>
        </div>
      </div>
    </>
>>>>>>> upstream/main
  );
}
