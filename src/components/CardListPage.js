import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CardListPage = () => {
  const [cards, setCards] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    setCards(JSON.parse(localStorage.getItem('cards') || '[]'));
  }, []);

  const handleDelete = id => {
    const updated = cards.filter(c => c.id !== id);
    localStorage.setItem('cards', JSON.stringify(updated));
    setCards(updated);
  };

  return (
    <div className="container">
      <h2>Danh sách Thẻ</h2>
      {cards.length === 0 ? (
        <p>Chưa có thẻ nào.</p>
      ) : (
        cards.map(card => (
          <div key={card.id} className="card-item">
            <div>
              <p><strong>Chủ thẻ:</strong> {card.holder}</p>
              <p><strong>Loại thẻ:</strong> {card.type}</p>
              <p><strong>Số thẻ:</strong> {card.number}</p>
              <p><strong>Hạn:</strong> {card.expiry}</p>
            </div>
            <div>
              <button onClick={() => nav(`/transact/${card.id}`)}>Giao Dịch</button>
              <button onClick={() => handleDelete(card.id)}>Xóa</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default CardListPage;