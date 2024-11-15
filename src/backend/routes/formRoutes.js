// formRoutes.js
import express from 'express';
import formController from '../controllers/formController.js';
import crudstock from '../controllers/crudstock.js';

const router = express.Router();

// Nueva ruta para verificar disponibilidad
router.get('/verificarDisponibilidad', formController.verificarDisponibilidad);

// Ruta para guardar datos y reservar fechas
router.post('/guardarDatosYReservarFechas', formController.guardarDatosYReservarFechas);

// Ruta para obtener todos los productos
router.get('/products', crudstock.obtenerProductos);

// Ruta para agregar un nuevo producto
router.post('/products', crudstock.agregarProducto);

// Ruta para actualizar un producto
router.put('/products/:id', crudstock.actualizarProducto);

// Ruta para eliminar un producto
router.delete('/products/:id', crudstock.eliminarProducto);

export default router;