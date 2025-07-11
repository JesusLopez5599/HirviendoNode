import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import {connectDB} from './utils/db.js';
import authRoutes from './routes/authRoutes.js';
import path from 'path';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.get('/', (req, res) => {
  res.send('API funcionando correctamente');
});

app.use('/api/auth', authRoutes);
const PORT = process.env.PORT || 4001;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));

app.use(express.static(path.join(process.cwd(), 'frontend')));

app.get('*', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'frontend', 'index.html'));
});

app.listen(4001, () => console.log('Servidor corriendo en 4001'));