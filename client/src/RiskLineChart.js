import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';

function RiskLineChart({ risks }) {
  if (!risks || risks.length === 0) {
    return <p>No data available</p>;
  }

  // Group risks by reported date
  const dateCounts = risks.reduce((acc, r) => {
    const date = new Date(r.date_reported).toLocaleDateString();
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  const data = Object.entries(dateCounts).map(([date, count]) => ({
    date,
    count
  }));

  return (
    <LineChart width={500} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="count" stroke="#8884d8" />
    </LineChart>
  );
}

export default RiskLineChart;
