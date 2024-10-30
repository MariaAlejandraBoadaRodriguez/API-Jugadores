// src/routes/clubRoutes.js
const express = require('express');
const router = express.Router();
const clubController = require('../controllers/clubController');

router.get('/', clubController.getAllClubs);

module.exports = router;
