import React, { useEffect, useState } from "react";
import { fetchRisks } from "../api";

function Risks() {
  const [risks, setRisks] = useState([]);

  useEffect(() => {
    fetchRisks()
      .then((data) => setRisks(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="container">
      <h2>Risks</h2>
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
            <tr key={risk.id}>
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
