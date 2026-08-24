import jwt from "jsonwebtoken";
import User from "../models/User.js";

const authMiddleware = async (req, res, next) => {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: "No authorization header",
      });
    }

    // Expected:
    // Authorization: Bearer TOKEN
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "No token provided",
      });
    }

    // Verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // Find user
    const user = await User.findById(decoded.id)
      .select("-password");

    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    // Store user in request
    req.user = user;

    next();

  } catch (error) {
    console.error("AUTH ERROR:", error);

    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};

export default authMiddleware;