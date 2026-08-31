const express = require("express");
const router = express.Router();
const User = require("../models/User");

// POST /api/login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username, password });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    // For now, return a fake token (replace with JWT later)
    res.json({ token: "fake-jwt-token", role: user.role });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
