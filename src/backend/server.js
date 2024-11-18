// server.js
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import formRoutes from './routes/formRoutes.js';
import emailRoutes from './emails/index.js'; 


const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api', formRoutes);
app.use('/api/email', emailRoutes); 

app.listen(5000, () => {
    console.log('Servidor escuchando en el puerto 5000');
});