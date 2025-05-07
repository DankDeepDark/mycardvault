// backend/config/db.js
const mongoose = require('mongoose');
const dotenv  = require('dotenv');

dotenv.config();

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB đã kêt nối thành công!');
  } catch (err) {
    console.error('MongoDB kết nối lỗi:', err);
    process.exit(1);
  }
}

module.exports = connectDB;
