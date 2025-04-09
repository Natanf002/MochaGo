// File: src/pages/OrderHistory.jsx
import Header from '../components/Header';

export default function OrderHistory() {
  const orders = [
    { date: '3/11/2025', time: '6:22 PM', items: ['Latte Macchiato', 'Grilled Cheese Sandwich'] },
    { date: '3/10/2025', time: '8:10 AM', items: ['Americano'] },
    { date: '3/07/2025', time: '5:35 PM', items: ['Latte Macchiato'] },
  ];

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
          <img src="/images/profile-pic.png" alt="Profile" className="w-32 h-32 rounded-full" />
          <h2 className="text-xl font-bold">Jane Doe</h2>
          <p>jane.doe@example.com</p>
          <nav className="space-y-3 text-center">
            <button className="block underline w-full">🏠 Home</button>
            <button className="block underline w-full">⚙️ Settings</button>
            <button className="block underline w-full">🔐 Reset Password</button>
          </nav>
        </div>
      </div>
    </>
  );
}
