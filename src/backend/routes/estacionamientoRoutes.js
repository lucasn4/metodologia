import express from 'express';
import { getAllSpots, getHuespedesConVehiculos, assignSpot } from '../controllers/estacionamientoController.js';

const router = express.Router();

router.get('/spots', getAllSpots);
router.get('/huespedes', getHuespedesConVehiculos);
router.put('/spots/:id', assignSpot);

export default router;
