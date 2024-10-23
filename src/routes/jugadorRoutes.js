const express = require('express');

const router = express.Router();

const jugadorController = require('../controllers/jugadorController.js');

router.get('/',jugadorController.getJugadores);
router.get('/:id',jugadorController.getJugadoresById);
router.post('/',jugadorController.postJugadores);
router.put('/:id',jugadorController.putJugadores);
router.delete('/:id',jugadorController.deleteJugadores);

module.exports=router;