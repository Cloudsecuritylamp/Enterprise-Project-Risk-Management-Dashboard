import React, { useState } from 'react';

function AddRiskForm({ onRiskAdded }) {
  const [form, setForm] = useState({
    category: '',
    description: '',
    score: '',
    status: 'Open',
    date_reported: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.category || !form.description || !form.date_reported) {
      alert('Category, description, and date are required.');
      return;
    }
    if (isNaN(form.score) || form.score < 1 || form.score > 10) {
      alert('Score must be between 1 and 10.');
      return;
    }

    const response = await fetch('http://localhost:5000/api/risks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    const newRisk = await response.json();
    onRiskAdded(newRisk);

    setForm({
      category: '',
      description: '',
      score: '',
      status: 'Open',
      date_reported: ''
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
      <input
        placeholder="Category"
        value={form.category}
        onChange={e => setForm({ ...form, category: e.target.value })}
      />
      <input
        placeholder="Description"
        value={form.description}
        onChange={e => setForm({ ...form, description: e.target.value })}
      />
      <input
        type="number"
        placeholder="Score (1-10)"
        value={form.score}
        onChange={e => setForm({ ...form, score: e.target.value })}
      />
      <select
        value={form.status}
        onChange={e => setForm({ ...form, status: e.target.value })}
      >
        <option value="Open">Open</option>
        <option value="In Progress">In Progress</option>
        <option value="Resolved">Resolved</option>
      </select>
      <input
        type="date"
        value={form.date_reported}
        onChange={e => setForm({ ...form, date_reported: e.target.value })}
      />
      <button type="submit">Add Risk</button>
    </form>
  );
}

export default AddRiskForm;
