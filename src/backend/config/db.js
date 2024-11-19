// config/db.js
import mysql from 'mysql2';

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '', // deja en blanco si no tienes contraseña
  database: 'samaykiti' // reemplaza con el nombre de tu base de datos
});

connection.connect((err) => {
  if (err) {
    console.error('Error de conexión a MySQL:', err);
  } else {
    console.log('Conectado a la base de datos');
  }
});

export default connection; // Exporta la conexión usando export default