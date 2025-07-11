import express from 'express';
import { methods, verifyEmail } from '../controllers/authentication.controller.js';

const router = express.Router();

// Authentication routes
router.post('/login', methods.login);
router.post('/register', methods.register);
router.get('/verify-email', verifyEmail);

export default router;