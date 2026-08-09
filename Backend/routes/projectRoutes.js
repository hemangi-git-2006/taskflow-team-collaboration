import express from "express";

import {
  createProject,
  getProjects,
  getProjectById,
  getMemberProjects,
} from "../controllers/projectController.js";

const router = express.Router();

// Create Project
router.post("/", createProject);

// Get All Projects
router.get("/", getProjects);

// Get Projects of Logged-in Member
router.get("/member/:userId", getMemberProjects);

// Get Single Project
router.get("/:id", getProjectById);

export default router;