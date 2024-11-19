// formController.js
import connection from '../config/db.js';

const formController = {
  verificarDisponibilidad: (req, res) => {
    const { startDate, endDate } = req.query;
  
    if (!startDate || !endDate) {
      return res.status(400).json({ message: 'Fechas inválidas' });
    }
  
    const query = `
      SELECT fechasdis,habitacionesdis FROM fechas_disponibles
      WHERE fechasdis BETWEEN ? AND ? 
    `;
  
    connection.query(query, [startDate, endDate], (error, results) => {
      if (error) {
        console.error('Error al consultar la disponibilidad:', error);
        return res.status(500).json({ message: 'Error al verificar la disponibilidad' });
      }
  
      if (results.length === 0) {
        return res.status(404).json({ message: 'No hay disponibilidad para las fechas seleccionadas' });
      }
  
      res.status(200).json(results);
    });
  },
  guardarDatosYReservarFechas: (req, res) => {
    const { 
      nombreH, 
      apellidoH, 
      telefonoH, 
      emailH, 
      vehiculoH, 
      tipoH, 
      marcamodeloH, 
      colorH, 
      patenteH, 
      startDate, 
      endDate, 
      habitacionesReservadas,
      metodoPago  // Nuevo parámetro
    } = req.body;

    connection.beginTransaction((err) => {
      if (err) {
        return res.status(500).json({ message: 'Error al iniciar la transacción' });
      }

      // Insertar datos del huésped
      const queryHuesped = `
        INSERT INTO solicitudes (nombreH, apellidoH, telefonoH, emailH, vehiculoH, tipoH, marcamodeloH, colorH, patenteH) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      const valuesHuesped = [nombreH, apellidoH, telefonoH, emailH, vehiculoH, tipoH, marcamodeloH, colorH, patenteH];
      
      connection.query(queryHuesped, valuesHuesped, (error, solicitudResults) => {
        if (error) {
          return connection.rollback(() => {
            res.status(500).json({ message: 'Error al guardar los datos del huésped' });
          });
        }

        // Obtener el ID de la solicitud recién creada
        const idsolicitud = solicitudResults.insertId;

        // Insertar registro en la tabla pagos
        const queryPago = `
          INSERT INTO pagos (idsolicitud, estado, fecha_pago, tipo)
          VALUES (?, ?, ?, ?)
        `;
        const valuesPago = [
          idsolicitud,
          false, // estado inicial como no pagado
          new Date(), // fecha actual
          metodoPago
        ];

        connection.query(queryPago, valuesPago, (errorPago, pagosResults) => {
          if (errorPago) {
            return connection.rollback(() => {
              res.status(500).json({ message: 'Error al guardar los datos del pago' });
            });
          }

          // Actualizar habitaciones disponibles
          const queryFechas = `
            UPDATE fechas_disponibles 
            SET habitacionesdis = habitacionesdis - ? 
            WHERE fechasdis BETWEEN ? AND ? AND habitacionesdis >= ?
          `;
          
          connection.query(queryFechas, [habitacionesReservadas, startDate, endDate, habitacionesReservadas], (errorFechas, results) => {
            if (errorFechas || results.affectedRows < (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24) + 1) {
              return connection.rollback(() => {
                res.status(400).json({ message: 'Error al reservar fechas o disponibilidad insuficiente' });
              });
            }

            connection.commit((errCommit) => {
              if (errCommit) {
                return connection.rollback(() => {
                  res.status(500).json({ message: 'Error al finalizar la transacción' });
                });
              }
              res.status(200).json({ 
                message: 'Datos guardados con éxito',
                solicitudId: idsolicitud,
                pagoId: pagosResults.insertId
              });
            });
          });
        });
      });
    });
  }
};

export default formController;