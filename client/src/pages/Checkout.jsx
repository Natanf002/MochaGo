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
  );
}
