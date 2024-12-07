const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST, //'0elgy.h.filess.io',
  user: process.env.DB_USER, //'storeBikeDB_nearbypet',
  password: process.env.DB_PASSWORD, //'74be17f9d2e8a04de279b09b66d1535bc2814a32',
  database: process.env.DB_NAME //'storeBikeDB_nearbypet'
});

connection.connect((err) => {
  if (err) {
    console.error('Error de conexión: ' + err.stack);
    return;
  }
  console.log('Conectado a la base de datos con id ' + connection.threadId);
});

module.exports = connection;
