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

    if (
      !fullName ||
      !email ||
      !password
    ) {
      return res.status(400).json({
        message:
          "Full Name, Email and Password are required",
      });
    }

    const normalizedEmail =
      email.trim().toLowerCase();

    const existingUser =
      await User.findOne({
        email:
          normalizedEmail,
      });

    if (existingUser) {
      return res.status(400).json({
        message:
          "Email already exists",
      });
    }

    const hashedPassword =
      await bcrypt.hash(
        password,
        10
      );

    const user =
      await User.create({
        fullName:
          fullName.trim(),

        companyName:
          companyName
            ? companyName.trim()
            : "",

        email:
          normalizedEmail,

        password:
          hashedPassword,

        role:
          "Admin",
      });

    const {
      password: userPassword,
      ...userData
    } = user._doc;

    res.status(201).json({
      message:
        "Admin Registered Successfully",

      user:
        userData,
    });

  } catch (error) {
    console.log(
      "REGISTER ERROR:",
      error
    );

    if (error.code === 11000) {
      return res.status(400).json({
        message:
          "Email already exists",
      });
    }

    res.status(500).json({
      message:
        "Server Error",
    });
  }
};


// ======================
// Login Admin / Member
// ======================
export const login = async (req, res) => {
  try {
     console.log("🔥 LOGIN API HIT", req.body);
    const {
      loginAs,
      email,
      employeeId,
      password,
    } = req.body;

    if (!password) {
      return res.status(400).json({
        message:
          "Password is required",
      });
    }

    let user = null;

    // ========================================
    // Admin Login
    // ========================================
    if (
      loginAs === "Admin"
    ) {

      if (!email) {
        return res.status(400).json({
          message:
            "Email is required",
        });
      }

      const normalizedEmail =
        email.trim().toLowerCase();

      user =
        await User.findOne({
          email:
            normalizedEmail,

          role:
            "Admin",
        });

      if (!user) {
        return res.status(400).json({
          message:
            "Admin not found",
        });
      }

    }

    // ========================================
    // Member Login
    // ========================================
    else if (
      loginAs === "Member"
    ) {

      if (!employeeId) {
        return res.status(400).json({
          message:
            "Employee ID is required",
        });
      }

      const normalizedEmployeeId =
        employeeId
          .trim()
          .toUpperCase();

      const users =
        await User.find({
          employeeId:
            normalizedEmployeeId,

          role:
            "Member",
        });
       console.log("========== MEMBER LOGIN ==========");
console.log("Employee ID:", normalizedEmployeeId);
console.log("Matching users:", users.length);

users.forEach((candidate) => {
  console.log(
    "Member:",
    candidate.fullName,
    candidate.email,
    candidate.employeeId
  );
});

      if (
        !users ||
        users.length === 0
      ) {
        return res.status(400).json({
          message:
            "Invalid Employee ID",
        });
      }

      let matchedUser = null;

      for (
        const candidate of users
      ) {

        if (
          !candidate.password
        ) {
          continue;
        }

        const isMatch =
          await bcrypt.compare(
            password,
            candidate.password
          );

        if (isMatch) {
          matchedUser =
            candidate;
          break;
        }
      }

      if (!matchedUser) {
        return res.status(400).json({
          message:
            "Invalid Password",
        });
      }

      user =
        matchedUser;

    }

    else {
      return res.status(400).json({
        message:
          "Invalid login type",
      });
    }

    // ========================================
    // Admin password check
    // ========================================
    if (
      loginAs === "Admin"
    ) {
      const isMatch =
        await bcrypt.compare(
          password,
          user.password
        );

      if (!isMatch) {
        return res.status(400).json({
          message:
            "Invalid Password",
        });
      }
    }

    // ========================================
    // JWT
    // ========================================
    const token =
      jwt.sign(
        {
          id:
            user._id,

          role:
            user.role,
        },

        process.env.JWT_SECRET,

        {
          expiresIn:
            "7d",
        }
      );

    // Remove password
    const {
      password: userPassword,
      ...userData
    } = user._doc;

    res.status(200).json({
      message:
        "Login Successful",

      token,

      user:
        userData,
    });

  } catch (error) {
    console.log(
      "LOGIN ERROR:",
      error
    );

    res.status(500).json({
      message:
        "Server Error",
    });
  }
};