// config/db.js
import mysql from 'mysql2';

const connection = mysql.createConnection({
  host: 'sql10.freemysqlhosting.net',
  port: 3306,
  user: 'sql10744381',
  password: '8cYxfYQNEL', // deja en blanco si no tienes contraseña
  database: 'sql10744381' // reemplaza con el nombre de tu base de datos
});

connection.connect((err) => {
  if (err) {
    console.error('Error de conexión a MySQL:', err);
  } else {
    console.log('Conectado a la base de datos de FreeMySQLHosting.net');
  }
});

export default connection; // Exporta la conexión usando export default