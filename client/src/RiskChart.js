import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

function RiskChart({ risks }) {
  // If risks is empty, show nothing
  if (!risks || risks.length === 0) {
    return <p>No data available</p>;
  }

  // Build chart data only from statuses
  const data = [
    { name: 'Open', value: risks.filter(r => r.status === 'Open').length },
    { name: 'In Progress', value: risks.filter(r => r.status === 'In Progress').length },
    { name: 'Resolved', value: risks.filter(r => r.status === 'Resolved').length },
  ];

  const COLORS = ['#ff6961', '#fef9c3', '#77dd77'];

  return (
    <PieChart width={300} height={300}>
      <Pie
        data={data}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={100}
        label
      >
        {data.map((entry, index) => (
          <Cell key={index} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
}

export default RiskChart;
