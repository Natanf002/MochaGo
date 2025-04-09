import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Login from './pages/Login';
import Signup from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';
import MainEvent from './pages/MainEvent';
import Checkout from './pages/Checkout';
import Settings from './pages/Settings';
import OrderHistory from './pages/OrderHistory';

function ProtectedRoute({ children }) {
  const isAuthenticated = localStorage.getItem('mochago_token');
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

export default function App() {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('mochago_token'));

  useEffect(() => {
    const listener = () => setLoggedIn(!!localStorage.getItem('mochago_token'));
    window.addEventListener('storage', listener);
    return () => window.removeEventListener('storage', listener);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainEvent />} />
        <Route path="/login" element={loggedIn ? <Navigate to="/" /> : <Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <OrderHistory />
            </ProtectedRoute>
          }
        />
        {/* Catch-all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
