// server.js
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import formRoutes from './routes/formRoutes.js';
import estacionamientoRoutes from './routes/estacionamientoRoutes.js';
import emailRoutes from './emails/index.js'; 


const app = express();

// Habilitar CORS para permitir solicitudes desde el frontend
app.use(cors());

app.use(bodyParser.json());

// Cargar las rutas
app.use('/api', formRoutes);
app.use('/api', estacionamientoRoutes);
app.use('/api/email', emailRoutes); 





// Inicia el servidor en el puerto 5000
app.listen(5000, () => {
  console.log('Servidor escuchando en el puerto 5000');
});