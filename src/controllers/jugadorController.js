const jugadorModel = require('../models/jugadorModel.js');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

module.exports = {
    getJugadores: (req, res) => {
        const clubId = req.query.club_id;

        if (clubId) {
            // Filtra jugadores por club_id
            jugadorModel.getJugadoresByClubId(clubId, (err, result) => {
                if (err) {
                    res.status(500).json({ error: err.message });
                    return;
                }
                res.status(200).json({ data: result });
            });
        } else {
            // Devuelve todos los jugadores
            jugadorModel.getJugadores((err, result) => {
                if (err) {
                    res.status(500).json({ error: err.message });
                    return;
                }
                res.status(200).json({ data: result });
            });
        }
    },

    getJugadoresById: (req, res) => {
        const { id } = req.params;
        jugadorModel.getJugadoresById(id, (err, result) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            if (result.length === 0) {
                res.status(404).json({ message: 'Jugador no encontrado' });
                return;
            }
            const jugador = result[0];
            if (jugador.imgSrc) {
                jugador.imgSrc = jugador.imgSrc.toString('base64');
            }
            res.status(200).json({ data: result });
        });
    },

    postJugadores: (req, res) => {
        const { name, age, nationality, club, position, goals_2024, assists, height, weight, titles_won, market_value, type, star_year, club_id} = req.body;
        const imgSrc = req.file ? req.file.buffer : null;

        jugadorModel.postJugadores(name, age, nationality, club, position, goals_2024, assists, height, weight, titles_won, market_value, imgSrc, type, star_year, club_id, (err, result) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.status(201).json({ message: 'Jugador creado correctamente', data: { idInsertado: result } });
        });
    },

    putJugadores: (req, res) => {
        const { id } = req.params;
        const { name, age, nationality, club, position, goals_2024, assists, height, weight, titles_won, market_value, type, star_year, club_id } = req.body;
        const imgSrc = req.file ? req.file.buffer : null;

        jugadorModel.putJugadores(id, name, age, nationality, club, position, goals_2024, assists, height, weight, titles_won, market_value, imgSrc, type, star_year, club_id, (err, result) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }

            if (result.affectedRows === 0) {
                res.status(404).json({ message: 'Jugador no encontrado' });
                return;
            }

            res.status(200).json({ message: 'Jugador actualizado correctamente' });
        });
    },

    deleteJugadores: (req, res) => {
        const { id } = req.params;
        jugadorModel.deleteJugadores(id, (err, result) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }

            if (result.affectedRows === 0) {
                res.status(404).json({ message: 'Jugador no encontrado' });
                return;
            }

            res.status(200).json({ message: 'Jugador eliminado correctamente' });
        });
    }
}
