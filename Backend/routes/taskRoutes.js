import express from "express";
import {
  createTask,
  getTasks,
  getProjectTasks,
  getMemberTasks,
  getTaskById,
  updateTask,
  deleteTask,
  updateTaskStatus,
} from "../controllers/taskController.js";

const router = express.Router();

router.post("/", createTask);

router.get("/", getTasks);
router.get("/project/:projectId", getProjectTasks);
router.get("/member/:userId", getMemberTasks);

router.get("/:id", getTaskById);

router.put("/:id", updateTask);

router.put("/:id/status", updateTaskStatus);

router.delete("/:id", deleteTask);


export default router;