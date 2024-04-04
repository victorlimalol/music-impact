import express from "express";
import {
  createTeacher,
  deleteTeacher,
  getAllTeachers,
  updateTeacher,
} from "../controllers/teacherController";
import * as studentsControllers from "../controllers/coursesController";
import * as coursesControllers from "../controllers/coursesController";

const router = express.Router();

// Routes for Teacher
router.post("/teacher", createTeacher);
router.get("/all/teacher", getAllTeachers);
router.put("/teacher/:id", updateTeacher);
router.delete("/teacher/:id", deleteTeacher);

// Routes for Student
router.post("/student", studentsControllers.createStudent);
router.put("/student/:id", studentsControllers.updateStudent);
router.delete("/student/:id", studentsControllers.deleteStudent);
router.delete("/all/student", studentsControllers.getAllStudents);

// Routes for Courses
router.post("/course", coursesControllers.createCourse);
router.put("/course/:id", coursesControllers.updateCourse);
router.delete("/course/:id", coursesControllers.deleteCourse);
router.delete("/all/course", coursesControllers.getAllCourses);

export default router;
