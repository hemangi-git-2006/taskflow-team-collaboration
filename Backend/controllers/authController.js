import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// ======================
// Admin Register
// ======================
export const register = async (req, res) => {
  try {
    const {
      fullName,
      companyName,
      email,
      password,
    } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      fullName,
      companyName,
      email,
      password: hashedPassword,
      role: "Admin",
    });

    const { password: userPassword, ...userData } = user._doc;

    res.status(201).json({
      message: "Admin Registered Successfully",
      user: userData,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// ======================
// Login (Admin / Member)
// ======================
export const login = async (req, res) => {
  try {
    const {
      loginAs,
      email,
      employeeId,
      password,
    } = req.body;

    let user;

    // Admin Login
    if (loginAs === "Admin") {
      user = await User.findOne({
        email,
        role: "Admin",
      });

      if (!user) {
        return res.status(400).json({
          message: "Admin not found",
        });
      }
    }

    // Member Login
    else {
      user = await User.findOne({
        employeeId,
        role: "Member",
      });

      if (!user) {
        return res.status(400).json({
          message: "Invalid Employee ID",
        });
      }
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid Password",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    const { password: userPassword, ...userData } = user._doc;

    res.status(200).json({
      message: "Login Successful",
      token,
      user: userData,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};