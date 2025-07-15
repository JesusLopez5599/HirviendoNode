import express from 'express';
import { methods as authController, verifyEmail } from '../controllers/authentication.controller.js';

const router = express.Router();

// Ruta para registrar nuevo usuario
router.post('/register', authController.register);

// Ruta para iniciar sesión
router.post('/login', authController.login);

// Ruta para verificar correo electrónico (enlace enviado al email)
router.get('/verify-email', verifyEmail);

// Ruta para obtener estadísticas de usuarios
router.get('/stats', authController.getUserStats);

export default router;
