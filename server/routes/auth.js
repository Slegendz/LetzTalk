import express from 'express';
const router = express.Router();
import { login, refresh, logout } from "../controllers/auth.controller.js";
import loginLimiter from "../middlewares/loginLimiter.middleware.js";
import { verifyJWT } from '../middlewares/auth.middleware.js';

router.post('/login', loginLimiter, login);
router.get('/refresh', refresh);
router.get('/logout/:id', verifyJWT, logout);

export default router;