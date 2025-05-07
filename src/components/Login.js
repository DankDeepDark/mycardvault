// src/components/Login.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import '../components/styleLR.css';

const Login = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', form);
      localStorage.setItem('token', response.data.token);
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.message || 'Lỗi server');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-header">
        <h2>Đăng nhập</h2>
      </div>
      <form className="auth-form" onSubmit={handleSubmit}>
        <input
          name="username"
          placeholder="Tên người dùng"
          value={form.username}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Mật khẩu"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Đăng nhập</button>
      </form>
      <div className="auth-footer">
        Chưa có tài khoản? <Link to="/register">Đăng ký ngay!</Link>
      </div>
    </div>
  );
};

export default Login;
