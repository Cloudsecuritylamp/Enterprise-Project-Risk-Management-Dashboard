const express = require("express");
const cors = require("cors");

const app = express();

// Use Render's dynamic port
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.send("Backend API is running");
});

// Dummy Audit Logs route
app.get("/api/auditlogs", (req, res) => {
  res.json([
    { id: 1, action: "User logged in", user: "Jerry", timestamp: "2026-08-10 13:45" },
    { id: 2, action: "Risk created", user: "Jerry", timestamp: "2026-08-10 13:50" }
  ]);
});

// Start server (only once!)
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
