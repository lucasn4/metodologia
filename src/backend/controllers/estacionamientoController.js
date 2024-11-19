import connection from '../config/db.js';

// Controlador para obtener todos los espacios de estacionamiento
export const getEstacionamiento = (req, res) => {
  const query = `SELECT 
  estacionamiento10filas.idEstacionamiento,
  estacionamiento10filas.idHuesped,
  huesped.nombreH,
  huesped.apellidoH,
  huesped.marcamodeloH,
  huesped.patenteH
FROM 
  estacionamiento10filas
LEFT JOIN 
  huesped
ON 
  estacionamiento10filas.idHuesped = huesped.idHuesped`;

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error al obtener los espacios de estacionamiento:', err);
      return res.status(500).json({ error: 'Error al obtener los datos' });
    }
    res.json(results);
  });
};

// Controlador para actualizar los espacios de estacionamiento
{/*export const updateEstacionamiento = (req, res) => {
  // 1. Obtener huéspedes que tienen vehículo
  const queryHuesped = `
  SELECT idHuesped, nombreH, apellidoH, marcamodeloH, patenteH
    FROM huesped
    WHERE patenteH IS NOT NULL AND marcamodeloH IS NOT NULL
    LIMIT 10;
  `;

  console.log('Ejecutando consulta para obtener huéspedes con vehículo...');

  connection.query(queryHuesped, (err, huespedResults) => {
    if (err) {
      console.error('Error al obtener huéspedes con vehículos:', err);
      return res.status(500).json({ error: 'Error al obtener huéspedes con vehículos' });
    }

    console.log('Huéspedes obtenidos:', huespedResults);

    // Si no hay huéspedes con vehículo, limpiar la tabla y terminar el proceso
    if (huespedResults.length === 0) {
      console.log('No se encontraron huéspedes con vehículo.');
      return res.json({ message: 'No hay huéspedes con vehículo para actualizar.' });
    }

    // 2. Limpiar la tabla `estacionamiento10filas`
    const clearEstacionamientoQuery = `
      UPDATE estacionamiento10filas 
      SET idHuesped = NULL, nombreH = NULL, apellidoH = NULL, marcamodeloH = NULL, patenteH = NULL;
    `;

    console.log('Limpiando la tabla estacionamiento10filas...');

    connection.query(clearEstacionamientoQuery, (err) => {
      if (err) {
        console.error('Error al limpiar la tabla estacionamiento:', err);
        return res.status(500).json({ error: 'Error al limpiar la tabla estacionamiento' });
      }

      console.log('Tabla estacionamiento10filas limpiada correctamente.');

      // 3. Insertar o actualizar los datos obtenidos en `estacionamiento10filas`
      const promises = huespedResults.map((huesped, index) => {
        const { id, nombreH, apellidoH, marcamodeloH, patenteH } = huesped;
        const updateQuery = `
          UPDATE estacionamiento10filas 
          SET idHuesped = ?, nombreH = ?, apellidoH = ?, marcamodeloH = ?, patenteH = ?
          WHERE idEstacionamiento = ?;
        `;

        const espacioId = index + 1; // Los espacios van del 1 al 10

        console.log(`Actualizando fila ${espacioId} con datos del huésped:`, huesped);

        return new Promise((resolve, reject) => {
          connection.query(
            updateQuery,
            [id, nombreH, apellidoH, marcamodeloH, patenteH, espacioId],
            (err, result) => {
              if (err) {
                console.error(`Error al asignar espacio en la fila ${espacioId}:`, err);
                reject(err);
              } else {
                console.log(`Fila ${espacioId} actualizada correctamente.`, result);
                resolve();
              }
            }
          );
        });
      });

      Promise.all(promises)
        .then(() => {
          console.log('Todos los espacios actualizados correctamente.');
          res.json({ message: 'Datos actualizados correctamente en estacionamiento' });
        })
        .catch((error) => {
          console.error('Error al actualizar la tabla estacionamiento:', error);
          res.status(500).json({ error: 'Error al asignar datos en estacionamiento' });
        });
    });
  });
};*/}

