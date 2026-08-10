import React, { useEffect, useState } from "react";

function AuditLogs() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    // Fetch audit logs from backend API
    fetch("/api/auditlogs")
      .then((res) => res.json())
      .then((data) => setLogs(data))
      .catch((err) => console.error("Error fetching audit logs:", err));
  }, []);

  return (
    <div className="container">
      <h1>Audit Logs</h1>
      <table className="audit-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>User</th>
            <th>Action</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {logs.length > 0 ? (
            logs.map((log) => (
              <tr key={log.id}>
                <td>{log.id}</td>
                <td>{log.user}</td>
                <td>{log.action}</td>
                <td>{new Date(log.timestamp).toLocaleString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No audit logs found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AuditLogs;
