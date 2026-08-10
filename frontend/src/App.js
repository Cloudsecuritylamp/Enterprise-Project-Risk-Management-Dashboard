import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Navbar from "./Navbar";
import Risks from "./Risks";
import NewRisk from "./NewRisk";
import AuditLogs from "./components/AuditLogs";

function App() {
  return (
    <>
      <Navbar />
      <div style={{ padding: "20px" }}>
        <Routes>
          {/* Homepage with clickable cards */}
          <Route
            path="/"
            element={
              <div className="dashboard-container">
                <h1>Welcome to Risk Dashboard</h1>
                <div className="card-grid">
                  <Link to="/risks" className="card">
                    <h2>Risks</h2>
                    <p>View and manage all identified risks.</p>
                  </Link>
                  <Link to="/new-risk" className="card">
                    <h2>New Risk</h2>
                    <p>Add a new risk entry to the system.</p>
                  </Link>
                  <Link to="/auditlogs" className="card">
                    <h2>Audit Logs</h2>
                    <p>Track system activity and user actions.</p>
                  </Link>
                </div>
              </div>
            }
          />

          {/* Other routes */}
          <Route path="/risks" element={<Risks />} />
          <Route path="/new-risk" element={<NewRisk />} />
          <Route path="/auditlogs" element={<AuditLogs />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
