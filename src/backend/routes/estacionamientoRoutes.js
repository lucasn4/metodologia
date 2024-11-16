import express from 'express';
import { getAllSpots, getHuespedesConVehiculos, assignSpot } from '../controllers/estacionamientoController.js';

const router = express.Router();

router.get('/estacionamiento', getAllSpots);
router.get('/huespedes', getHuespedesConVehiculos);


export default router;