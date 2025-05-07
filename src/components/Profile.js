// src/pages/Profile.js
import React, { useState, useEffect } from 'react';
import api from '../services/api';  // axios instance đã cấu hình baseURL và header

const Profile = () => {
  const [user, setUser]   = useState({ username: '', email: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    api.get('/auth/me')
      .then(res => {
        console.log('Profile data from API:', res.data);
        setUser(res.data);
      })
      .catch(() => setError('Không thể tải thông tin tài khoản.'));
  }, []);
  
  

  return (
    <div className="container">
      <h2>Thông Tin Tài Khoản</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {user.username ? (
        <>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong>    {user.email}</p>
          <p><strong>Password:</strong> {'********'}</p>
        </>
      ) : (
        <p>Đang tải...</p>
      )}
    </div>
  );
};

export default Profile;
