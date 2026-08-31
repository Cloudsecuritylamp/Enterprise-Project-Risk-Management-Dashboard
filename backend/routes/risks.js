const express = require("express");
const router = express.Router();
const Risk = require("../models/Risk");
const AuditLog = require("../models/AuditLog");

router.get("/", async (req, res) => {
  try {
    const risks = await Risk.find();
    res.json(risks);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const risk = new Risk(req.body);
    await risk.save();

    await AuditLog.create({
      user_name: "admin",
      role: "admin",
      action: "CREATE",
      risk_id: risk._id,
      timestamp: new Date()
    });

    res.json(risk);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
