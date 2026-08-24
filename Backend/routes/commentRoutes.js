import express from "express";

import Comment from "../models/Comment.js";
import Task from "../models/Task.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();


// =====================================================

router.get("/conversations", authMiddleware, async (req, res) => {
  try {
    const userId = req.user._id;
    const role = req.user.role;

    let taskQuery;

    if (role === "Admin") {

      // Admin sees tasks created by Admin
      taskQuery = {
        createdBy: userId,
      };

    } else {

      // Member sees:
      // 1. Tasks assigned to them
      // 2. Tasks created by them
      taskQuery = {
        $or: [
          { createdBy: userId },
          { assignedTo: userId },
        ],
      };
    }

    // Get user's relevant tasks
    const tasks = await Task.find(taskQuery)
      .populate(
        "createdBy",
        "fullName employeeId role"
      )
      .populate(
        "assignedTo",
        "fullName employeeId role"
      )
      .sort({ createdAt: -1 });


    // If no tasks
    if (!tasks.length) {
      return res.json([]);
    }


    // Get task IDs
    const taskIds = tasks.map((task) => task._id);


    // Get comments for these tasks
    const comments = await Comment.find({
      task: {
        $in: taskIds,
      },
    })
      .populate(
        "user",
        "fullName employeeId role"
      )
      .sort({
        createdAt: 1,
      });


    // Combine tasks + comments
    const conversations = tasks.map((task) => {

      const taskComments = comments.filter(
        (comment) =>
          comment.task.toString() ===
          task._id.toString()
      );

      return {
        task,
        comments: taskComments,
      };
    });


    res.json(conversations);

  } catch (error) {

    console.error(
      "Get conversations error:",
      error
    );

    res.status(500).json({
      message: "Server error",
    });
  }
});


// =====================================================
// GET COMMENTS FOR ONE TASK
// =====================================================

router.get(
  "/task/:taskId",
  authMiddleware,
  async (req, res) => {

    try {

      const { taskId } = req.params;
      const userId = req.user._id;


      // Find task
      const task = await Task.findById(taskId);


      if (!task) {
        return res.status(404).json({
          message: "Task not found",
        });
      }


      // Check participant
      const isParticipant =
        task.createdBy?.toString() ===
          userId.toString() ||

        task.assignedTo?.toString() ===
          userId.toString();


      if (!isParticipant) {
        return res.status(403).json({
          message:
            "You are not part of this conversation",
        });
      }


      // Get comments
      const comments = await Comment.find({
        task: taskId,
      })
        .populate(
          "user",
          "fullName employeeId role"
        )
        .sort({
          createdAt: 1,
        });


      res.json(comments);

    } catch (error) {

      console.error(
        "Get comments error:",
        error
      );

      res.status(500).json({
        message: "Server error",
      });
    }
  }
);


// =====================================================
// ADD COMMENT
// =====================================================

router.post(
  "/",
  authMiddleware,
  async (req, res) => {

    try {

      const {
        task,
        message,
      } = req.body;

      const userId = req.user._id;


      // Validation
      if (!task || !message?.trim()) {

        return res.status(400).json({
          message:
            "Task and message are required",
        });
      }


      // Find task
      const taskData =
        await Task.findById(task);


      if (!taskData) {

        return res.status(404).json({
          message: "Task not found",
        });
      }


      // Check participant
      const isParticipant =
        taskData.createdBy?.toString() ===
          userId.toString() ||

        taskData.assignedTo?.toString() ===
          userId.toString();


      if (!isParticipant) {

        return res.status(403).json({
          message:
            "You are not part of this conversation",
        });
      }


      // Create comment
      const comment =
        await Comment.create({

          task: task,

          user: userId,

          message: message.trim(),

        });


      // Populate user
      await comment.populate(
        "user",
        "fullName employeeId role"
      );


      res.status(201).json({

        message:
          "Comment added successfully",

        comment,

      });

    } catch (error) {

      console.error(
        "Add comment error:",
        error
      );

      res.status(500).json({
        message: "Server error",
      });
    }
  }
);


export default router;