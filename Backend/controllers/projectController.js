import Project from "../models/Project.js";

// ============================
// Create Project
// ============================
export const createProject = async (req, res) => {
  try {
    const {
      name,
      description,
      deadline,
    } = req.body;

    // Use the logged-in user's ID
    // instead of trusting createdBy from frontend
    const createdBy = req.user._id;

    const project = await Project.create({
      name,
      description,
      deadline,
      createdBy,
    });

    res.status(201).json({
      message: "Project Created Successfully",
      project,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};


// ============================
// Get Projects Created By Logged-in User
// ============================
export const getProjects = async (req, res) => {
  try {

    const projects = await Project.find({
      createdBy: req.user._id,
    })
      .populate("createdBy", "fullName email");

    res.json(projects);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });

  }
};


// ==============================
// Get Single Project
// ==============================
export const getProjectById = async (req, res) => {
  try {

    const project = await Project.findById(req.params.id)
      .populate("createdBy", "fullName email")
      .populate("members", "fullName email employeeId");

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    res.json(project);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });

  }
};


// ==============================
// Get Projects of Logged-in Member
// ==============================
export const getMemberProjects = async (req, res) => {
  try {

    const projects = await Project.find({
      members: req.params.userId,
    })
      .populate("createdBy", "fullName")
      .populate("members", "fullName email employeeId");

    res.json(projects);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });

  }
};