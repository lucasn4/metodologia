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
      nhabitaciones,
      metodoPago
    } = req.body;
    console.log(startDate, endDate, nhabitaciones);

    connection.beginTransaction((err) => {
      if (err) {
        return res.status(500).json({ message: 'Error al iniciar la transacción' });
      }

      // Insertar datos del huésped en solicitudes
      const queryHuesped = `
        INSERT INTO solicitudes (nombreH, apellidoH, telefonoH, emailH, vehiculoH, tipoH, marcamodeloH, colorH, patenteH, nhabitaciones) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      const valuesHuesped = [nombreH, apellidoH, telefonoH, emailH, vehiculoH, tipoH, marcamodeloH, colorH, patenteH, nhabitaciones];
      connection.query(queryHuesped, valuesHuesped, (error, solicitudResults) => {
        if (error) {
          return connection.rollback(() => {
            res.status(500).json({ message: 'Error al guardar los datos del huésped' });
          });
        }

        const idsolicitud = solicitudResults.insertId;

        // Insertar datos en la tabla solicitudes2
        const queryHuesped2 = `
          INSERT INTO solicitudes2 (nombreH, apellidoH, telefonoH, emailH, vehiculoH, tipoH, marcamodeloH, colorH, patenteH, nhabitaciones) 
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        connection.query(queryHuesped2, valuesHuesped, (errorHuesped2,results) => {
          if (errorHuesped2) {
            return connection.rollback(() => {
              res.status(500).json({ message: 'Error al guardar los datos en solicitudes2' });
            });
          }
          const idsolicitudes2 = results.insertId;
          // Insertar datos del pago
          const queryPago = `
            INSERT INTO pagos (idsolicitudes, estado, fecha_pago, tipo)
            VALUES (?, ?, ?, ?)
          `;
          const valuesPago = [
            idsolicitudes2,
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
            connection.query(queryFechas, [nhabitaciones, startDate, endDate, nhabitaciones], (error, results) => {
              if (error || results.affectedRows < (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24) + 1) {
                return connection.rollback(() => {
                  res.status(400).json({ message: 'Error al reservar fechas o disponibilidad insuficiente' });
                });
              }

              connection.commit((err) => {
                if (err) {
                  return connection.rollback(() => {
                    res.status(500).json({ message: 'Error al finalizar la transacción' });
                  });
                }
                res.status(200).json({ 
                  message: 'Datos y fechas guardados con éxito', 
                  solicitudId: idsolicitud, 
                  pagoId: pagosResults.insertId 
                });
              });
            });
          });
        });
      });
    });
  },

  //////////////////////////          SOLICITUDES             //////////////////////////////
  contarsolicitudes: (req, res) => {
    const query = "SELECT COUNT(*) as total FROM solicitudes";
  
    connection.query(query, (error, results) => {
      if (error) {
        console.error("Error al contar empleados:", error);
        return res.status(500).json({ error: "Error al contar solicitudes" });
      }
  
      res.status(200).json({ totalSolicitudes: results[0].total });
    });
  },

  cargarsolicitudes: (req, res) => {
    const query = `
        SELECT idsolicitudes, nombreH, apellidoH, telefonoH, emailH, vehiculoH, tipoH, marcamodeloH, colorH, patenteH , nhabitaciones
        FROM solicitudes
    `;
    
    connection.query(query, (error, results) => {
        if (error) {
            console.error('Error al obtener las solicitudes:', error);
            return res.status(500).json({ message: 'Error al obtener solicitudes' });
        }
        res.status(200).json(results);
    });
  },

  enviarahuesped: (req, res) => {
    const {
        nombreH, apellidoH, telefonoH, emailH, vehiculoH, tipoH, marcamodeloH, colorH, patenteH, nhabitaciones,habitacionSeleccionada} = req.body;
    console.log("holi");
    console.log(habitacionSeleccionada);
    console.log("n ",nombreH, "a ",apellidoH, "t ",telefonoH, "e ",emailH, "v ",vehiculoH, "t ", tipoH, "m ", marcamodeloH, "c ", colorH, "p ", patenteH, "n ", habitacionSeleccionada);
    connection.beginTransaction((err) => {
        if (err) {
            return res.status(500).json({ message: 'Error al iniciar la transacción' });
        }

        // Paso 1: Insertar datos en la tabla Huesped
        const queryHuesped = `
            INSERT INTO huesped (nombreH, apellidoH, telefonoH, emailH, vehiculoH, tipoH, marcamodeloH, colorH, patenteH) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const valuesHuesped = [nombreH, apellidoH, telefonoH, emailH, vehiculoH, tipoH, marcamodeloH, colorH, patenteH];
        connection.query(queryHuesped, valuesHuesped, (error, results) => {
            if (error) {
                return connection.rollback(() => {
                    res.status(500).json({ message: 'Error al guardar los datos del huésped' });
                });
            }

            const idHuesped = results.insertId; // Obtener el ID del huésped recién insertado

            // Paso 2: Asignar habitaciones al huésped
            const queryHabitaciones = `
                UPDATE habitaciones 
                SET habdisponibles = 0, idhuesped = ? 
                WHERE idhabitaciones IN (?)
            `;
            connection.query(queryHabitaciones, [idHuesped, habitacionSeleccionada], (error, results) => {
                if (error || results.affectedRows !== habitacionSeleccionada.length) {
                    return connection.rollback(() => {
                        res.status(400).json({ message: 'Error al asignar habitaciones o no todas están disponibles' });
                    });
                }
            // Paso 3: Asignar estacionamiento al huésped
            const queryestacionamiento = `
                UPDATE estacionamiento10filas 
                SET idHuesped = ? 
                WHERE idestacionamiento IN (?)
            `;
            
            if(vehiculoH === 1){
            connection.query(queryestacionamiento, [idHuesped, habitacionSeleccionada], (error, results) => {
                if (error || results.affectedRows !== habitacionSeleccionada.length) {
                    return connection.rollback(() => {
                        res.status(400).json({ message: 'Error al asignar habitaciones o no todas están disponibles' });
                    });
                }
            

                // Paso 3: Confirmar la transacción
                connection.commit((err) => {
                    if (err) {
                        return connection.rollback(() => {
                            res.status(500).json({ message: 'Error al finalizar la transacción' });
                        });
                    }
                    res.status(200).json({ message: 'Datos y habitaciones guardados con éxito' });
                });
              });}
            });
        });
    });
},
borrarsolicitud: async (req, res) => {
  const { idsolicitudes } = req.params; // Obtiene el id del empleado de los parámetros de la solicitud

  try {
    const query = `
      DELETE FROM solicitudes WHERE idsolicitudes = ?
    `;
    
    // Usamos query con promesa para usar async/await
    connection.query(query, [idsolicitudes], (error, results) => {
      if (error) {
        console.error('Error en la eliminación:', error);
        return res.status(500).json({ message: 'Error en la eliminación del empleado' });
      }

      if (results.affectedRows > 0) {
        res.status(200).json({ message: 'Empleado eliminado correctamente' });
      } else {
        res.status(404).json({ message: 'Empleado no encontrado' });
      }
    });
  } catch (error) {
    console.error('Error en la eliminación:', error);
    res.status(500).json({ message: 'Error en la eliminación del empleado' });
  }
},


  ////////////////////////          EMPLEADOS             //////////////////////////////
  guardarempleados: (req, res) => {
    const { nombreE, apellidoE, puestoE, fechaAltaE } = req.body;

    connection.beginTransaction((err) => {
        if (err) {
            return res.status(500).json({ message: 'Error al iniciar la transacción' });
        }

        // Insertar datos en la tabla empleados
        const queryEmp = `
            INSERT INTO empleados (nombreE, apellidoE, puestoE, fechaAltaE) 
            VALUES (?, ?, ?, ?)
        `;
        const valuesEmp = [nombreE, apellidoE, puestoE, fechaAltaE];
        connection.query(queryEmp, valuesEmp, (error, results) => {
            if (error) {
                return connection.rollback(() => {
                    res.status(500).json({ message: 'Error al guardar los datos del empleado' });
                });
            }

            connection.commit((err) => {
                if (err) {
                    return connection.rollback(() => {
                        res.status(500).json({ message: 'Error al finalizar la transacción' });
                    });
                }
                res.status(200).json({ message: 'Datos guardados con éxito' });
            });
        });
    });
},

cargarempleados: (req, res) => {
  const query = `
      SELECT idEmpleado, nombreE, apellidoE, puestoE, fechaAltaE 
      FROM empleados
  `;
  
  connection.query(query, (error, results) => {
      if (error) {
          console.error('Error al obtener los empleados:', error);
          return res.status(500).json({ message: 'Error al obtener empleados' });
      }
      res.status(200).json(results);
  });
},

buscarempleados: (req, res) => {
  const { idEmpleado } = req.params; // Recibimos el idEmpleado desde los parámetros de la URL
  const query = `
      SELECT idEmpleado, nombreE, apellidoE, puestoE, fechaAltaE 
      FROM empleados
      WHERE idEmpleado = ?`; // Filtramos por el idEmpleado
  
  connection.query(query, [idEmpleado], (error, results) => {
      if (error) {
          console.error('Error al obtener los empleados:', error);
          return res.status(500).json({ message: 'Error al obtener el empleado' });
      }
      if (results.length === 0) {
          return res.status(404).json({ message: 'Empleado no encontrado' });
      }
      res.status(200).json(results); // Enviamos solo un empleado (el primero que coincide)
  });
},
actualizarempleado:  async (req, res) => {
  const { idEmpleado } = req.params;
  const { nombreE, apellidoE, puestoE, fechaAltaE } = req.body;

  try {
    const query = `
      UPDATE empleados
      SET nombreE = ?, apellidoE = ?, puestoE = ?, fechaAltaE = ?
      WHERE idEmpleado = ?
    `;
    
      // Usamos query con promesa para usar async/await
      connection.query(query, [nombreE, apellidoE, puestoE, fechaAltaE, idEmpleado], (error, results) => {
        if (error) {
          console.error('Error en la actualización:', error);
          return res.status(500).json({ message: 'Error en la actualización del empleado' });
        }
        
        if (results.affectedRows > 0) {
          res.status(200).json({ message: 'Empleado actualizado correctamente' });
        } else {
          res.status(404).json({ message: 'Empleado no encontrado' });
        }
      });
    } catch (error) {
      console.error('Error en la actualización:', error);
      res.status(500).json({ message: 'Error en la actualización del empleado' });
    }
},
borrarempleado: async (req, res) => {
  const { idEmpleado } = req.params; // Obtiene el id del empleado de los parámetros de la solicitud

  try {
    const query = `
      DELETE FROM empleados WHERE idEmpleado = ?
    `;
    
    // Usamos query con promesa para usar async/await
    connection.query(query, [idEmpleado], (error, results) => {
      if (error) {
        console.error('Error en la eliminación:', error);
        return res.status(500).json({ message: 'Error en la eliminación del empleado' });
      }

      if (results.affectedRows > 0) {
        res.status(200).json({ message: 'Empleado eliminado correctamente' });
      } else {
        res.status(404).json({ message: 'Empleado no encontrado' });
      }
    });
  } catch (error) {
    console.error('Error en la eliminación:', error);
    res.status(500).json({ message: 'Error en la eliminación del empleado' });
  }
},
// Función para contar los empleados
contarempleados: (req, res) => {
  const query = "SELECT COUNT(*) as total FROM empleados";

  connection.query(query, (error, results) => {
    if (error) {
      console.error("Error al contar empleados:", error);
      return res.status(500).json({ error: "Error al contar empleados" });
    }

    res.status(200).json({ totalEmpleados: results[0].total });
  });
},

  ////////////////////////          STOCK             //////////////////////////////
  guardarproducto: (req, res) => {
    const { Producto, TipodeProducto, Cantidad } = req.body;

    connection.beginTransaction((err) => {
        if (err) {
            return res.status(500).json({ message: 'Error al iniciar la transacción' });
        }

        // Insertar datos en la tabla empleados
        const queryEmp = `
            INSERT INTO stock (Producto, TipodeProducto, Cantidad) 
            VALUES (?, ?, ?)
        `;
        const valuesEmp = [Producto, TipodeProducto, Cantidad];
        connection.query(queryEmp, valuesEmp, (error, results) => {
            if (error) {
                return connection.rollback(() => {
                    res.status(500).json({ message: 'Error al guardar los datos de producto' });
                });
            }

            connection.commit((err) => {
                if (err) {
                    return connection.rollback(() => {
                        res.status(500).json({ message: 'Error al finalizar la transacción' });
                    });
                }
                res.status(200).json({ message: 'Datos guardados con éxito' });
            });
        });
    });
},

cargarproducto: (req, res) => {
  const query = `
      SELECT idProducto, Producto, TipodeProducto, Cantidad
      FROM stock
  `;
  
  connection.query(query, (error, results) => {
      if (error) {
          console.error('Error al obtener los productos:', error);
          return res.status(500).json({ message: 'Error al obtener productos' });
      }
      res.status(200).json(results);
  });
},

buscarproducto: (req, res) => {
  const { idProducto } = req.params; // Recibimos el idEmpleado desde los parámetros de la URL
  const query = `
      SELECT idProducto, Producto, TipodeProducto, Cantidad
      FROM stock
      WHERE idProducto = ?`; // Filtramos por el idEmpleado
  
  connection.query(query, [idProducto], (error, results) => {
      if (error) {
          console.error('Error al obtener los productos:', error);
          return res.status(500).json({ message: 'Error al obtener el producto' });
      }
      if (results.length === 0) {
          return res.status(404).json({ message: 'Producto no encontrado' });
      }
      res.status(200).json(results); // Enviamos solo un producto (el primero que coincide)
  });
},
actualizarproducto:  async (req, res) => {
  const { idProducto } = req.params;
  const { Producto, TipodeProducto, Cantidad } = req.body;

  try {
    const query = `
      UPDATE stock
      SET Producto = ?, TipodeProducto = ?, Cantidad = ?
      WHERE idProducto = ?
    `;
    
      // Usamos query con promesa para usar async/await
      connection.query(query, [Producto, TipodeProducto, Cantidad, idProducto], (error, results) => {
        if (error) {
          console.error('Error en la actualización:', error);
          return res.status(500).json({ message: 'Error en la actualización del producto' });
        }
        
        if (results.affectedRows > 0) {
          res.status(200).json({ message: 'Producto actualizado correctamente' });
        } else {
          res.status(404).json({ message: 'Producto no encontrado' });
        }
      });
    } catch (error) {
      console.error('Error en la actualización:', error);
      res.status(500).json({ message: 'Error en la actualización del producto' });
    }
},
borrarproducto: async (req, res) => {
  const { idProducto } = req.params; // Obtiene el id del producto de los parámetros de la solicitud

  try {
    const query = `
      DELETE FROM stock WHERE idProducto = ?
    `;
    
    // Usamos query con promesa para usar async/await
    connection.query(query, [idProducto], (error, results) => {
      if (error) {
        console.error('Error en la eliminación:', error);
        return res.status(500).json({ message: 'Error en la eliminación del producto' });
      }

      if (results.affectedRows > 0) {
        res.status(200).json({ message: 'Producto eliminado correctamente' });
      } else {
        res.status(404).json({ message: 'Producto no encontrado' });
      }
    });
  } catch (error) {
    console.error('Error en la eliminación:', error);
    res.status(500).json({ message: 'Error en la eliminación del producto' });
  }
},
// Función para contar los productos
contarproducto: (req, res) => {
  const query = "SELECT COUNT(*) as total FROM stock";

  connection.query(query, (error, results) => {
    if (error) {
      console.error("Error al contar productos:", error);
      return res.status(500).json({ error: "Error al contar productos" });
    }

    res.status(200).json({ totalProductos: results[0].total });
  });
},

//////////////////// Estacionamiento ///////////////////////
contarestacionamiento: (req, res) => {
  const query = "SELECT COUNT(*) as total FROM estacionamiento10filas WHERE idHuesped IS NOT NULL";

  connection.query(query, (error, results) => {
    if (error) {
      console.error("Error al contar vehiculos estacionados:", error);
      return res.status(500).json({ error: "Error al contar vehiculos estacionados" });
    }

    res.status(200).json({ totalestacionamiento: results[0].total });
  });
},

//////////////////// Huesped ///////////////////////

cargarhuesped: (req, res) => {
  const query = `
      SELECT idHuesped, nombreH, apellidoH, telefonoH, emailH, vehiculoH, tipoH, marcamodeloH, colorH, patenteH
      FROM huesped
  `;
  
  connection.query(query, (error, results) => {
      if (error) {
          console.error('Error al obtener las huesped:', error);
          return res.status(500).json({ message: 'Error al obtener huesped' });
      }
      res.status(200).json(results);
  });
},
contarhuesped: (req, res) => {
  const query = "SELECT COUNT(*) as total FROM huesped";

  connection.query(query, (error, results) => {
    if (error) {
      console.error("Error al contar huespedes:", error);
      return res.status(500).json({ error: "Error al contar huespedes" });
    }

    res.status(200).json({ totalhuespedes: results[0].total });
  });
},
buscarhuesped: (req, res) => {
  const { idHuesped } = req.params; // Recibimos el idEmpleado desde los parámetros de la URL
  const query = `
      SELECT idHuesped, nombreH, apellidoH, telefonoH, emailH, vehiculoH, tipoH, marcamodeloH, colorH, patenteH 
      FROM huesped
      WHERE idHuesped = ?`; // Filtramos por el idEmpleado
  
  connection.query(query, [idHuesped], (error, results) => {
      if (error) {
          console.error('Error al obtener los huespedes:', error);
          return res.status(500).json({ message: 'Error al obtener el huesped' });
      }
      if (results.length === 0) {
          return res.status(404).json({ message: 'Huesped no encontrado' });
      }
      res.status(200).json(results); // Enviamos solo un huesped (el primero que coincide)
  });
},
borrarhuesped: async (req, res) => {
  const { idHuesped } = req.params; // Obtiene el id del producto de los parámetros de la solicitud

  try {
    const query = `
      DELETE FROM huesped WHERE idHuesped = ?
    `;
    
    // Usamos query con promesa para usar async/await
    connection.query(query, [idHuesped], (error, results) => {
      if (error) {
        console.error('Error en la eliminación:', error);
        return res.status(500).json({ message: 'Error en la eliminación del huesped' });
      }

      if (results.affectedRows > 0) {
        res.status(200).json({ message: 'Huesped eliminado correctamente' });
      } else {
        res.status(404).json({ message: 'huesped no encontrado' });
      }
    });
  } catch (error) {
    console.error('Error en la eliminación:', error);
    res.status(500).json({ message: 'Error en la eliminación del huesped' });
  }
}
};




export default formController;
