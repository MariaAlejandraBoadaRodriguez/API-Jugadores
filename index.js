const express = require('express');

const bodyParser = require('body-parser');

const jugadorRoutes = require('./src/routes/jugadorRoutes.js')

const app = express();
const port = 3302;

app.use(bodyParser.json());

app.use('/api/jugadores', jugadorRoutes);

app.listen(port, ()=>{
    console.log('Servidor iniciado en el http://localhost:' + port);
});