import connection from '../config/db.js';

// Obtener todos los espacios de estacionamiento junto con la información del huésped
export const getAllSpots = (req, res) => {
  const query = `
    SELECT e.idEstacionamiento, e.idHuesped, e.estado, e.espacio,
           e.nombreH, e.apellidoH, e.marcamodeloH, e.patenteH
    FROM estacionamiento e
    ORDER BY e.espacio ASC;
  `;
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error al obtener los datos:', err);
      return res.status(500).json({ error: 'Error al obtener los datos' });
    }

    // Asegurarse de que haya exactamente 10 espacios
    const totalSpots = 10;
    for (let i = results.length + 1; i <= totalSpots; i++) {
      results.push({
        idEstacionamiento: null,
        idHuesped: null,
        estado: 0,
        espacio: i,
        nombreH: null,
        apellidoH: null,
        marcamodeloH: null,
        patenteH: null,
      });
    }
    res.json(results);
  });
};

// Obtener huéspedes que tienen vehículos
export const getHuespedesConVehiculos = (req, res) => {
  const query = `
    SELECT idHuesped, nombreH, apellidoH, marcamodeloH, patenteH
    FROM huesped
    WHERE patenteH IS NOT NULL AND marcamodeloH IS NOT NULL;
  `;
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error al obtener huéspedes:', err);
      return res.status(500).json({ error: 'Error al obtener huéspedes' });
    }
    res.json(results);
  });
};

// Asociar un huésped con un espacio de estacionamiento y copiar la información del vehículo
export const assignSpot = (req, res) => {
  const { idEstacionamiento, idHuesped } = req.body;

  // 1. Obtener información del huésped
  const queryHuesped = `
    SELECT nombreH, apellidoH, marcamodeloH, patenteH
    FROM huesped
    WHERE idHuesped = ?;
  `;

  connection.query(queryHuesped, [idHuesped], (err, huespedResults) => {
    if (err) {
      console.error('Error al obtener datos del huésped:', err);
      return res.status(500).json({ error: 'Error al obtener datos del huésped' });
    }

    if (huespedResults.length === 0) {
      return res.status(404).json({ error: 'Huésped no encontrado' });
    }

    const { nombreH, apellidoH, marcamodeloH, patenteH } = huespedResults[0];

    // 2. Actualizar la tabla estacionamiento con los datos del huésped y su vehículo
    const queryUpdate = `
      UPDATE estacionamiento 
      SET idHuesped = ?, estado = 1, 
          nombreH = ?, apellidoH = ?, marcamodeloH = ?, patenteH = ?
      WHERE idEstacionamiento = ?;
    `;

    connection.query(
      queryUpdate,
      [idHuesped, nombreH, apellidoH, marcamodeloH, patenteH, idEstacionamiento],
      (err) => {
        if (err) {
          console.error('Error al asignar huésped al espacio:', err);
          return res.status(500).json({ error: 'Error al asignar huésped al espacio' });
        }
        res.json({ message: 'Espacio asignado correctamente' });
      }
    );
  });
};
