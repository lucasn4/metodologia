import express from 'express';
import { updateEstacionamiento, getEstacionamiento } from '../controllers/estacionamientoController.js';

const router = express.Router();

// Ruta para obtener todos los espacios de estacionamiento
router.get('/estacionamiento', getEstacionamiento);

// Ruta para actualizar los espacios de estacionamiento
router.put('/estacionamiento/actualizar', updateEstacionamiento);

export default router;
