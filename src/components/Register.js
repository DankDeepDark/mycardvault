import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../components/styleLR.css';

const Register = () => {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Lỗi đăng ký');
      }

      alert('Đăng ký thành công!');
      navigate('/login');
    } catch (err) {
      alert(err.message || 'Lỗi server');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-header">
        <h2>Đăng ký</h2>
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
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
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
        <button type="submit">Đăng ký</button>
      </form>
      <div className="auth-footer">
        Đã có tài khoản? <Link to="/login">Đăng nhập ngay!</Link>
      </div>
    </div>
  );
};

export default Register;
