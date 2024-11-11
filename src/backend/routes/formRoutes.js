// routes/formRoutes.js
import express from 'express';
import formController from '../controllers/formController.js';

const router = express.Router();

// Ruta para guardar datos del formulario
router.post('/guardarDatos', formController.guardarDatos);

// Ruta para inicio de sesión de empleados
router.post('/login', formController.login);

router.post('/reservarFechas', formController.reservarFechas);

export default router;