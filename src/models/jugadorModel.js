const db = require('../config/dbconfig.js');

class Jugador {
    getJugadores(callback) {
        const sql = "SELECT * FROM jugadores";
        db.query(sql, callback);
    }

    getJugadoresById(id, callback) {
        const sql = "SELECT * FROM jugadores WHERE club_id = ?";
        db.query(sql, [id], callback);
    }

    getJugadoresByClubId(clubId, callback) {
        const sql = "SELECT id, name, age, nationality, club, position, goals_2024, assists, height, weight, titles_won, market_value, imgSrc, type, star_year, club_id FROM jugadores WHERE club_id = ?";
        db.query(sql, [clubId], callback);
    }

    postJugadores(name, age, nationality, club, position, goals_2024, assists, height, weight, titles_won, market_value, imgSrc, callback) {
        const sql = 'INSERT INTO jugadores(name, age, nationality, club, position, goals_2024, assists, height, weight, titles_won, market_value, imgSrc, type, star_year, club_id) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        db.query(sql, [name, age, nationality, club, position, goals_2024, assists, height, weight, titles_won, market_value, imgSrc], (err, result) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, result.insertId);
        });
    }

    putJugadores(id, name, age, nationality, club, position, goals_2024, assists, height, weight, titles_won, market_value, imgSrc, callback) {
        const sql = 'UPDATE jugadores SET name = ?, age = ?, nationality = ?, club = ?, position = ?, goals_2024 = ?, assists = ?, height = ?, weight = ?, titles_won = ?, market_value = ?, imgSrc = ?, type = ?, star_year = ?, club_id = ? WHERE id = ?';
        db.query(sql, [name, age, nationality, club, position, goals_2024, assists, height, weight, titles_won, market_value, imgSrc, id], callback);
    }

    deleteJugadores(id, callback) {
        const sql = 'DELETE FROM jugadores WHERE id = ?';
        db.query(sql, [id], callback);
    }
}

module.exports = new Jugador();
