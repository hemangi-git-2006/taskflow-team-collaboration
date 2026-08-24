import Task from "../models/Task.js";
import Project from "../models/Project.js";
import cloudinary from "../config/cloudinary.js";

// ==========================================
// Create Task
// ==========================================

// ==========================================
// Create Task
// ==========================================

export const createTask = async (req, res) => {
  try {
    console.log("========== CREATE TASK ==========");
    console.log("BODY:", req.body);
    console.log("FILES:", req.files);

    const {
      title,
      description,
      project,
      assignedTo,
      priority,
      status,
      deadline,
    } = req.body;

    // Logged-in user
    const createdBy = req.user._id;

    // ==========================================
    // Validate required fields
    // ==========================================

    if (
      !title ||
      !description ||
      !project ||
      !assignedTo ||
      !deadline
    ) {
      return res.status(400).json({
        message: "Required fields are missing",
      });
    }

    // ==========================================
    // Verify project
    // ==========================================

    const projectData = await Project.findById(project);

    if (!projectData) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    // Only project owner can create tasks
    if (
      projectData.createdBy.toString() !==
      req.user._id.toString()
    ) {
      return res.status(403).json({
        message:
          "You are not allowed to create tasks in this project",
      });
    }

    // ==========================================
    // Verify assigned member belongs to project
    // ==========================================

    const assignedMemberExists =
      projectData.members.some(
        (memberId) =>
          memberId.toString() ===
          assignedTo.toString()
      );

    if (!assignedMemberExists) {
      return res.status(400).json({
        message:
          "Selected employee is not a member of this project",
      });
    }

    // ==========================================
    // Upload images
    // ==========================================

    const attachments = [];

    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const result = await new Promise(
          (resolve, reject) => {
            const uploadStream =
              cloudinary.uploader.upload_stream(
                {
                  folder: "taskflow/tasks",
                  resource_type: "image",
                },
                (error, result) => {
                  if (error) {
                    reject(error);
                  } else {
                    resolve(result);
                  }
                }
              );

            uploadStream.end(file.buffer);
          }
        );

        attachments.push({
          url: result.secure_url,
          filename: file.originalname,
        });
      }
    }

    // ==========================================
    // Create Task
    // ==========================================

    const newTask = await Task.create({
      title,
      description,
      project,
      assignedTo,
      createdBy,
      priority: priority || "Medium",
      status: status || "Todo",
      deadline,
      attachments,
    });

    // ==========================================
    // Return created task
    // ==========================================

    const populatedTask =
      await Task.findById(newTask._id)
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
        );

    res.status(201).json({
      message: "Task Created Successfully",
      task: populatedTask,
    });

  } catch (error) {
    console.log(
      "========== CREATE TASK ERROR =========="
    );

    console.error(error);

    res.status(500).json({
      message: "Unable to create task",
      error: error.message,
    });
  }
};
// ==================================================
// Get All Tasks
// ==================================================

// ==================================================
// Get Tasks Of Logged-in Admin
// ==================================================

export const getTasks = async (req, res) => {
  try {

    // Get projects owned by logged-in admin
    const projects = await Project.find({
      createdBy: req.user._id,
    }).select("_id");

    const projectIds = projects.map(
      (project) => project._id
    );

    const tasks = await Task.find({
      project: { $in: projectIds },
    })
      .populate(
        "assignedTo",
        "fullName employeeId"
      )
      .populate(
        "createdBy",
        "fullName"
      )
      .populate(
        "project",
        "name"
      );

    res.json(tasks);

  } catch (error) {

    console.log(
      "GET TASKS ERROR:",
      error
    );

    res.status(500).json({
      message: "Server Error",
    });
  }
};


// ==================================================
// Get Tasks By Project
// ==================================================

// ==================================================
// Get Tasks By Project
// ==================================================

