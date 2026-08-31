import React, { useEffect, useState } from "react";
import { fetchRisks } from "../api";
import RiskForm from "./RiskForm";

function Risks() {
  const [risks, setRisks] = useState([]);

  // Load risks on mount
  useEffect(() => {
    fetchRisks()
      .then((data) => setRisks(data))
      .catch((err) => console.error("Error fetching risks:", err));
  }, []);

  // Add new risk to state after form submission
  const handleRiskAdded = (newRisk) => {
    setRisks((prev) => [...prev, newRisk]);
  };

  return (
    <div className="container">
      <h2>Risks</h2>
      <RiskForm onRiskAdded={handleRiskAdded} />

      <table className="risk-table">
        <thead>
          <tr>
            <th>Category</th>
            <th>Description</th>
            <th>Score</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {risks.map((risk) => (
            <tr key={risk.id || risk._id}>
              <td>{risk.category}</td>
              <td>{risk.description}</td>
              <td>{risk.score}</td>
              <td>{risk.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Risks;
