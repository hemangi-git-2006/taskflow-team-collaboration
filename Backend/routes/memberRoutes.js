import express from "express";

import {
  createMember,
  addMember,
  getProjectMembers,
  getAllMembers,
  getNextEmployeeId,
  deleteMember,
  updateMember,
  getMyTeamMembers,
  getMemberById,
} from "../controllers/memberController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// ========================================
// Get all members created by logged-in admin
// ========================================
router.get(
  "/",
  authMiddleware,
  getAllMembers
);

// ========================================
// Get next employee ID
// ========================================
router.get(
  "/next-id",
  authMiddleware,
  getNextEmployeeId
);

// ========================================
// Get team members of logged-in employee
// ========================================
router.get(
  "/user/:userId",
  authMiddleware,
  getMyTeamMembers
);

// ========================================
// Get single member
// ========================================
router.get(
  "/member/:id",
  authMiddleware,
  getMemberById
);

// ========================================
// Create New Member
// ========================================
router.post(
  "/create",
  authMiddleware,
  createMember
);

// ========================================
// Add Existing Member To Project
// ========================================
router.post(
  "/",
  authMiddleware,
  addMember
);

// ========================================
// Update Member
// ========================================
router.put(
  "/:id",
  authMiddleware,
  updateMember
);

// ========================================
// Delete Member
// ========================================
router.delete(
  "/:id",
  authMiddleware,
  deleteMember
);

// ========================================
// Get Members Of Project
// ========================================
router.get(
  "/:projectId",
  authMiddleware,
  getProjectMembers
);

export default router;