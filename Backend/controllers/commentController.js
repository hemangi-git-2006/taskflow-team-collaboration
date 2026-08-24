import mongoose from "mongoose";
import Comment from "../models/Comment.js";

// ========================================
// Add Comment
// ========================================
export const addComment = async (req, res) => {
  try {
    const { task, user, message } = req.body;

    if (!task || !user || !message) {
      return res.status(400).json({
        message: "Task, user and message are required",
      });
    }

    // Check task ID
    if (!mongoose.Types.ObjectId.isValid(task)) {
      return res.status(400).json({
        message: "Invalid task ID",
      });
    }

    // Check user ID
    if (!mongoose.Types.ObjectId.isValid(user)) {
      return res.status(400).json({
        message: "Invalid user ID",
      });
    }

    const comment = await Comment.create({
      task,
      user,
      message,
    });

    const populatedComment = await Comment.findById(
      comment._id
    ).populate(
      "user",
      "fullName email employeeId role"
    );

    res.status(201).json({
      message: "Comment added successfully",
      comment: populatedComment,
    });

  } catch (error) {
    console.log("ADD COMMENT ERROR:", error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};


// ========================================
// Get Comments For A Task
// ========================================
export const getTaskComments = async (req, res) => {
  try {
    const { taskId } = req.params;

    // Check task ID before querying MongoDB
    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      return res.status(400).json({
        message: "Invalid task ID",
      });
    }

    const comments = await Comment.find({
      task: taskId,
    })
      .populate(
        "user",
        "fullName email employeeId role"
      )
      .sort({ createdAt: 1 });

    res.status(200).json(comments);

  } catch (error) {
    console.log("GET TASK COMMENTS ERROR:", error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};


// ========================================
// Delete Comment
// ========================================
export const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid comment ID",
      });
    }

    const comment = await Comment.findByIdAndDelete(id);

    if (!comment) {
      return res.status(404).json({
        message: "Comment not found",
      });
    }

    res.json({
      message: "Comment deleted successfully",
    });

  } catch (error) {
    console.log("DELETE COMMENT ERROR:", error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};