// middleware/authenticate.js

const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // 1. Lấy header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Không có token' });
  }

  const token = authHeader.slice(7); // bỏ "Bearer "

  try {
    // 2. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // 3. Gán userId để downstream dùng
    req.userId = decoded.userId;
    return next();
  } catch (err) {
    // 4. Log chi tiết để debug
    console.error('🔒 JWT verify error:', err);

    // 5. Phân biệt expired vs invalid
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token đã hết hạn' });
    }
    return res.status(403).json({ message: 'Token không hợp lệ' });
  }
};
