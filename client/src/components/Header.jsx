import { Link, useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('mochago_token');
    navigate('/login');
  };

  return (
    <header className="w-full p-4 bg-green-700 text-white flex justify-between items-center shadow">
      <div className="text-xl font-bold">☕ MochaGo</div>
      <nav className="space-x-4">
        <Link to="/main" className="hover:underline">Main</Link>
        <Link to="/checkout" className="hover:underline">Checkout</Link>
        <Link to="/settings" className="hover:underline">Settings</Link>
        <Link to="/orders" className="hover:underline">Orders</Link>
        <button
          onClick={handleLogout}
          className="ml-4 px-2 py-1 bg-red-500 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </nav>
    </header>
  );
}
