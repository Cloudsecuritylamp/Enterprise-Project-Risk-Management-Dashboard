import React, { useEffect, useState } from 'react';
import AddRiskForm from './AddRiskForm';
import RiskChart from './RiskChart';
import RiskBarChart from './RiskBarChart';
import RiskLineChart from './RiskLineChart';

function App() {
  const [risks, setRisks] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    category: '',
    description: '',
    score: '',
    status: '',
    date_reported: ''
  });
  const [filter, setFilter] = useState(null);
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('darkMode') === 'true');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    fetch('http://localhost:5000/api/risks')
      .then(res => res.json())
      .then(data => setRisks(data));
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleRiskAdded = (newRisk) => setRisks([...risks, newRisk]);

  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/api/risks/${id}`, { method: 'DELETE' });
    setRisks(risks.filter(r => r.id !== id));
  };

  const startEdit = (risk) => {
    setEditingId(risk.id);
    setEditForm({
      category: risk.category,
      description: risk.description,
      score: risk.score,
      status: risk.status,
      date_reported: risk.date_reported.split('T')[0]
    });
  };

  const saveEdit = async (id) => {
    if (!editForm.category || !editForm.description || !editForm.status || !editForm.date_reported) {
      alert('All fields are required.');
      return;
    }
    if (isNaN(editForm.score) || editForm.score < 1 || editForm.score > 10) {
      alert('Score must be between 1 and 10.');
      return;
    }

    const response = await fetch(`http://localhost:5000/api/risks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editForm)
    });
    const updatedRisk = await response.json();
    setRisks(risks.map(r => r.id === id ? updatedRisk : r));
    setEditingId(null);
  };

  const totalRisks = risks.length;
  const avgScore = risks.length > 0 
    ? (risks.reduce((sum, r) => sum + Number(r.score), 0) / risks.length).toFixed(1) 
    : 0;
  const openCount = risks.filter(r => r.status === 'Open').length;
  const resolvedCount = risks.filter(r => r.status === 'Resolved').length;

  const filteredRisks = risks.filter(risk => {
    if (!filter) return true;
    if (filter === 'Open') return risk.status === 'Open';
    if (filter === 'Resolved') return risk.status === 'Resolved';
    if (filter === 'Total') return true;
    return true;
  });

  return (
    <div className={`App ${darkMode ? 'dark-mode' : ''}`}>
      <div className={`header ${scrolled ? 'scrolled' : ''}`}>
        <h1>Risk Dashboard</h1>
        <button 
          className="theme-toggle"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? '☀️' : '🌙'}
        </button>
      </div>

      <AddRiskForm onRiskAdded={handleRiskAdded} />

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Category</th>
            <th>Description</th>
            <th>Score</th>
            <th>Status</th>
            <th>Date Reported</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredRisks.map(risk => (
            <tr key={risk.id}>
              <td>{risk.id}</td>
              {editingId === risk.id ? (
                <>
                  <td><input value={editForm.category} onChange={e => setEditForm({...editForm, category: e.target.value})} /></td>
                  <td><input value={editForm.description} onChange={e => setEditForm({...editForm, description: e.target.value})} /></td>
                  <td><input type="number" value={editForm.score} onChange={e => setEditForm({...editForm, score: e.target.value})} /></td>
                  <td>
                    <select value={editForm.status} onChange={e => setEditForm({ ...editForm, status: e.target.value })}>
                      <option value="Open">Open</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Resolved">Resolved</option>
                    </select>
                  </td>
                  <td><input type="date" value={editForm.date_reported} onChange={e => setEditForm({...editForm, date_reported: e.target.value})} /></td>
                  <td>
                    <button onClick={() => saveEdit(risk.id)}>Save</button>
                    <button onClick={() => setEditingId(null)}>Cancel</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{risk.category}</td>
                  <td>{risk.description}</td>
                  <td>{risk.score}</td>
                  <td>{risk.status}</td>
                  <td>{new Date(risk.date_reported).toLocaleDateString()}</td>
                  <td>
                    <button onClick={() => startEdit(risk)}>Edit</button>
                    <button onClick={() => handleDelete(risk.id)}>Delete</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {filter && (
        <div>
          <button className="reset-button" onClick={() => setFilter(null)}>🔄 Reset Filters</button>
          <span className="active-filter-label">Active Filter: {filter}</span>
        </div>
      )}

      <div className="kpi-grid">
        <div className={`kpi-card ${filter === 'Total' ? 'active' : ''}`} onClick={() => setFilter('Total')}>
          <h3>📊 Total Risks</h3>
          <p>{totalRisks}</p>
        </div>
        <div className="kpi-card">
          <h3>⭐ Average Score</h3>
          <p>{avgScore}</p>
        </div>
        <div className={`kpi-card ${filter === 'Open' ? 'active' : ''}`} onClick={() => setFilter('Open')}>
          <h3>🔴 Open Risks</h3>
          <p>{openCount}</p>
        </div>
        <div className={`kpi-card ${filter === 'Resolved' ? 'active' : ''}`} onClick={() => setFilter('Resolved')}>
          <h3>✅ Resolved Risks</h3>
          <p>{resolvedCount}</p>
        </div>
      </div>

      <div className="charts-grid">
        <RiskChart risks={filteredRisks} />
        <RiskBarChart risks={filteredRisks} />
        <RiskLineChart risks={filteredRisks} />
      </div>
    </div>
  );
}

export default App;
