import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';

export default function Navbar() {
  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + (item.qty || 1), 0);

  return (
    <nav style={{ padding: '16px', borderBottom: '1px solid #333' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/" style={{ fontSize: '20px', fontWeight: 'bold', color: '#60a5fa', textDecoration: 'none' }}>
          E-Shop
        </Link>
        
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>
            Products
          </Link>
          <Link to="/cart" style={{ color: '#fff', textDecoration: 'none' }}>
            Cart {totalCartCount > 0 && `(${totalCartCount})`}
          </Link>
          
          {userInfo ? (
            <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
              <Link to="/myorders" style={{ color: '#fff', textDecoration: 'none' }}>
                My Orders
              </Link>
              <span>Hi, {userInfo.name}</span>
              <button 
                onClick={handleLogout}
                style={{ padding: '4px 10px', cursor: 'pointer' }}
              >
                Logout
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
              <Link to="/login" style={{ color: '#fff', textDecoration: 'none' }}>
                Login
              </Link>
              <Link to="/register" style={{ color: '#fff', textDecoration: 'none' }}>
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}