import express from "express";

import {
  addMember,
  getProjectMembers,
  getAllMembers,
  getNextEmployeeId,
  deleteMember,
  updateMember,
} from "../controllers/memberController.js";
const router = express.Router();
router.post("/", addMember);

router.get("/", getAllMembers);

router.get("/next-id", getNextEmployeeId);

router.get("/:projectId", getProjectMembers);

router.put("/:id", updateMember);

router.delete("/:id", deleteMember);

export default router;