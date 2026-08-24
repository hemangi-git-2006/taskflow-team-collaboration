import express from "express";

import upload from "../middleware/upload.js";
import authMiddleware from "../middleware/authMiddleware.js";

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
  authMiddleware,
  upload.array("attachments", 10),
  createTask
);

// ============================
// Get Tasks
// ============================
router.get(
  "/",
  authMiddleware,
  getTasks
);

// ============================
// Get Tasks By Project
// ============================
router.get(
  "/project/:projectId",
  authMiddleware,
  getProjectTasks
);

// ============================
// Get Tasks of Logged-in Member
// ============================
router.get(
  "/member/:userId",
  authMiddleware,
  getMemberTasks
);

// ============================
// Share Task
// ============================
router.post(
  "/share",
  authMiddleware,
  upload.array("attachments", 10),
  shareTask
);

// ============================
// Task Attachment
// ============================
router.get(
  "/:taskId/attachment/:index",
  authMiddleware,
  getTaskAttachment
);

// ============================
// Single Task
// ============================
router.get(
  "/:id",
  authMiddleware,
  getTaskById
);

// ============================
// Update Task
// ============================
router.put(
  "/:id",
  authMiddleware,
  updateTask
);

// ============================
// Update Task Status
// ============================
router.put(
  "/:id/status",
  authMiddleware,
  updateTaskStatus
);

// ============================
// Delete Task
// ============================
router.delete(
  "/:id",
  authMiddleware,
  deleteTask
);

export default router;