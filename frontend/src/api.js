// Choose API base depending on environment
const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://enterprise-project-risk-management.onrender.com/api"
    : "http://localhost:5000/api";

// Retrieve token from localStorage
function getToken() {
  return localStorage.getItem("token");
}

// Build headers with optional Authorization
function getHeaders() {
  const token = getToken();
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
}

// --- API functions ---

export async function fetchAuditLogs() {
  const res = await fetch(`${API_URL}/auditlogs`, { headers: getHeaders() });
  if (!res.ok) throw new Error("Failed to fetch audit logs");
  return res.json();
}

export async function fetchRisks() {
  const res = await fetch(`${API_URL}/risks`, { headers: getHeaders() });
  if (!res.ok) throw new Error("Failed to fetch risks");
  return res.json();
}

export async function addRisk(riskData) {
  const res = await fetch(`${API_URL}/risks`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(riskData),
  });
  if (!res.ok) throw new Error("Failed to add risk");
  return res.json();
}

export async function loginUser(credentials) {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  if (!res.ok) throw new Error("Login failed");
  const data = await res.json();
  localStorage.setItem("token", data.token);
  return data;
}
