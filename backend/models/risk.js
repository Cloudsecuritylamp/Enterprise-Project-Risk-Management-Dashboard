const mongoose = require("mongoose");

const riskSchema = new mongoose.Schema({
  category: String,
  description: String,
  score: Number,
  status: String
});

module.exports = mongoose.model("Risk", riskSchema);
