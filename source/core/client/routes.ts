import { Router } from "express";
import { getProfile, removeUser, updateProfile } from "./controller.js";
import { authenticateUser } from "../auth/middleware.js";

const router = Router();

// protected
router.use(authenticateUser);

router.get('/', getProfile);

router.delete('/', removeUser);

router.put('/', updateProfile);

export default router;