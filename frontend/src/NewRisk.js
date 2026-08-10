import React, { useState } from "react";

function NewRisk() {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    severity: "",
    status: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("/api/risks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    })
      .then((res) => res.json())
      .then((data) => {
        alert("Risk added successfully!");
        setFormData({ name: "", category: "", severity: "", status: "" });
      })
      .catch((err) => console.error("Error adding risk:", err));
  };

  return (
    <div className="container">
      <h1>Add New Risk</h1>
      <form className="risk-form" onSubmit={handleSubmit}>
        <label>
          Risk Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Category:
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Severity:
          <select
            name="severity"
            value={formData.severity}
            onChange={handleChange}
            required
          >
            <option value="">Select severity</option>
            <option value="Low">Low</option>
            <option value="Moderate">Moderate</option>
            <option value="High">High</option>
          </select>
        </label>

        <label>
          Status:
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
          >
            <option value="">Select status</option>
            <option value="Open">Open</option>
            <option value="Mitigated">Mitigated</option>
            <option value="Closed">Closed</option>
          </select>
        </label>

        <button type="submit">Add Risk</button>
      </form>
    </div>
  );
}

export default NewRisk;
