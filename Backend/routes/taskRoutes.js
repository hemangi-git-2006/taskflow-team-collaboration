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

// ========================================
// Create Task
// ========================================
router.post(
  "/",
  authMiddleware,
  upload.array("attachments", 10),
  createTask
);

// ========================================
// Get All Tasks
// ========================================
router.get(
  "/",
  authMiddleware,
  getTasks
);

// ========================================
// Get Project Tasks
// IMPORTANT: Keep this before /:id
// ========================================
router.get(
  "/project/:projectId",
  authMiddleware,
  getProjectTasks
);

// ========================================
// Get Tasks Of Logged-in Member
// ========================================
router.get(
  "/member/:userId",
  authMiddleware,
  getMemberTasks
);

// ========================================
// Share Task
// ========================================
router.post(
  "/share",
  authMiddleware,
  upload.array("attachments", 10),
  shareTask
);

// ========================================
// Task Attachment
// IMPORTANT: Keep this before /:id
// ========================================
router.get(
  "/:taskId/attachment/:index",
  authMiddleware,
  getTaskAttachment
);

// ========================================
// Get Single Task
// ========================================
router.get(
  "/:id",
  authMiddleware,
  getTaskById
);

// ========================================
// Update Task
// ========================================
router.put(
  "/:id",
  authMiddleware,
  updateTask
);

// ========================================
// Update Task Status
// ========================================
router.put(
  "/:id/status",
  authMiddleware,
  updateTaskStatus
);

// ========================================
// Delete Task
// ========================================
router.delete(
  "/:id",
  authMiddleware,
  deleteTask
);

export default router;