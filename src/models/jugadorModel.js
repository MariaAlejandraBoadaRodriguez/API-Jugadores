const db = require('../config/dbconfig.js');

class Jugador{
    getJugadores(callback) {
        const sql = "SELECT id, nombre, edad, nacionalidad, equipo, posicion, goles, asistencias, altura, peso, titulos, valor, imagen FROM jugadores";
        db.query(sql, callback);
    }

    getJugadoresById(id, callback) {
        const sql = "SELECT id, nombre, edad, nacionalidad, equipo, posicion, goles, asistencias, altura, peso, titulos, valor, imagen FROM jugadores WHERE id = ?";
        db.query(sql, [id], callback);
    }

    postJugadores(nombre, edad, nacionalidad, equipo, posicion, goles, asistencias, altura, peso, titulos, valor, imagen, callback) {
        const sql = 'INSERT INTO jugadores(nombre, edad, nacionalidad, equipo, posicion, goles, asistencias, altura, peso, titulos, valor, imagen) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        db.query(sql, [nombre, edad, nacionalidad, equipo, posicion, goles, asistencias, altura, peso, titulos, valor, imagen], (err, result) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, result.insertId);
        });
    }

    putJugadores(id, nombre, edad, nacionalidad, equipo, posicion, goles, asistencias, altura, peso, titulos, valor, imagen, callback) {
        const sql = 'UPDATE jugadores SET nombre = ?, edad = ?, nacionalidad = ?, equipo = ?, posicion = ?, goles = ?, asistencias = ?, altura = ?, peso = ?, titulos = ?, valor = ?, imagen = ? WHERE id = ?';
        db.query(sql, [nombre, edad, nacionalidad, equipo, posicion, goles, asistencias, altura, peso, titulos, valor, imagen, id], callback);
    }

    deleteJugadores(id, callback) {
        const sql = 'DELETE FROM jugadores WHERE id = ?';
        db.query(sql, [id], callback);
    }
}

module.exports=new Jugador()