import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './utils/db.js';
import authRoutes from './routes/authRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// Conexión a la base de datos
connectDB();

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

// Ruta catch-all (para SPA, si usas React o quieres evitar 404)
// app.get('/*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../frontend/index.html'));
// });

// Escuchar en el puerto
const PORT = process.env.PORT || 4001;
app.listen(PORT, () => console.log(`🟢 Servidor corriendo en puerto ${PORT}`));
