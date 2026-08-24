import "dotenv/config";

import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import memberRoutes from "./routes/memberRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/members", memberRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/comments", commentRoutes);

app.get("/", (req, res) => {
  res.send("🚀 TaskFlow Backend Running...");
});

app.get("/api/test", (req, res) => {
  res.json({ message: "API is working" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});