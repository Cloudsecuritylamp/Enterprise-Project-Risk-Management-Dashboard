const mongoose = require('mongoose');

const RiskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  severity: { type: String, required: true },
  owner: { type: String, required: true },
  likelihood: { type: Number, required: true },
  impact: { type: Number, required: true }
});

module.exports = mongoose.model('Risk', RiskSchema);
