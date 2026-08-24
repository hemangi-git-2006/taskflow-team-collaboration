import express from "express";

import {
  createProject,
  getProjects,
  getProjectById,
  getMemberProjects,
} from "../controllers/projectController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Create Project
router.post("/", authMiddleware, createProject);

// Get Projects of Logged-in User
router.get("/", authMiddleware, getProjects);

// Get Projects of Logged-in Member
router.get("/member/:userId", authMiddleware, getMemberProjects);

// Get Single Project
router.get("/:id", authMiddleware, getProjectById);

export default router;