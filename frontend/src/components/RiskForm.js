import React, { useState } from "react";   // clean import

function RiskForm({ onRiskAdded }) {
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [score, setScore] = useState("");
  const [status, setStatus] = useState("Open");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token"); // JWT from login
    try {
      const res = await fetch("https://enterprise-project-risk-management.onrender.com/api/risks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify({ category, description, score, status })
      });

      if (!res.ok) throw new Error("Failed to create risk");
      const newRisk = await res.json();

      onRiskAdded(newRisk);

      setCategory("");
      setDescription("");
      setScore("");
      setStatus("Open");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form className="risk-form" onSubmit={handleSubmit}>
      <label>
        Category
        <input value={category} onChange={(e) => setCategory(e.target.value)} required />
      </label>
      <label>
        Description
        <input value={description} onChange={(e) => setDescription(e.target.value)} required />
      </label>
      <label>
        Score
        <input type="number" value={score} onChange={(e) => setScore(e.target.value)} required />
      </label>
      <label>
        Status
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="Open">Open</option>
          <option value="Closed">Closed</option>
        </select>
      </label>
      <button type="submit">Add Risk</button>
    </form>
  );
}

export default RiskForm;
