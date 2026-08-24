import express from "express";

import {
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
// Admin Routes
// ========================================

router.post(
  "/",
  authMiddleware,
  addMember
);

router.get(
  "/",
  authMiddleware,
  getAllMembers
);

router.get(
  "/next-id",
  authMiddleware,
  getNextEmployeeId
);

router.get(
  "/:projectId",
  authMiddleware,
  getProjectMembers
);

router.put(
  "/:id",
  authMiddleware,
  updateMember
);

router.delete(
  "/:id",
  authMiddleware,
  deleteMember
);

router.get(
  "/:id",
  authMiddleware,
  getMemberById
);


// ========================================
// Employee Route
// ========================================

router.get(
  "/user/:userId",
  authMiddleware,
  getMyTeamMembers
);

export default router;