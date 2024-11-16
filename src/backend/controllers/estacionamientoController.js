import connection from '../config/db.js';

// Obtener todos los espacios de estacionamiento junto con la información del huésped
export const getAllSpots = (req, res) => {
  const query = `
    SELECT e.idEstacionamiento, e.idHuesped, e.estado, e.espacio,
           h.nombreH, h.apellidoH, h.marcamodeloH, h.patenteH
    FROM estacionamiento e
    LEFT JOIN huesped h ON e.idHuesped = h.idHuesped
    ORDER BY e.espacio ASC;
  `;
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error al obtener los datos:', err);
      return res.status(500).json({ error: 'Error al obtener los datos' });
    }

    // Si faltan espacios, añadir registros vacíos hasta llegar a 10
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

// Asociar un huésped con un espacio de estacionamiento
export const assignSpot = (req, res) => {
const { idEstacionamiento, idHuesped } = req.body;

const query = `
UPDATE estacionamiento 
SET idHuesped = ?, estado = 1
WHERE idEstacionamiento = ?;
`;

connection.query(query, [idHuesped, idEstacionamiento], (err) => {
if (err) {
  console.error('Error al asignar huésped:', err);
  return res.status(500).json({ error: 'Error al asignar huésped' });
}
res.json({ message: 'Espacio asignado correctamente' });
});
};