import React, { useEffect, useState } from "react";
import { fetchRisks } from "../api";
import RiskForm from "./RiskForm";

function Risks() {
  const [risks, setRisks] = useState([]);
  const [riskToDelete, setRiskToDelete] = useState(null); // track selected risk

  useEffect(() => {
    fetchRisks()
      .then((data) => setRisks(data))
      .catch((err) => console.error(err));
  }, []);

  const handleRiskAdded = (newRisk) => {
    setRisks((prev) => [...prev, newRisk]);
  };

  const confirmDelete = async () => {
    if (!riskToDelete) return;
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`https://enterprise-project-risk-management.onrender.com/api/risks/${riskToDelete.id}`, {
        method: "DELETE",
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        }
      });
      if (!res.ok) throw new Error("Failed to delete risk");
      setRisks((prev) => prev.filter((risk) => risk.id !== riskToDelete.id));
      setRiskToDelete(null); // close modal
    } catch (err) {
      console.error(err);
    }
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
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {risks.map((risk) => (
            <tr key={risk.id}>
              <td>{risk.category}</td>
              <td>{risk.description}</td>
              <td>{risk.score}</td>
              <td>{risk.status}</td>
              <td>
                <button onClick={() => setRiskToDelete(risk)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Confirmation Modal */}
      {riskToDelete && (
        <div className="modal">
          <div className="modal-content">
            <p>Are you sure you want to delete <strong>{riskToDelete.category}</strong>?</p>
            <button onClick={confirmDelete}>Yes, Delete</button>
            <button onClick={() => setRiskToDelete(null)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Risks;
