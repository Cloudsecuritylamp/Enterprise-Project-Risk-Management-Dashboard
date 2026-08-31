import React, { useEffect, useState } from "react";
import { fetchRisks, addRisk } from "../api";

function RiskDashboard() {
  const [risks, setRisks] = useState([]);
  const [newRisk, setNewRisk] = useState({ title: "", severity: "" });

  // Load risks on mount
  useEffect(() => {
    fetchRisks()
      .then(setRisks)
      .catch(err => console.error("Error fetching risks:", err));
  }, []);

  // Handle adding a new risk
  const handleAddRisk = async () => {
    try {
      const saved = await addRisk(newRisk);
      setRisks([...risks, saved]);
      setNewRisk({ title: "", severity: "" });
    } catch (err) {
      console.error("Error adding risk:", err);
    }
  };

  return (
    <div>
      <h1>Risk Dashboard</h1>

      <div>
        <input
          type="text"
          placeholder="Risk title"
          value={newRisk.title}
          onChange={e => setNewRisk({ ...newRisk, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Severity"
          value={newRisk.severity}
          onChange={e => setNewRisk({ ...newRisk, severity: e.target.value })}
        />
        <button onClick={handleAddRisk}>Add Risk</button>
      </div>

      <ul>
        {risks.map(r => (
          <li key={r._id}>
            {r.title} — {r.severity}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RiskDashboard;
