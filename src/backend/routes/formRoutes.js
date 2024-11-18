// formRoutes.js
import express from 'express';
import formController from '../controllers/formController.js';

const router = express.Router();

// Nueva ruta para verificar disponibilidad
router.get('/verificarDisponibilidad', formController.verificarDisponibilidad);

// Ruta para guardar datos y reservar fechas
router.post('/guardarDatosYReservarFechas', formController.guardarDatosYReservarFechas);

// Ruta para obtener todos los productos

// Ruta para actualizar un producto



export default router;