///////////////// HUESPEEEED /////////////////////

export const gethabitacion = (req, res) => {
  const query = `SELECT 
    habitaciones.idhabitaciones,
    habitaciones.habdisponibles,
    habitaciones.idHuesped,
    huesped.nombreH,
    huesped.apellidoH,
    huesped.telefonoH,
    huesped.vehiculoH
FROM 
    habitaciones
LEFT JOIN 
    huesped
ON 
    habitaciones.idHuesped = huesped.idHuesped`;

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error al obtener los espacios de habitaciones:', err);
      return res.status(500).json({ error: 'Error al obtener los datos' });
    }
    res.json(results);
  });
};

// Controlador para actualizar los espacios de estacionamiento
{/*export const updateHabitacion = (req, res) => {
  const queryHuesped = `SELECT 
    habitaciones.idhabitaciones,
    habitaciones.habdisponibles,
    habitaciones.idHuesped,
    huesped.nombreH,
    huesped.apellidoH,
    huesped.telefonoH,
    huesped.vehiculoH
FROM 
    habitaciones
LEFT JOIN 
    huesped
ON 
    habitaciones.idHuesped = huesped.idHuesped
  `;

  console.log('Ejecutando consulta para obtener huéspedes...');

  connection.query(queryHuesped, (err, huespedResults) => {
    if (err) {
      console.error('Error al obtener habitaciones:', err);
      return res.status(500).json({ error: 'Error al obtener habitaciones' });
    }

    console.log('Habitaciones:', huespedResults);

    if (huespedResults.length === 0) {
      console.log('No se encontraron habitaciones.');
      return res.json({ message: 'No hay habitaciones para actualizar.' });
    }

    const clearEstacionamientoQuery = `
      UPDATE habitaciones 
      SET idhabitaciones = NULL, habdisponibles = NULL, idHuesped = NULL;
    `;

    console.log('Limpiando la tabla habitaciones...');

    connection.query(clearEstacionamientoQuery, (err) => {
      if (err) {
        console.error('Error al limpiar la tabla habitaciones:', err);
        return res.status(500).json({ error: 'Error al limpiar la tabla habitaciones' });
      }

      console.log('Tabla habitaciones limpiada correctamente.');

      // 3. Insertar o actualizar los datos obtenidos en `estacionamiento10filas`
      const promises = huespedResults.map((huesped, index) => {
        const { idhabitaciones, habdisponibles, idHuesped,nombreH, } = huesped;
        const updateQuery = `
          UPDATE estacionamiento10filas 
          SET idHuesped = ?, nombreH = ?, apellidoH = ?, marcamodeloH = ?, patenteH = ?
          WHERE idEstacionamiento = ?;
        `;

        const espacioId = index + 1; // Los espacios van del 1 al 10

        console.log(`Actualizando fila ${espacioId} con datos del huésped:`, huesped);

        return new Promise((resolve, reject) => {
          connection.query(
            updateQuery,
            [id, nombreH, apellidoH, marcamodeloH, patenteH, espacioId],
            (err, result) => {
              if (err) {
                console.error(`Error al asignar espacio en la fila ${espacioId}:`, err);
                reject(err);
              } else {
                console.log(`Fila ${espacioId} actualizada correctamente.`, result);
                resolve();
              }
            }
          );
        });
      });

      Promise.all(promises)
        .then(() => {
          console.log('Todos los espacios actualizados correctamente.');
          res.json({ message: 'Datos actualizados correctamente en estacionamiento' });
        })
        .catch((error) => {
          console.error('Error al actualizar la tabla estacionamiento:', error);
          res.status(500).json({ error: 'Error al asignar datos en estacionamiento' });
        });
    });
  });
};*/}