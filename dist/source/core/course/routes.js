import { Router } from "express";
import { getCourse, getLessons } from "../admin/controllers/course.js";
import { getCategories } from "../admin/controllers/category.js";
const router = Router();
router.get('/categories', getCategories);
router.get('/course/:id', getCourse);
router.get('/lessons/:id', getLessons);
export default router;
