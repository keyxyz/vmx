import { Router } from "express";
import { login, logout, register } from "./controller.js";
import { authenticateUser } from "./middleware.js";
const router = Router();
router.post('/register', register);
router.post('/login', login);
router.get('/logout', authenticateUser, logout);
export default router;
