// formRoutes.js
import express from 'express';
import formController from '../controllers/formController.js';

const router = express.Router();

// Nueva ruta para verificar disponibilidad
router.get('/verificarDisponibilidad', formController.verificarDisponibilidad);

// Ruta para guardar datos y reservar fechas
router.post('/guardarDatosYReservarFechas', formController.guardarDatosYReservarFechas);

router.get('/contarsolicitudes', formController.contarsolicitudes);


////////////////////     EMPLEADOS      //////////////////////////////////////

// Ruta para guardar datos de empleados
router.post('/guardarempleados', formController.guardarempleados);

// Ruta para obtener empleados
router.get('/cargarempleados', formController.cargarempleados);

// Ruta para obtener un empleado por idEmpleado
router.get('/buscarempleados/:idEmpleado', formController.buscarempleados);

// Ruta para obtener un empleado por idEmpleado
router.put('/actualizarempleado/:idEmpleado', formController.actualizarempleado);

router.delete('/borrarEmpleado/:idEmpleado', formController.borrarempleado);

// Ruta para contar empleados
router.get("/contarempleados", formController.contarempleados);

/////////////////////    SOLICITUDES     ////////////////////////////////

// Ruta para obtener solicitudes
router.get('/cargarsolicitudes', formController.cargarsolicitudes);

router.post('/enviarahuesped', formController.enviarahuesped);

router.delete('/borrarsolicitud/:idsolicitudes', formController.borrarsolicitud);


////////////////////     STOCK      //////////////////////////////////////

// Ruta para guardar datos de productos
router.post('/guardarproducto', formController.guardarproducto);

// Ruta para obtener productos
router.get('/cargarproducto', formController.cargarproducto);

// Ruta para obtener un producto por idProducto
router.get('/buscarproducto/:idProducto', formController.buscarproducto);

// Ruta para obtener un producto por idProducto
router.put('/actualizarproducto/:idProducto', formController.actualizarproducto);

router.delete('/borrarproducto/:idProducto', formController.borrarproducto);

// Ruta para contar productos
router.get("/contarproducto", formController.contarproducto);


////////////////////     ESTACIONAMIENTO      //////////////////////////////////////

// Ruta para contar productos
router.get("/contarestacionamiento", formController.contarestacionamiento);

////////////////////     HUESPEDES      //////////////////////////////////////

// Ruta para contar huesped
router.get("/contarhuesped", formController.contarhuesped);
// Ruta para cargar huesped
router.get("/cargarhuesped", formController.cargarhuesped);

// Ruta para obtener un producto por idProducto
router.get('/buscarhuesped/:idHuesped', formController.buscarhuesped);


router.delete('/borrarhuesped/:idHuesped', formController.borrarhuesped);
export default router;