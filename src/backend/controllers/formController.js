// controllers/formController.js
import connection from '../config/db.js';

const formController = {
  guardarDatos: (req, res) => {
    console.log('Datos recibidos:', req.body); // Agrega esta línea
    const { nombreH, apellidoH, telefonoH, emailH, vehiculoH, tipoH, marcamodeloH, colorH, patenteH } = req.body;

    console.log("Intentando guardar datos en la base de datos...");

    const query = 'INSERT INTO Huesped (nombreH, apellidoH, telefonoH, emailH, vehiculoH, tipoH, marcamodeloH, colorH, patenteH) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    connection.query(query, [nombreH, apellidoH, telefonoH, emailH, vehiculoH, tipoH, marcamodeloH, colorH, patenteH], (error, results) => {
      if (error) {
        console.error('Error al insertar los datos:', error);
        res.status(500).send('Error en el servidor');
      } else {
        res.status(200).json({ message: 'Datos guardados con éxito' });
      }
    });
  },

  login: (req, res) => {
    const { usuarioE, contraseñaE } = req.body;

    const query = 'SELECT * FROM Empleados WHERE usuarioE = ? AND contraseñaE = ?';
    connection.query(query, [usuarioE, contraseñaE], (error, results) => {
      if (error) {
        console.error('Error en la consulta de inicio de sesión:', error);
        res.status(500).send('Error en el servidor');
      } else if (results.length > 0) {
        res.status(200).json({ message: 'Inicio de sesión exitoso' });
      } else {
        res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
      }
    });
  },

  reservarFechas: (req, res) => {
    const { startDate, endDate } = req.body;

    // Lógica para reservar fechas en la base de datos
    const query = `
      UPDATE fechas_disponibles 
      SET habitacionesdis = habitacionesdis - 1 
      WHERE fechasdis BETWEEN ? AND ? AND habitacionesdis > 0
    `;
    connection.query(query, [startDate, endDate], (error, results) => {
      if (error) {
        console.error('Error al reservar fechas:', error);
        res.status(500).json({ message: 'Error en el servidor' });
      } else {
        res.status(200).json({ message: 'Fechas reservadas con éxito' });
      }
    });
  },
};

export default formController;