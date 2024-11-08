const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
  host: '0elgy.h.filess.io',//process.env.DB_HOST,
  user: 'storeBikeDB_nearbypet', //process.env.DB_USER,
  password: '74be17f9d2e8a04de279b09b66d1535bc2814a32', //process.env.DB_PASSWORD,
  database: 'storeBikeDB_nearbypet'//process.env.DB_NAME,
});

connection.connect((err) => {
  if (err) {
    console.error('Error de conexión: ' + err.stack);
    return;
  }
  console.log('Conectado a la base de datos con id ' + connection.threadId);
});

module.exports = connection;
