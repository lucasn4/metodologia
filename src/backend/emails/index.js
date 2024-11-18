import express from 'express'; 
import emailHelper from "./envioGmail.js";
import cors from 'cors';
import multer from 'multer'; // Importa multer

const app = express();
app.use(cors());

// Middleware
app.use(express.json());

// Configurar multer
const upload = multer(); 

// Routes
app.post('/send-email', upload.single('attachment'), async (req, res) => {
  const { to, subject, text } = req.body;
  const attachment = req.file; // Acceder al archivo subido

  try {
    let info = await emailHelper(to, subject, text, attachment); // Pasar el archivo a emailHelper
    res.status(200).send(`Email sent: ${info.response}`); 
  } catch (error) {
    res.status(500).send("Error sending email");
  }
});
export default app;
