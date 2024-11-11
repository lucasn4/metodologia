// config/db.js
import mysql from 'mysql2';

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // deja en blanco si no tienes contraseña
  database: 'samaykiti' // reemplaza con el nombre de tu base de datos
});

connection.connect((err) => {
  if (err) {
    console.error('Error de conexión a MySQL:', err);
  } else {
    console.log('Conexión a MySQL exitosa');
  }
});

export default connection; // Exporta la conexión usando export default