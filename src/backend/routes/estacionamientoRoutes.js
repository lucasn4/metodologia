import express from 'express';
import {  getEstacionamiento } from '../controllers/estacionamientoController.js';
import {  gethabitacion } from '../controllers/estacionamientoController.js';

const router = express.Router();

// Ruta para obtener todos los espacios de estacionamiento
router.get('/estacionamiento', getEstacionamiento);



// Ruta para obtener todos los espacios de estacionamiento
router.get('/habitaciones', gethabitacion);

// Ruta para actualizar los espacios de estacionamiento
//router.put('/habitaciones/actualizar', updateHabitacion);


export default router;
