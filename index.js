const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jugadorRoutes = require('./src/routes/jugadorRoutes.js')
const clubRoutes = require('./src/routes/clubRoutes.js');

const app = express();
const port = 3302;

const corsOptions = {
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204
};
app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use('/api/jugadores', jugadorRoutes);
app.use('/api/clubs', clubRoutes);

app.listen(port, ()=>{
    console.log('Servidor iniciado en el http://localhost:' + port);
});