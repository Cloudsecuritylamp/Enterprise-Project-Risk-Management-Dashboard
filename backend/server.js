const express = require("express");
const cors = require("cors");
const auditRoutes = require("./routes/auditRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.send("Backend API is running");
});

// Audit logs route
app.use("/api/auditlogs", auditRoutes);

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
