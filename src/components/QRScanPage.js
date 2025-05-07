import React, { useState, useEffect } from 'react';
import { QrReader } from 'react-qr-reader';

const QRScanPage = () => {
  const [result, setResult] = useState('');
  const [hasPermission, setHasPermission] = useState(null);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(() => setHasPermission(true))
      .catch(() => setHasPermission(false));
  }, []);

  if (hasPermission === null) return <div>Đang kiểm tra quyền camera...</div>;
  if (hasPermission === false) return <div>Không có quyền truy cập camera.</div>;

  return (
    <div className="container">
      <h2>Quét Mã QR</h2>
      <div className="qr-scanner" style={{ width: '45%', height: 'auto' }}>
        <QrReader
          delay={300}
          onResult={(res, err) => res && setResult(res.getText())}
        />
      </div>
      {result && <p style={{ width: '45%', height: 'auto' }}>Kết quả: {result}</p>}
    </div>
  );
};

export default QRScanPage;
