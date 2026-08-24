import bcrypt from "bcryptjs";
import User from "../models/User.js";
import Project from "../models/Project.js";

// ========================================
// Create Member
// ========================================
export const createMember = async (req, res) => {
  try {
    const {
      employeeId,
      fullName,
      email,
      password,
    } = req.body;

    // ========================================
    // Validate required fields
    // ========================================
    if (
      !employeeId ||
      !fullName ||
      !email ||
      !password
    ) {
      return res.status(400).json({
        message:
          "Employee ID, Full Name, Email and Password are required",
      });
    }

    // Logged-in admin
    const adminId = req.user._id;

    // ========================================
    // Check duplicate Employee ID
    // ONLY for this admin
    // ========================================
    const existingEmployee =
      await User.findOne({
        employeeId:
          employeeId.trim(),
        role: "Member",
        createdBy: adminId,
      });

    if (existingEmployee) {
      return res.status(400).json({
        message:
          "Employee ID already exists for your account",
      });
    }

    // ========================================
    // Check duplicate email
    // ========================================
    const existingEmail =
      await User.findOne({
        email:
          email.trim().toLowerCase(),
      });

    if (existingEmail) {
      return res.status(400).json({
        message:
          "Email already exists",
      });
    }

    // ========================================
    // Hash password
    // ========================================
    const hashedPassword =
      await bcrypt.hash(
        password,
        10
      );

    // ========================================
    // Create Member
    // ========================================
    const member =
      await User.create({
        employeeId:
          employeeId.trim(),

        fullName:
          fullName.trim(),

        email:
          email
            .trim()
            .toLowerCase(),

        password:
          hashedPassword,

        role: "Member",

        createdBy:
          adminId,
      });

    // ========================================
    // Response
    // ========================================
    res.status(201).json({
      message:
        "Member Created Successfully",

      member: {
        _id: member._id,
        employeeId:
          member.employeeId,
        fullName:
          member.fullName,
        email:
          member.email,
        role:
          member.role,
      },
    });

  } catch (error) {

    console.log(
      "CREATE MEMBER ERROR:",
      error
    );

    // Duplicate key protection
    if (error.code === 11000) {
      return res.status(400).json({
        message:
          "Employee ID or Email already exists",
      });
    }

    res.status(500).json({
      message:
        "Server Error",

      error:
        error.message,
    });
  }
};


// ========================================
// Add Existing Member To Project
// ========================================
export const addMember = async (req, res) => {
  try {
    const {
      employeeId,
      projectId,
    } = req.body;

    // ========================================
    // Validate
    // ========================================
    if (!employeeId || !projectId) {
      return res.status(400).json({
        message:
          "Employee ID and Project ID are required",
      });
    }

    // ========================================
    // Find Project
    // ========================================
    const project =
      await Project.findById(
        projectId
      );

    if (!project) {
      return res.status(404).json({
        message:
          "Project not found",
      });
    }

    // ========================================
    // Only project owner can add members
    // ========================================
    if (
      project.createdBy.toString() !==
      req.user._id.toString()
    ) {
      return res.status(403).json({
        message:
          "You are not allowed to modify this project",
      });
    }

    // ========================================
    // Find member belonging to this admin
    // ========================================
    const employee =
      await User.findOne({
        employeeId:
          employeeId.trim(),

        role: "Member",

        createdBy:
          req.user._id,
      });

    if (!employee) {
      return res.status(404).json({
        message:
          "Employee not found in your members",
      });
    }

    // ========================================
    // Check if already added
    // ========================================
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

    // ========================================
    // Add existing member to project
    // ========================================
    await Project.updateOne(
      {
        _id: projectId,
      },
      {
        $addToSet: {
          members:
            employee._id,
        },
      }
    );

    res.status(201).json({
      message:
        "Member Added To Project Successfully",

      member: {
        _id:
          employee._id,

        employeeId:
          employee.employeeId,

        fullName:
          employee.fullName,

        email:
          employee.email,

        role:
          employee.role,
      },
    });

  } catch (error) {

    console.log(
      "ADD MEMBER ERROR:",
      error
    );

    res.status(500).json({
      message:
        "Server Error",

      error:
        error.message,
    });
  }
};


// ========================================
// Get Members Of One Project
// ========================================
export const getProjectMembers = async (
  req,
  res
) => {
  try {

    const project =
      await Project.findById(
        req.params.projectId
      ).populate(
        "members",
        "fullName email employeeId role profileImage"
      );

    if (!project) {
      return res.status(404).json({
        message:
          "Project not found",
      });
    }

    // Only project owner can view members
    if (
      project.createdBy.toString() !==
      req.user._id.toString()
    ) {
      return res.status(403).json({
        message:
          "You are not allowed to view these members",
      });
    }

    res.json(
      project.members
    );

  } catch (error) {

    console.error(
      "========== GET PROJECT MEMBERS ERROR =========="
    );

    console.error(error);

    res.status(500).json({
      message:
        "Server Error",

      error:
        error.message,
    });
  }
};


