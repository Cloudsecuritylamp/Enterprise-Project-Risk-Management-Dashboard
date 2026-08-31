import React, { useState } from "react";
import { addRisk } from "../api";

function RiskForm({ onRiskAdded }) {
  const [risk, setRisk] = useState({
    category: "",
    description: "",
    score: "",
    status: ""
  });

  const handleChange = (e) => {
    setRisk({ ...risk, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const saved = await addRisk(risk);
      onRiskAdded(saved); // notify parent (Risks.js)
      setRisk({ category: "", description: "", score: "", status: "" });
    } catch (err) {
      console.error("Error adding risk:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="risk-form">
      <h3>Add New Risk</h3>
      <input
        name="category"
        placeholder="Category"
        value={risk.category}
        onChange={handleChange}
      />
      <input
        name="description"
        placeholder="Description"
        value={risk.description}
        onChange={handleChange}
      />
      <input
        name="score"
        placeholder="Score"
        value={risk.score}
        onChange={handleChange}
      />
      <input
        name="status"
        placeholder="Status"
        value={risk.status}
        onChange={handleChange}
      />
      <button type="submit">Add Risk</button>
    </form>
  );
}

export default RiskForm;
