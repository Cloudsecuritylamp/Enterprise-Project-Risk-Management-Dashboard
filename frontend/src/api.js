const BASE_URL = "https://enterprise-project-risk-management.onrender.com/api";

function getToken() {
  return localStorage.getItem("token");
}

function getHeaders() {
  const token = getToken();
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
}

export async function fetchAuditLogs() {
  const res = await fetch(`${BASE_URL}/auditlogs`, { headers: getHeaders() });
  if (!res.ok) throw new Error("Failed to fetch audit logs");
  return res.json();
}

export async function fetchRisks() {
  const res = await fetch(`${BASE_URL}/risks`, { headers: getHeaders() });
  if (!res.ok) throw new Error("Failed to fetch risks");
  return res.json();
}

export async function loginUser(credentials) {
  const res = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials)
  });
  if (!res.ok) throw new Error("Login failed");
  const data = await res.json();
  localStorage.setItem("token", data.token);
  return data;
}
