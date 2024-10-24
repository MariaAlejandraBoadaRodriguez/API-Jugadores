const jugadorModel = require('../models/jugadorModel.js');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

module.exports={
    getJugadores:(req, res)=>{
        jugadorModel.getJugadores((err, result)=>{
            if(err){
                res.status(500).json({error:err.message});
                return;
            }
            res.status(200).json({data:result});
        });
    },

    getJugadoresById:(req, res)=>{
        const{id}=req.params;
        jugadorModel.getJugadoresById(id, (err, result)=>{
            if(err){
                res.status(500).json({error:err.message});
                return;
            }
            if(result.length===0){
                res.status(404).json({message:'Jugador no encontrado'});
                return;
            }
            res.status(200).json({data:result});
        });
    },

    postJugadores: [upload.single('imagen'), (req, res) => {
        const { nombre, edad, nacionalidad, equipo, posicion, goles, asistencias, altura, peso, titulos, valor } = req.body;

        const imagen = req.file ? req.file.buffer : null; // Procesar la imagen si existe
        jugadorModel.postJugadores(nombre, edad, nacionalidad, equipo, posicion, goles, asistencias, altura, peso, titulos, valor, imagen, (err, result) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.status(201).json({ message: 'Jugador creado correctamente', data: { idInsertado: result } });
        });
    }],

    putJugadores: [upload.single('imagen'), (req, res) => {
        const { id } = req.params;
        const { nombre, edad, nacionalidad, equipo, posicion, goles, asistencias, altura, peso, titulos, valor } = req.body;
        const imagen = req.file ? req.file.buffer : null; // Procesar la imagen si existe
        jugadorModel.putJugadores(id, nombre, edad, nacionalidad, equipo, posicion, goles, asistencias, altura, peso, titulos, valor, imagen, (err, result) => {
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
    }],

    deleteJugadores:(req, res)=>{
        const{id}=req.params;
        jugadorModel.deleteJugadores(id, (err, result)=>{
            if(err){
                res.status(500).json({error:err.message});
                return;
            }
            if(result.affectedRows ===0){
                res.status(404).json({message:'Jugador no encontrado'});
                return;
            }
            res.status(200).json({message:'Jugador eliminado correctamente'});
        })
    }

}