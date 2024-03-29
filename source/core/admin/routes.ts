import { Router } from "express";
import { authenticateUser, verifyAdmin } from "../auth/middleware.js";
import { createCategory, createCourse, createLesson, createSection, removeCategory, removeCourse, removeLesson, removeSection, updateCategory, updateCourse, updateLesson, updateSection } from "./controllers/index.js";
import { fetchUsers, getProfileWithParam, removeUserWithParam, updateProfileWithParam } from "../client/controller.js";


const router = Router();

// private - admin only
router.use(authenticateUser, verifyAdmin);

router.get('/profile/:id', getProfileWithParam);
router.post('/profile/delete/:id', removeUserWithParam);
router.post('/profile/update/:id', updateProfileWithParam);
router.get('/profile/list', fetchUsers);

router.post('/category/create', createCategory);
router.put('/category/:id', updateCategory);
router.delete('/category/:id', removeCategory);

router.post('/course/create', createCourse);
router.put('/course/:id', updateCourse);
router.delete('/course/:id', removeCourse);

router.post('/section/create', createSection);
router.put('/section/:id', updateSection);
router.delete('/section/:id', removeSection);

router.post('/lesson/create', createLesson);
router.put('/lesson/:id', updateLesson);
router.delete('/lesson/:id', removeLesson);

export default router;