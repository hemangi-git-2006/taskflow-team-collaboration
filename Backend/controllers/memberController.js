import bcrypt from "bcryptjs";
import User from "../models/User.js";
import Project from "../models/Project.js";

// Add Member
export const addMember = async (req, res) => {
  try {
    const { employeeId, projectId } = req.body;

    // Find existing employee
    const employee = await User.findOne({
      employeeId,
      role: "Member",
    });

    if (!employee) {
      return res.status(404).json({
        message: "Employee not found",
      });
    }

    // Find project
    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    // Check if already added
    if (
      project.members.some(
        (memberId) =>
          memberId.toString() === employee._id.toString()
      )
    ) {
      return res.status(400).json({
        message: "Employee is already a member of this project",
      });
    }

    // Add employee to project
    await Project.updateOne(
  { _id: projectId },
  {
    $addToSet: {
      members: employee._id,
    },
  }
);

    res.status(201).json({
      message: "Member Added To Project Successfully",
      member: employee,
    });

  } catch (error) {
    console.log("ADD MEMBER ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Members of One Project
export const getProjectMembers = async (req, res) => {
  try {
    const project = await Project.findById(
      req.params.projectId
    ).populate(
      "members",
      "fullName email employeeId role profileImage"
    );

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    res.json(project.members);

  } catch (error) {
    console.error(
      "========== GET PROJECT MEMBERS ERROR =========="
    );

    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};


// Get All Members
export const getAllMembers = async (req, res) => {
  try {
    const members = await User.find({
      role: "Member",
    }).select(
      "fullName email employeeId role profileImage"
    );

    res.json(members);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};


// Get Next Employee ID
export const getNextEmployeeId = async (req, res) => {
  try {
    const count = await User.countDocuments({
      role: "Member",
    });

    const employeeId = `EMP${String(count + 1).padStart(3, "0")}`;

    res.json({
      employeeId,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};


// Update Member
export const updateMember = async (req, res) => {
  try {
    const member = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.json({
      message: "Member Updated Successfully",
      member,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};


// Delete Member
export const deleteMember = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);

    res.json({
      message: "Member Deleted Successfully",
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};


// ========================================
// Get All Team Members From All Projects
// ========================================
export const getMyTeamMembers = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Find all projects where current user is a member
    const projects = await Project.find({
      members: userId,
    }).populate(
      "members",
      "fullName email employeeId role profileImage"
    );

    // Store unique members
    const membersMap = new Map();

    projects.forEach((project) => {
      project.members.forEach((member) => {

        // Don't show logged-in member
        if (
          member._id.toString() !==
          userId.toString()
        ) {
          membersMap.set(
            member._id.toString(),
            member
          );
        }

      });
    });

    const members = Array.from(
      membersMap.values()
    );

    res.json(members);

  } catch (error) {
    console.log(
      "GET MY TEAM MEMBERS ERROR:",
      error
    );

    res.status(500).json({
      message: "Server Error",
    });
  }
};


// ========================================
// Get Single Member By ID
// ========================================
export const getMemberById = async (req, res) => {
  try {
    const member = await User.findOne({
      _id: req.params.id,
      role: "Member",
    }).select(
      "fullName email employeeId role profileImage"
    );

    if (!member) {
      return res.status(404).json({
        message: "Member not found",
      });
    }

    res.json(member);

  } catch (error) {
    console.log(
      "GET MEMBER BY ID ERROR:",
      error
    );

    res.status(500).json({
      message: "Server Error",
    });
  }
};