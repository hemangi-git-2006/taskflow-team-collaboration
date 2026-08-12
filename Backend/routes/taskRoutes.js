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
  shareTask,
} from "../controllers/taskController.js";

const router = express.Router();

// ============================
// Create Task
// ============================

router.post("/", createTask);

// ============================
// Get Tasks
// ============================

router.get("/", getTasks);

router.get(
  "/project/:projectId",
  getProjectTasks
);

router.get(
  "/member/:userId",
  getMemberTasks
);

// ============================
// Share Task
// ============================

router.post(
  "/share",
  shareTask
);

// ============================
// Single Task
// ============================

router.get(
  "/:id",
  getTaskById
);

// ============================
// Update Task
// ============================

router.put(
  "/:id",
  updateTask
);

// ============================
// Update Task Status
// ============================

router.put(
  "/:id/status",
  updateTaskStatus
);

// ============================
// Delete Task
// ============================

router.delete(
  "/:id",
  deleteTask
);

export default router;