import Task from "../models/Task.js";

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
      .populate("project", "name");

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
    const tasks = await Task.find({
      assignedTo: req.params.userId,
    })
      .populate("project", "name")
      .populate("createdBy", "fullName");

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
      .populate("project");

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