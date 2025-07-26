import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './utils/db.js';
import authRoutes from './routes/authRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { initializeUser } from './utils/initializeUser.js'; 
//import User from './model/User.js';
//import { methods as authentication } from "./controllers/authentication.controller.js";
//import { methods as authorization } from "./middlewares/authorization.js";
//import { methods as userController } from "./controllers/user.controller.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// Funcion para iniciar la aplicacion
const initializeApp = async () => {
  try {
    await connectDB();

    await initializeUser();

    console.log('🟢 Aplicación iniciada correctamente');
  } catch (error) {
    console.error('🔴 Error al conectar a la base de datos:', error);
    process.exit(1); // Terminar el proceso si no se puede conectar
  }
};
initializeApp();

// Servir archivos estáticos del frontend
app.use(express.static(path.join(__dirname, '../frontend')));

// Rutas API
app.use('/api/auth', authRoutes);

// Ruta principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Ruta para admin.html, login, register
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/html/admin.html'));
});
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/html/login.html'));
});

app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/html/register.html'));
});

app.get('/reset_final', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/html/reset_final.html'));
});
// Ruta catch-all (para SPA, si usas React o quieres evitar 404)
// app.get('/*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../frontend/index.html'));
// });

// Escuchar en el puerto
const PORT = process.env.PORT || 4001;
app.listen(PORT, () => console.log(`🟢 Servidor corriendo en puerto ${PORT}`));
