import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styleLR.css';
import api from '../services/api';

const HomePage = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token');
  const [username, setUsername] = useState('');

  useEffect(() => {
    api.get('/auth/me')
      .then(res => setUsername(res.data.username))
      .catch(console.error);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="container">
      <h2>Chào mừng đến MyCardVault</h2>
      <div className="menu-links">
        <ul>
          <li><Link to="/scan">Quét mã QR</Link></li>
          <li><Link to="/cards">Danh sách Thẻ</Link></li>
          <li><Link to="/add-card">Thêm Thẻ Mới</Link></li>
        </ul>
      </div>
      <div className="auth-controls">
        {isLoggedIn ? (
          <>
            <p><strong>{username}</strong>, bạn đã đăng nhập!</p>
            <Link to="/profile"><button>Tài khoản</button></Link>
            <button onClick={handleLogout}>Đăng xuất</button>
          </>
        ) : (
          <>
            <Link to="/login"><button>Đăng nhập</button></Link>
            <Link to="/register"><button>Đăng ký</button></Link>
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;