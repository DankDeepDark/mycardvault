import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { QrReader } from 'react-qr-reader';

const TransactPage = () => {
  const { id } = useParams();
  const [card, setCard] = useState(null);
  const [result, setResult] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const cards = JSON.parse(localStorage.getItem('cards') || '[]');
    const found = cards.find(c => c.id === id);
    if (!found) navigate('/cards');
    setCard(found);
  }, [id, navigate]);

  const handleScan = data => data && setResult(data);
  const handleError = err => console.error(err);

  return (
    <div className="container">
      <h2>Giao Dịch Thẻ</h2>
      {card && (
        <div className="card-info">
          <p><strong>Chủ thẻ:</strong> {card.holder}</p>
          <p><strong>Loại thẻ:</strong> {card.type}</p>
          <p><strong>Số thẻ:</strong> {card.number}</p>
          <p><strong>Hạn:</strong> {card.expiry}</p>
        </div>
      )}
      <div className="qr-scanner" style={{ width: '45%', height: 'auto' }}>
        <QrReader
          delay={300}
          onError={handleError}
          onResult={(res, err) => res && handleScan(res.getText())}
        />
      </div>
      {result && <p style={{ width: '45%', height: 'auto' }}>Kết quả truyền tới POS: {result}</p>}
    </div>
  );
};

export default TransactPage;