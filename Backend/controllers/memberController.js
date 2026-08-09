import bcrypt from "bcryptjs";
import User from "../models/User.js";
import Project from "../models/Project.js";

// Add Member
export const addMember = async (req, res) => {
  try {
    const {
      fullName,
      email,
      password,
      projectId,
    } = req.body;

    // Check email
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    // Generate Employee ID
    const count = await User.countDocuments({
      role: "Member",
    });

    const employeeId = `EMP${String(count + 1).padStart(3, "0")}`;

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create Member
    const member = await User.create({
      fullName,
      email,
      employeeId,
      password: hashedPassword,
      role: "Member",
    });

    // Add Member to Project
    await Project.findByIdAndUpdate(
      projectId,
      {
        $push: {
          members: member._id,
        },
      }
    );

    res.status(201).json({
      message: "Member Added Successfully",
      member,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// Get Members
export const getProjectMembers = async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId)
      .populate(
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
  console.error("========== ADD MEMBER ERROR ==========");
  console.error(error);

  res.status(500).json({
    message: error.message,
  });
}};

// Get All Members
export const getAllMembers = async (req, res) => {
  try {
    const members = await User.find({
      role: "Member",
    }).select("fullName email employeeId role profileImage");

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

    res.json({ employeeId });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};
export const updateMember = async (req, res) => {
  try {
    const member = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
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
