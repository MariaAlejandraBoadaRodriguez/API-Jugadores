const db = require('../config/dbconfig.js');

class Jugador{
    getJugadores(callback){
        const sql = "select id, nombre, edad, nacionalidad, equipo, posicion, goles, asistencias, altura, peso, titulos, valor from jugadores";
        db.query(sql, callback);
    }

    getJugadoresById(id, callback){
        const sql = "select id, nombre, edad, nacionalidad, equipo, posicion, goles, asistencias, altura, peso, titulos, valor from jugadores WHERE id=?";
        db.query(sql,[id], callback);
    }

    postJugadores(nombre, edad, nacionalidad, equipo, posicion, goles, asistencias, altura, peso, titulos, valor, callback){
        const sql = 'insert into jugadores(nombre, edad, nacionalidad, equipo, posicion, goles, asistencias, altura, peso, titulos, valor) values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        db.query(sql, [nombre, edad, nacionalidad, equipo, posicion, goles, asistencias, altura, peso, titulos, valor], (err, result)=>{
            if(err){
                return callback(err, null);
            }
            callback(null, result.insertId);
        });
    }

    putJugadores(id, nombre, edad, nacionalidad, equipo, posicion, goles, asistencias, altura, peso, titulos, valor, callback){
        const sql = 'update jugadores set nombre = ?, edad = ?, nacionalidad = ?, equipo = ?, posicion = ?, goles = ?, asistencias = ?, altura = ?, peso = ?, titulos = ?, valor = ? WHERE id = ?';
        db.query(sql, [nombre, edad, nacionalidad, equipo, posicion, goles, asistencias, altura, peso, titulos, valor, id],callback);
    }

    deleteJugadores(id, callback){
        const sql = 'delete from jugadores WHERE id = ?';
        db.query(sql, [id], callback);
    }
}

module.exports=new Jugador()