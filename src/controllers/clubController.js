// src/controllers/clubController.js
const db = require('../config/dbconfig.js');

module.exports = {
    getAllClubs: (req, res) => {
        const sql = 'SELECT * FROM club';
        db.query(sql, (err, result) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.status(200).json({ data: result });
        });
    }
};
