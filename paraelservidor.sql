


--tabla del estacionamiento

CREATE TABLE `estacionamiento` (
  `idEstacionamiento` INT NOT NULL AUTO_INCREMENT,
  `idHuesped` INT NOT NULL,
  `patenteH` VARCHAR(10) NOT NULL,
  `marcamodeloH` VARCHAR(30) NOT NULL,
  `estado` INT NOT NULL,
  `espacio` INT NOT NULL,
  PRIMARY KEY (`idEstacionamiento`),
  FOREIGN KEY (`idHuesped`) REFERENCES `huesped`(`idHuesped`),
  FOREIGN KEY (`patenteH`) REFERENCES `huesped`(`patenteH`),
  FOREIGN KEY (`marcamodeloH`) REFERENCES `huesped`(`marcamodeloH`)
) ENGINE=InnoDB;


-- deberia solo usar el idEstacionamiento para manejar los espacios de estacionamiento


formroutes // routes/formRoutes.js
import express from 'express';
import formController from '../controllers/formController.js';
import { getAllSpots, getHuespedesConVehiculos, assignSpot } from '../controllers/estacionamientoController.js';
const router = express.Router();

// Ruta para guardar datos del formulario
router.post('/guardarDatos', formController.guardarDatos);

// Ruta para inicio de sesión de empleados
router.post('/login', formController.login);

router.post('/reservarFechas', formController.reservarFechas);

// Ruta para obtener estacionamiento


router.get('/spots', getAllSpots);
router.get('/huespedes', getHuespedesConVehiculos);
router.put('/assign', assignSpot);


export default router;