// ========================================
// Get All Members Created By Logged-in Admin
// ========================================
export const getAllMembers = async (
  req,
  res
) => {
  try {

    const members =
      await User.find({
        role: "Member",

        createdBy:
          req.user._id,
      }).select(
        "fullName email employeeId role profileImage"
      );

    res.json(
      members
    );

  } catch (error) {

    console.log(
      "GET ALL MEMBERS ERROR:",
      error
    );

    res.status(500).json({
      message:
        "Server Error",
    });
  }
};


// ========================================
// Get Next Employee ID
// ========================================
export const getNextEmployeeId = async (
  req,
  res
) => {
  try {

    const members =
      await User.find({
        role: "Member",

        createdBy:
          req.user._id,

        employeeId: {
          $exists: true,

          $ne: "",
        },
      }).select(
        "employeeId"
      );

    let maxNumber = 0;

    members.forEach(
      (member) => {

        const match =
          member.employeeId?.match(
            /^EMP(\d+)$/
          );

        if (match) {

          const number =
            parseInt(
              match[1],
              10
            );

          if (
            number >
            maxNumber
          ) {
            maxNumber =
              number;
          }
        }
      }
    );

    const employeeId =
      `EMP${String(
        maxNumber + 1
      ).padStart(3, "0")}`;

    res.json({
      employeeId,
    });

  } catch (error) {

    console.log(
      "GET NEXT EMPLOYEE ID ERROR:",
      error
    );

    res.status(500).json({
      message:
        "Server Error",
    });
  }
};


// ========================================
// Update Member
// ========================================
export const updateMember = async (
  req,
  res
) => {
  try {

    const member =
      await User.findOneAndUpdate(
        {
          _id:
            req.params.id,

          role:
            "Member",

          createdBy:
            req.user._id,
        },

        req.body,

        {
          new: true,
        }
      );

    if (!member) {
      return res.status(404).json({
        message:
          "Member not found or does not belong to you",
      });
    }

    res.json({
      message:
        "Member Updated Successfully",

      member,
    });

  } catch (error) {

    console.log(
      "UPDATE MEMBER ERROR:",
      error
    );

    res.status(500).json({
      message:
        "Server Error",
    });
  }
};


// ========================================
// Delete Member
// ========================================
export const deleteMember = async (
  req,
  res
) => {
  try {

    // Find member belonging to this admin
    const member =
      await User.findOne({
        _id:
          req.params.id,

        role:
          "Member",

        createdBy:
          req.user._id,
      });

    if (!member) {
      return res.status(404).json({
        message:
          "Member not found or does not belong to you",
      });
    }

    // Remove member from all projects
    // owned by this admin
    await Project.updateMany(
      {
        createdBy:
          req.user._id,

        members:
          member._id,
      },

      {
        $pull: {
          members:
            member._id,
        },
      }
    );

    // Delete member
    await User.findByIdAndDelete(
      member._id
    );

    res.json({
      message:
        "Member Deleted Successfully",
    });

  } catch (error) {

    console.log(
      "DELETE MEMBER ERROR:",
      error
    );

    res.status(500).json({
      message:
        "Server Error",
    });
  }
};


// ========================================
// Get All Team Members
// For Logged-in Employee
// ========================================
export const getMyTeamMembers = async (
  req,
  res
) => {
  try {

    // Use authenticated user
    const userId =
      req.user._id;

    // Find projects where current user
    // is a member
    const projects =
      await Project.find({
        members:
          userId,
      }).populate(
        "members",
        "fullName email employeeId role profileImage"
      );

    // Store unique members
    const membersMap =
      new Map();

    projects.forEach(
      (project) => {

        project.members.forEach(
          (member) => {

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

          }
        );

      }
    );

    const members =
      Array.from(
        membersMap.values()
      );

    res.json(
      members
    );

  } catch (error) {

    console.log(
      "GET MY TEAM MEMBERS ERROR:",
      error
    );

    res.status(500).json({
      message:
        "Server Error",
    });
  }
};


// ========================================
// Get Single Member By ID
// ========================================
export const getMemberById = async (
  req,
  res
) => {
  try {

    const member =
      await User.findOne({
        _id:
          req.params.id,

        role:
          "Member",

        createdBy:
          req.user._id,
      }).select(
        "fullName email employeeId role profileImage"
      );

    if (!member) {
      return res.status(404).json({
        message:
          "Member not found or does not belong to you",
      });
    }

    res.json(
      member
    );

  } catch (error) {

    console.log(
      "GET MEMBER BY ID ERROR:",
      error
    );

    res.status(500).json({
      message:
        "Server Error",
    });
  }
};