import express from "express";
import upload from "../middleware/upload.js";

import {
  createTask,
  getTasks,
  getProjectTasks,
  getMemberTasks,
  getTaskById,
  getTaskAttachment,
  updateTask,
  deleteTask,
  updateTaskStatus,
  shareTask,
} from "../controllers/taskController.js";

const router = express.Router();

// ============================
// Create Task
// ============================

router.post(
  "/",
  upload.array("attachments", 10),
  createTask
);

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
  upload.array("attachments", 10),
  shareTask
);

// ============================
// Task Attachment
// ============================

router.get(
  "/:taskId/attachment/:index",
  getTaskAttachment
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