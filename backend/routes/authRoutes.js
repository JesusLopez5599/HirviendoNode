import express from 'express';
import { methods as authController, verifyEmail } from '../controllers/authentication.controller.js';

const router = express.Router();

// Ruta para registrar nuevo usuario
router.post('/register', authController.register);

// Ruta para iniciar sesión
router.post('/login', authController.login);

// Ruta para verificar correo electrónico (enlace enviado al email)
router.get('/verify-email', verifyEmail);

// Ruta para verificar JWT (ejemplo)
router.get('/verify-jwt', authController.verifyJWT);   

// Ruta para verificar si el usuario es admin  
router.get('/verify-admin', authController.verifyAdmin);

// Ruta para obtener todos los usuarios (solo admin)
router.get('/users', authController.getUsers);

export default router;
