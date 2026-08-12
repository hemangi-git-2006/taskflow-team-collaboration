import Task from "../models/Task.js";
import Project from "../models/Project.js";

// Create Task
export const createTask = async (req, res) => {
  try {
    const {
      title,
      description,
      project,
      assignedTo,
      createdBy,
      priority,
      status,
      deadline,
    } = req.body;

    const task = await Task.create({
      title,
      description,
      project,
      assignedTo,
      createdBy,
      priority,
      status,
      deadline,
    });

    res.status(201).json({
      message: "Task Created Successfully",
      task,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// Get All Tasks
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find()
      .populate("assignedTo", "fullName employeeId")
      .populate("createdBy", "fullName")
      .populate("project", "name");

    res.json(tasks);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// =============================
// Get Tasks By Project
// =============================
export const getProjectTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      project: req.params.projectId,
    })
      .populate("assignedTo", "fullName employeeId")
      .populate("createdBy", "fullName")
      .populate("project", "name")
      .populate("sharedWith", "fullName employeeId");

    res.json(tasks);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// Get Tasks of Logged-in Member
export const getMemberTasks = async (req, res) => {
  try {
    const userId = req.params.userId;

    const tasks = await Task.find({
      $or: [
        {
          assignedTo: userId,
        },
        {
          sharedWith: userId,
        },
      ],
    })
      .populate("project", "name")
      .populate("createdBy", "fullName")
      .populate("assignedTo", "fullName employeeId")
      .populate("sharedWith", "fullName employeeId");

    res.json(tasks);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// Get Single Task
export const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)
      .populate("assignedTo")
      .populate("createdBy")
      .populate("project")
      .populate("sharedWith");

    if (!task) {
      return res.status(404).json({
        message: "Task Not Found",
      });
    }

    res.json(task);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// Update Task
export const updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.json({
      message: "Task Updated Successfully",
      task,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// Delete Task
export const deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);

    res.json({
      message: "Task Deleted Successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// Update Task Status
export const updateTaskStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json({
      message: "Task Status Updated",
      task,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// ==================================================
// Share Task With Another Project Member
// ==================================================
export const shareTask = async (req, res) => {
  try {
    const {
      taskId,
      fromMember,
      toMember,
      reason,
      projectId,
    } = req.body;

    // --------------------------------------------
    // Validate required fields
    // --------------------------------------------

    if (
      !taskId ||
      !fromMember ||
      !toMember ||
      !reason ||
      !projectId
    ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // --------------------------------------------
    // Find task
    // --------------------------------------------

    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    // --------------------------------------------
    // Check task belongs to this project
    // --------------------------------------------

    if (
      task.project.toString() !==
      projectId.toString()
    ) {
      return res.status(400).json({
        message:
          "This task does not belong to this project",
      });
    }

    // --------------------------------------------
    // Find project
    // --------------------------------------------

    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    // --------------------------------------------
    // Check sender belongs to project
    // --------------------------------------------

    const senderIsMember =
      project.members.some(
        (memberId) =>
          memberId.toString() ===
          fromMember.toString()
      );

    if (!senderIsMember) {
      return res.status(403).json({
        message:
          "You are not a member of this project",
      });
    }

    // --------------------------------------------
    // Check receiver belongs to project
    // --------------------------------------------

    const receiverIsMember =
      project.members.some(
        (memberId) =>
          memberId.toString() ===
          toMember.toString()
      );

    if (!receiverIsMember) {
      return res.status(400).json({
        message:
          "Selected employee is not a member of this project",
      });
    }

    // --------------------------------------------
    // Don't allow sharing with yourself
    // --------------------------------------------

    if (
      fromMember.toString() ===
      toMember.toString()
    ) {
      return res.status(400).json({
        message:
          "You cannot share a task with yourself",
      });
    }

    // --------------------------------------------
    // Check if task already shared with member
    // --------------------------------------------

    const alreadyShared =
      task.sharedWith?.some(
        (memberId) =>
          memberId.toString() ===
          toMember.toString()
      );

    if (alreadyShared) {
      return res.status(400).json({
        message:
          "This task is already shared with this member",
      });
    }

    // --------------------------------------------
    // Add receiver to sharedWith
    // --------------------------------------------

    task.sharedWith.push(toMember);

    // --------------------------------------------
    // Save sharing information
    // --------------------------------------------

    task.sharedBy = fromMember;

    task.shareReason = reason;

    task.sharedAt = new Date();

    await task.save();

    // --------------------------------------------
    // Return updated task
    // --------------------------------------------

    const updatedTask = await Task.findById(
      task._id
    )
      .populate(
        "assignedTo",
        "fullName employeeId"
      )
      .populate(
        "createdBy",
        "fullName employeeId"
      )
      .populate(
        "project",
        "name"
      )
      .populate(
        "sharedWith",
        "fullName employeeId"
      )
      .populate(
        "sharedBy",
        "fullName employeeId"
      );

    res.status(200).json({
      message: "Task Shared Successfully",
      task: updatedTask,
    });

  } catch (error) {
    console.log(
      "========== SHARE TASK ERROR =========="
    );

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};