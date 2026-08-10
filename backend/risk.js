const express = require("express");
const router = express.Router();
const pool = require("../db"); // import db connection
const authenticateToken = require("../middleware/auth");

// GET all risks
router.get("/api/risks", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM risks ORDER BY id ASC");
    res.json(result.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// POST new risk
router.post("/api/risks", authenticateToken, async (req, res) => {
  const { category, description, score, status } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO risks (category, description, score, status) VALUES ($1, $2, $3, $4) RETURNING *",
      [category, description, score, status]
    );

    const newRisk = result.rows[0];

    // Insert audit log
    await pool.query(
      "INSERT INTO audit_logs (user_name, role, action, risk_id) VALUES ($1, $2, $3, $4)",
      [req.user.username, req.user.role, "CREATE", newRisk.id]
    );

    res.json(newRisk);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// PUT update risk
router.put("/api/risks/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { category, description, score, status } = req.body;
  try {
    const result = await pool.query(
      "UPDATE risks SET category=$1, description=$2, score=$3, status=$4 WHERE id=$5 RETURNING *",
      [category, description, score, status, id]
    );

    const updatedRisk = result.rows[0];

    // Insert audit log
    await pool.query(
      "INSERT INTO audit_logs (user_name, role, action, risk_id) VALUES ($1, $2, $3, $4)",
      [req.user.username, req.user.role, "UPDATE", id]
    );

    res.json(updatedRisk);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// DELETE risk
router.delete("/api/risks/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM risks WHERE id=$1", [id]);

    // Insert audit log
    await pool.query(
      "INSERT INTO audit_logs (user_name, role, action, risk_id) VALUES ($1, $2, $3, $4)",
      [req.user.username, req.user.role, "DELETE", id]
    );

    res.send("Risk deleted");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// GET audit logs
router.get("/api/auditlogs", authenticateToken, async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM audit_logs ORDER BY timestamp DESC");
    res.json(result.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