export const getProjectTasks = async (req, res) => {
  try {

    const project =
      await Project.findById(
        req.params.projectId
      );

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    // Only project owner can access admin task list
    if (
      project.createdBy.toString() !==
      req.user._id.toString()
    ) {
      return res.status(403).json({
        message:
          "You are not allowed to view these tasks",
      });
    }

    const tasks = await Task.find({
      project: req.params.projectId,
    })
      .populate(
        "assignedTo",
        "fullName employeeId"
      )
      .populate(
        "createdBy",
        "fullName"
      )
      .populate(
        "project",
        "name"
      )
      .populate(
        "sharedWith",
        "fullName employeeId"
      );

    res.json(tasks);

  } catch (error) {

    console.log(
      "GET PROJECT TASKS ERROR:",
      error
    );

    res.status(500).json({
      message: "Server Error",
    });
  }
};


// ==================================================
// Get Tasks of Logged-in Member
// ==================================================

// ==================================================
// Get Tasks Of Logged-in Member
// ==================================================

export const getMemberTasks = async (req, res) => {
  try {

    const userId = req.user._id;

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
      .populate(
        "project",
        "name"
      )
      .populate(
        "createdBy",
        "fullName"
      )
      .populate(
        "assignedTo",
        "fullName employeeId"
      )
      .populate(
        "sharedWith",
        "fullName employeeId"
      );

    res.json(tasks);

  } catch (error) {

    console.log(
      "GET MEMBER TASKS ERROR:",
      error
    );

    res.status(500).json({
      message: "Server Error",
    });
  }
};


// ==================================================
// Get Single Task
// ==================================================

