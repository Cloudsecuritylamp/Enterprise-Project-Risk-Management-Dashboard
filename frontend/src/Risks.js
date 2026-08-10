import React, { useEffect, useState } from "react";

function Risks() {
  const [risks, setRisks] = useState([]);

  useEffect(() => {
    // Fetch risks from backend API
    fetch("/api/risks")
      .then((res) => res.json())
      .then((data) => setRisks(data))
      .catch((err) => console.error("Error fetching risks:", err));
  }, []);

  return (
    <div className="container">
      <h1>Risks</h1>
      <table className="risk-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Risk Name</th>
            <th>Category</th>
            <th>Severity</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {risks.length > 0 ? (
            risks.map((risk) => (
              <tr key={risk.id}>
                <td>{risk.id}</td>
                <td>{risk.name}</td>
                <td>{risk.category}</td>
                <td>{risk.severity}</td>
                <td>{risk.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No risks found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Risks;
