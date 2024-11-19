// formController.js
import connection from '../config/db.js';

const formController = {
  // Obtener todos los productos
  obtenerProductos: (req, res) => {
    const query = 'SELECT * FROM productos';  // Asegúrate de que la tabla de productos tenga el nombre adecuado
    connection.query(query, (error, results) => {
      if (error) {
        return res.status(500).json({ message: 'Error al obtener productos' });
      }
      res.status(200).json(results);
    });
  },

  // Agregar un nuevo producto
  agregarProducto: (req, res) => {
    const { Producto, TipodeProducto, Cantidad } = req.body;
    connection.beginTransaction((err) => {
      if (err) {
        return res.status(500).json({ message: 'Error al iniciar la transacción' });
      }
    const query = `
      INSERT INTO productos (Producto, TipodeProducto, Cantidad) 
      VALUES (?, ?, ?)
    `;
    const values = [Producto, TipodeProducto, Cantidad];

    connection.query(query, values, (error, results) => {
      if (error) {
        return connection.rollback(() => {
          res.status(500).json({ message: 'Error al guardar los datos del huésped' });
        });
      }
      connection.commit((err) => {
        if (err) {
          return connection.rollback(() => {
            res.status(500).json({ message: 'Error al finalizar la transacción' });
          });
        }
        res.status(200).json({ message: 'Datos y fechas guardados con éxito' });
      });
  })})},

  // Actualizar un producto
  actualizarProducto: (req, res) => {
    const { id } = req.params;
    const { Producto, TipodeProducto, Cantidad } = req.body;

    const query = `
      UPDATE productos 
      SET Producto = ?, TipodeProducto = ?, Cantidad = ? 
      WHERE IdProductoPrimaria = ?
    `;
    const values = [Producto, TipodeProducto, Cantidad, id];

    connection.query(query, values, (error, results) => {
      if (error) {
        return res.status(500).json({ message: 'Error al actualizar el producto' });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: 'Producto no encontrado' });
      }
      res.status(200).json({
        IdProductoPrimaria: id,
        Producto,
        TipodeProducto,
        Cantidad
      });
    });
  },

  // Eliminar un producto
  eliminarProducto: (req, res) => {
    const { id } = req.params;

    const query = 'DELETE FROM productos WHERE IdProductoPrimaria = ?';
    connection.query(query, [id], (error, results) => {
      if (error) {
        return res.status(500).json({ message: 'Error al eliminar el producto' });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: 'Producto no encontrado' });
      }
      res.status(200).json({ message: 'Producto eliminado con éxito' });
    });
  },
};

export default formController;