export const getTaskById = async (req, res) => {
  try {

    const task = await Task.findById(
      req.params.id
    )
      .populate("assignedTo")
      .populate("createdBy")
      .populate("project")
      .populate("sharedWith");

    if (!task) {
      return res.status(404).json({
        message: "Task Not Found",
      });
    }

    const project = await Project.findById(
      task.project._id || task.project
    );

    const isOwner =
      project &&
      project.createdBy.toString() ===
        req.user._id.toString();

    const isAssigned =
      task.assignedTo?._id?.toString() ===
      req.user._id.toString();

    const isShared =
      task.sharedWith?.some(
        (member) =>
          member._id.toString() ===
          req.user._id.toString()
      );

    if (!isOwner && !isAssigned && !isShared) {
      return res.status(403).json({
        message:
          "You are not allowed to view this task",
      });
    }

    res.json(task);

  } catch (error) {

    console.log(
      "GET TASK BY ID ERROR:",
      error
    );

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// ==================================================
// Get Task Attachment Through Backend
// ==================================================

export const getTaskAttachment = async (req, res) => {
  try {
    const { taskId, index } = req.params;

    // Find task
    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    // ========================================
// Check if logged-in user can share task
// ========================================
const canShareTask =
  task.assignedTo?.toString() ===
    fromMember.toString() ||
  task.sharedWith?.some(
    (memberId) =>
      memberId.toString() ===
      fromMember.toString()
  );

if (!canShareTask) {
  return res.status(403).json({
    message:
      "You are not allowed to share this task",
  });
}

    // Find project
    const project = await Project.findById(task.project);

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    // Check access
    const isOwner =
      project.createdBy.toString() ===
      req.user._id.toString();

    const isAssigned =
      task.assignedTo &&
      task.assignedTo.toString() ===
        req.user._id.toString();

    const isShared =
      task.sharedWith?.some(
        (memberId) =>
          memberId.toString() ===
          req.user._id.toString()
      );

    if (!isOwner && !isAssigned && !isShared) {
      return res.status(403).json({
        message:
          "You are not allowed to view this attachment",
      });
    }

    // Convert index to number
    const attachmentIndex = Number(index);

    if (Number.isNaN(attachmentIndex)) {
      return res.status(400).json({
        message: "Invalid attachment index",
      });
    }

    // Get attachment
    const attachment =
      task.attachments?.[attachmentIndex];

    if (!attachment) {
      return res.status(404).json({
        message: "Attachment not found",
      });
    }

    if (!attachment.url) {
      return res.status(404).json({
        message: "Attachment URL not found",
      });
    }

    // Fetch image from Cloudinary
    const imageResponse = await fetch(
      attachment.url
    );

    if (!imageResponse.ok) {
      return res.status(500).json({
        message: "Unable to fetch image",
      });
    }

    const contentType =
      imageResponse.headers.get("content-type") ||
      "image/jpeg";

    const imageBuffer = Buffer.from(
      await imageResponse.arrayBuffer()
    );

    // Send image through backend
    res.setHeader(
      "Content-Type",
      contentType
    );

    res.setHeader(
      "Cache-Control",
      "public, max-age=3600"
    );

    res.send(imageBuffer);

  } catch (error) {
    console.log(
      "========== GET TASK ATTACHMENT ERROR =========="
    );

    console.log(error);

    res.status(500).json({
      message: "Unable to load attachment",
      error: error.message,
    });
  }
};
// ==================================================
// Update Task
// ==================================================

export const updateTask = async (req, res) => {
  try {

    const task = await Task.findById(
      req.params.id
    );

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    const project = await Project.findById(
      task.project
    );

    if (
      !project ||
      project.createdBy.toString() !==
        req.user._id.toString()
    ) {
      return res.status(403).json({
        message:
          "You are not allowed to update this task",
      });
    }

    Object.assign(task, req.body);

    await task.save();

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


// ==================================================
// Delete Task
// ==================================================

export const deleteTask = async (req, res) => {
  try {

    const task = await Task.findById(
      req.params.id
    );

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    const project = await Project.findById(
      task.project
    );

    if (
      !project ||
      project.createdBy.toString() !==
        req.user._id.toString()
    ) {
      return res.status(403).json({
        message:
          "You are not allowed to delete this task",
      });
    }

    await Task.findByIdAndDelete(
      req.params.id
    );

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


// ==================================================
// Update Task Status
// ==================================================

export const updateTaskStatus = async (req, res) => {
  try {

    const { status } = req.body;

    const task = await Task.findById(
      req.params.id
    );

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    const project = await Project.findById(
      task.project
    );

    const isOwner =
      project &&
      project.createdBy.toString() ===
        req.user._id.toString();

    const isAssigned =
      task.assignedTo.toString() ===
        req.user._id.toString();

    const isShared =
      task.sharedWith?.some(
        (memberId) =>
          memberId.toString() ===
          req.user._id.toString()
      );

    if (!isOwner && !isAssigned && !isShared) {
      return res.status(403).json({
        message:
          "You are not allowed to update this task",
      });
    }

    task.status = status;

    await task.save();

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
    console.log(
      "========== SHARE TASK =========="
    );

    console.log("BODY:", req.body);
    console.log("FILES:", req.files);

const {
  taskId,
  toMember,
  reason,
  projectId,
} = req.body || {};

const fromMember = req.user._id;

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

    const project =
      await Project.findById(projectId);

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
    // Check if task already shared
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

    // ==========================================
    // Upload Shared Images
    // ==========================================

    const newAttachments = [];

    if (
      req.files &&
      req.files.length > 0
    ) {

      for (const file of req.files) {

        const result =
          await new Promise(
            (resolve, reject) => {

              const uploadStream =
                cloudinary.uploader.upload_stream(
                  {
                    folder:
                      "taskflow/tasks",
                    resource_type:
                      "image",
                  },
                  (error, result) => {

                    if (error) {
                      reject(error);
                    } else {
                      resolve(result);
                    }

                  }
                );

              uploadStream.end(
                file.buffer
              );
            }
          );

        newAttachments.push({
          url: result.secure_url,
          filename:
            file.originalname,
        });
      }
    }

    // --------------------------------------------
    // Add receiver
    // --------------------------------------------

    task.sharedWith.push(
      toMember
    );

    // --------------------------------------------
    // Save sharing information
    // --------------------------------------------

    task.sharedBy = fromMember;

    task.shareReason = reason;

    task.sharedAt = new Date();

    // --------------------------------------------
    // Add uploaded images
    // --------------------------------------------

    if (newAttachments.length > 0) {

      if (!task.attachments) {
        task.attachments = [];
      }

      task.attachments.push(
        ...newAttachments
      );
    }

    // --------------------------------------------
    // Save task
    // --------------------------------------------

    await task.save();

    // --------------------------------------------
    // Return updated task
    // --------------------------------------------

    const updatedTask =
      await Task.findById(task._id)

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
      message:
        "Task Shared Successfully",
      task: updatedTask,
    });

  } catch (error) {

    console.log(
      "========== SHARE TASK ERROR =========="
    );

    console.log(error);

    res.status(500).json({
      message:
        "Server Error",
      error: error.message,
    });
  }
};