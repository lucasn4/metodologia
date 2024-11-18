import express from 'express';
import formController from '../controllers/formController.js';

const router = express.Router();

// Nueva ruta para verificar disponibilidad
router.get('/verificarDisponibilidad', formController.verificarDisponibilidad);

// Ruta para guardar datos y reservar fechas
router.post('/guardarDatosYReservarFechas', formController.guardarDatosYReservarFechas);

//  Eliminamos las rutas que dependen de crudstock.js
// router.get('/products', crudstock.obtenerProductos);
// router.post('/products', crudstock.agregarProducto);
// router.put('/products/:id', crudstock.actualizarProducto);
// router.delete('/products/:id', crudstock.eliminarProducto); 

export default router;