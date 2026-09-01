import React, { useEffect, useState } from "react";
import { fetchAuditLogs } from "../api";

function AuditLogs() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetchAuditLogs()
      .then((data) => setLogs(data))
      .catch((err) => console.error("Error fetching audit logs:", err));
  }, []);

  return (
    <div className="container">
      <h2>Audit Logs</h2>
      <table className="audit-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Action</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log.id || log._id}>
              <td>{log.user}</td>
              <td>{log.action}</td>
              <td>{log.timestamp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AuditLogs;
