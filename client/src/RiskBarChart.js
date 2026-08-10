import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';

function RiskBarChart({ risks }) {
  if (!risks || risks.length === 0) {
    return <p>No data available</p>;
  }

  // Group risks by category
  const categories = [...new Set(risks.map(r => r.category))];
  const data = categories.map(cat => ({
    category: cat,
    count: risks.filter(r => r.category === cat).length
  }));

  return (
    <BarChart width={400} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="category" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="count" fill="#61dafb" />
    </BarChart>
  );
}

export default RiskBarChart;
