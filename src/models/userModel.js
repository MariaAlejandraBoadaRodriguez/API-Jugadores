const db = require('../config/dbconfig');

const User = {
  findByEmail: (email, callback) => {
    const sql = 'SELECT * FROM users WHERE email = ?';
    db.query(sql, [email], callback);
  },

  create: (email, hashedPassword, callback) => {
    const sql = 'INSERT INTO users (email, password_hash) VALUES (?, ?)';
    db.query(sql, [email, hashedPassword], callback);
  }
};

module.exports = User;
