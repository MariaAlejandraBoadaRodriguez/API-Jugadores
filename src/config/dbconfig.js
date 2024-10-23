const mysql = require('mysql2');

const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'12345',
    database:'album',
    port: 3306
});

db.connect((err) =>{
    if(err){
        throw err;
    }
    console.log('Conexión a MSQL exitosa');
})

module.exports = db;