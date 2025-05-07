import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const CARD_NUMBER_REGEX = /^\d{4}\s?\d{4}\s?\d{4}\s?\d{4}$/;

const AddCardPage = () => {
  const [number, setNumber] = useState('');
  const [holder, setHolder] = useState('');
  const [expiry, setExpiry] = useState('');
  const [type, setType] = useState('Visa');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!CARD_NUMBER_REGEX.test(number.trim())) {
      newErrors.number = 'Số thẻ phải gồm 16 chữ số, có thể cách bởi khoảng trắng.';
    }
    if (!holder.trim()) {
      newErrors.holder = 'Tên chủ thẻ không được để trống.';
    }
    if (!expiry) {
      newErrors.expiry = 'Vui lòng chọn hạn sử dụng.';
    }
    if (!type) {
      newErrors.type = 'Vui lòng chọn loại thẻ.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    const newCard = { id: uuidv4(), number: number.trim(), holder: holder.trim(), expiry, type };
    const cards = JSON.parse(localStorage.getItem('cards') || '[]');
    localStorage.setItem('cards', JSON.stringify([...cards, newCard]));
    navigate('/cards');
  };

  return (
    <div className="container">
      <h2>Thêm Thẻ</h2>
      <div className="form-group">
        <label>Số Thẻ</label>
        <input
          value={number}
          onChange={e => setNumber(e.target.value)}
          placeholder="1234 5678 9012 3456"
        />
        {errors.number && <p className="error-text">{errors.number}</p>}
      </div>
      <div className="form-group">
        <label>Tên Chủ Thẻ</label>
        <input
          value={holder}
          onChange={e => setHolder(e.target.value)}
          placeholder="Nguyen Van A"
        />
        {errors.holder && <p className="error-text">{errors.holder}</p>}
      </div>
      <div className="form-group">
        <label>Loại Thẻ</label>
        <select value={type} onChange={e => setType(e.target.value)}>
          <option value="Visa">Visa</option>
          <option value="Vietcomebank">Vietcomebank</option>
          <option value="VPBank">VPBank</option>
          <option value="Techcombank">Techcombank</option>
          <option value="Vietinbank">Vietinbank</option>
          <option value="MBBank">MBBank</option>
          <option value="BIDV">BIDV</option>
          <option value="MasterCard">MasterCard</option>
        </select>
        {errors.type && <p className="error-text">{errors.type}</p>}
      </div>
      <div className="form-group">
        <label>Hạn Sử Dụng</label>
        <input
          type="month"
          value={expiry}
          onChange={e => setExpiry(e.target.value)}
        />
        {errors.expiry && <p className="error-text">{errors.expiry}</p>}
      </div>
      <button onClick={handleSave}>Lưu Thẻ</button>
    </div>
  );
};

export default AddCardPage;
