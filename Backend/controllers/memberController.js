import User from "../models/User.js";
import Project from "../models/Project.js";

// ========================================
// Add Member To Project
// ========================================
export const addMember = async (req, res) => {
  try {
    const { employeeId, projectId } = req.body;

    // ------------------------------------
    // Find project
    // ------------------------------------
    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    // ------------------------------------
    // Only project owner can add members
    // ------------------------------------
    if (
      project.createdBy.toString() !==
      req.user._id.toString()
    ) {
      return res.status(403).json({
        message: "You are not allowed to modify this project",
      });
    }

    // ------------------------------------
    // Find employee
    // ------------------------------------
    const employee = await User.findOne({
      employeeId,
      role: "Member",
    });

    if (!employee) {
      return res.status(404).json({
        message: "Employee not found",
      });
    }

    // ------------------------------------
    // Check if already added
    // ------------------------------------
    if (
      project.members.some(
        (memberId) =>
          memberId.toString() ===
          employee._id.toString()
      )
    ) {
      return res.status(400).json({
        message:
          "Employee is already a member of this project",
      });
    }

    // ------------------------------------
    // Check if employee belongs to another
    // admin's project
    // ------------------------------------
    const otherAdminProject = await Project.findOne({
      members: employee._id,
      createdBy: {
        $ne: req.user._id,
      },
    });

    if (otherAdminProject) {
      return res.status(403).json({
        message:
          "This employee belongs to another admin",
      });
    }

    // ------------------------------------
    // Add employee to project
    // ------------------------------------
    await Project.updateOne(
      { _id: projectId },
      {
        $addToSet: {
          members: employee._id,
        },
      }
    );

    res.status(201).json({
      message:
        "Member Added To Project Successfully",
      member: employee,
    });

  } catch (error) {
    console.log("ADD MEMBER ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};


// ========================================
// Get Members Of One Project
// ========================================
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

    // Only project owner can access admin member list
    if (
      project.createdBy.toString() !==
      req.user._id.toString()
    ) {
      return res.status(403).json({
        message:
          "You are not allowed to view these members",
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


// ========================================
// Get Members Belonging To Logged-in Admin's
// Projects
// ========================================
export const getAllMembers = async (req, res) => {
  try {

    // ------------------------------------
    // Only projects created by this admin
    // ------------------------------------
    const projects = await Project.find({
      createdBy: req.user._id,
      isArchived: false,
    }).populate(
      "members",
      "fullName email employeeId role profileImage"
    );

    // ------------------------------------
    // Remove duplicate members
    // ------------------------------------
    const membersMap = new Map();

    projects.forEach((project) => {

      project.members.forEach((member) => {

        if (member.role === "Member") {
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

    // ------------------------------------
    // Add project information
    // ------------------------------------
    const membersWithProjects = members.map(
      (member) => {

        const memberProjects = projects.filter(
          (project) =>
            project.members.some(
              (memberId) =>
                memberId._id.toString() ===
                member._id.toString()
            )
        );

        return {
          _id: member._id,
          fullName: member.fullName,
          email: member.email,
          employeeId: member.employeeId,
          role: member.role,
          profileImage: member.profileImage,

          projects: memberProjects.map(
            (project) => ({
              _id: project._id,
              name: project.name,
            })
          ),
        };

      }
    );

    res.json(membersWithProjects);

  } catch (error) {

    console.log(
      "GET ALL MEMBERS WITH PROJECTS ERROR:",
      error
    );

    res.status(500).json({
      message: "Server Error",
    });
  }
};


// ========================================
// Get Next Employee ID
// ========================================
export const getNextEmployeeId = async (req, res) => {
  try {

    const count = await User.countDocuments({
      role: "Member",
    });

    const employeeId = `EMP${String(
      count + 1
    ).padStart(3, "0")}`;

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


// ========================================
// Update Member
// ========================================
export const updateMember = async (req, res) => {
  try {

    // Find projects owned by this admin
    const ownedProjects = await Project.find({
      createdBy: req.user._id,
      members: req.params.id,
    });

    if (ownedProjects.length === 0) {
      return res.status(403).json({
        message:
          "You are not allowed to update this member",
      });
    }

    const member = await User.findOneAndUpdate(
      {
        _id: req.params.id,
        role: "Member",
      },
      req.body,
      {
        new: true,
      }
    );

    if (!member) {
      return res.status(404).json({
        message: "Member not found",
      });
    }

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


// ========================================
// Delete Member
// ========================================
export const deleteMember = async (req, res) => {
  try {

    // Check whether this member belongs to one
    // of the logged-in admin's projects
    const ownedProject = await Project.findOne({
      createdBy: req.user._id,
      members: req.params.id,
    });

    if (!ownedProject) {
      return res.status(403).json({
        message:
          "You are not allowed to delete this member",
      });
    }

    await User.findOneAndDelete({
      _id: req.params.id,
      role: "Member",
    });

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

    // Check whether member belongs to this admin's project
    const ownedProject = await Project.findOne({
      createdBy: req.user._id,
      members: req.params.id,
    });

    if (!ownedProject) {
      return res.status(403).json({
        message:
          "You are not allowed to view this member",
      });
    }

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