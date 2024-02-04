import { Router } from "express";
import { getCourse, getLessons } from "../admin/controllers/course.js";
import { getCategories } from "../admin/controllers/category.js";

const router = Router();

// public
router.get('/categories', getCategories);
router.get('/course/:id', getCourse);
router.get('/lessons/:id', getLessons);

/**
 * TODO: enrollments
 */

export default router;