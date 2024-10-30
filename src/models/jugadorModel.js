const db = require('../config/dbconfig.js');

class Jugador {
    getJugadores(callback) {
        const sql = "SELECT id, name, age, nationality, club, position, goals_2024, assists, height, weight, titles_won, market_value, imgSrc FROM jugadores";
        db.query(sql, callback);
    }

    getJugadoresById(id, callback) {
        const sql = "SELECT id, name, age, nationality, club, position, goals_2024, assists, height, weight, titles_won, market_value, imgSrc FROM jugadores WHERE id = ?";
        db.query(sql, [id], callback);
    }

    postJugadores(name, age, nationality, club, position, goals_2024, assists, height, weight, titles_won, market_value, imgSrc, callback) {
        const sql = 'INSERT INTO jugadores(name, age, nationality, club, position, goals_2024, assists, height, weight, titles_won, market_value, imgSrc) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        db.query(sql, [name, age, nationality, club, position, goals_2024, assists, height, weight, titles_won, market_value, imgSrc], (err, result) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, result.insertId);
        });
    }

    putJugadores(id, name, age, nationality, club, position, goals_2024, assists, height, weight, titles_won, market_value, imgSrc, callback) {
        const sql = 'UPDATE jugadores SET name = ?, age = ?, nationality = ?, club = ?, position = ?, goals_2024 = ?, assists = ?, height = ?, weight = ?, titles_won = ?, market_value = ?, imgSrc = ? WHERE id = ?';
        db.query(sql, [name, age, nationality, club, position, goals_2024, assists, height, weight, titles_won, market_value, imgSrc, id], callback);
    }

    deleteJugadores(id, callback) {
        const sql = 'DELETE FROM jugadores WHERE id = ?';
        db.query(sql, [id], callback);
    }
}

module.exports = new Jugador();
