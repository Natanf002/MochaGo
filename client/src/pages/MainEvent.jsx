import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import matchaImage from '../assets/matcha-cup.png';

export default function MainEvent() {
  const [menuOpen, setMenuOpen] = useState(false);
  const username = 'John';

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div style={{
      backgroundColor: '#B1C095',
      height: '100vh',
      width: '100vw',
      overflow: 'hidden',
      padding: '2rem',
      boxSizing: 'border-box'
    }}>
      {/* Header */}
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem',
        fontSize: '1.2rem'
      }}>
        <h1 style={{ fontSize: '2rem', color: '#3A3A3A' }}>☕ MochaGo</h1>

        <nav style={{
          display: 'flex',
          gap: '1.5rem',
          alignItems: 'center',
          flexWrap: 'wrap',
          position: 'relative'
        }}>
          {/* OnClick Menu Dropdown */}
          <div style={{ position: 'relative' }}>
            <span style={{ cursor: 'pointer' }} onClick={toggleMenu}>Menu ⌄</span>
            {menuOpen && (
              <div style={{
                position: 'absolute',
                top: '120%',
                left: 0,
                backgroundColor: '#FFF',
                border: '1px solid #ccc',
                borderRadius: '8px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                padding: '0.5rem 1rem',
                zIndex: 5,
                minWidth: '100px'
              }}>
                <Link
                  to="/signup"
                  onClick={() => setMenuOpen(false)}
                  style={{
                    textDecoration: 'none',
                    color: '#6A7D4F',
                    fontWeight: 'bold',
                    display: 'block',
                    padding: '0.25rem 0'
                  }}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          <Link to="/settings" style={{ color: '#333', fontWeight: 'bold', textDecoration: 'none' }}>
            Settings
          </Link>

          <Link to="/orders" style={{ color: '#333', fontWeight: 'bold', textDecoration: 'none' }}>
            👤 {username}
          </Link>

          <Link to="/checkout" style={{
            backgroundColor: '#6A7D4F',
            padding: '0.5rem 1.25rem',
            borderRadius: '30px',
            color: 'white',
            fontWeight: 'bold',
            textDecoration: 'none',
            whiteSpace: 'nowrap'
          }}>
            🛒 Checkout
          </Link>
        </nav>
      </header>

      {/* Main Content */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        position: 'relative',
        width: '100%',
        height: 'calc(100% - 100px)',
        overflow: 'hidden'
      }}>
        {/* Left: Ellipse + Matcha */}
        <div style={{ position: 'relative', flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'start' }}>
          <div style={{
            width: '700px',
            height: '700px',
            backgroundColor: '#5A6F44',
            borderRadius: '50%',
            position: 'relative',
            top: '0',
            zIndex: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <img
              src={matchaImage}
              alt="Matcha Cup"
              style={{
                width: '85%', // fill most of the ellipse
                height: 'auto',
                zIndex: 1,
                objectFit: 'contain',
                transform: 'translateX(75px)' // move image 30px to the right
              }}
            />
          </div>
        </div>

        {/* Right: Text Content */}
        <div style={{
          flex: 1,
          paddingLeft: '2rem',
          paddingTop: '2rem',
          color: '#2F2F2F',
          zIndex: 2
        }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
            Today’s Event
          </h2>
          <p style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>
            Come enjoy an evening of matcha tastings, exclusive new menu items, and a cozy atmosphere with fellow matcha enthusiasts.
          </p>
          <ul style={{ fontSize: '1.2rem', lineHeight: '2rem' }}>
            <li>• Live Demonstrations 🎥</li>
            <li>• Exclusive Discounts 💰</li>
            <li>• Social & Networking 🤝</li>
            <li>• Free Samples 🧋</li>
          </ul>
          <p style={{ marginTop: '1rem', fontSize: '1rem' }}>
            📍 Location: MatchaGo &nbsp; 🕓 Time: 4PM EST
          </p>
        </div>
      </div>
    </div>
  );
}
