import { Router } from "express";
import { login, logout, register } from "./controller.js";
import { authenticateUser } from "./middleware.js";

const router = Router();

//public
router.post('/register', register);
router.post('/login', login);

// protected
router.get('/logout', authenticateUser, logout);

/**
 * TODO: - forgot & reset password
 */
// router.post('/forgot', forgotPassword);
// router.post('/reset/:token', resetPassword);

export default router;