const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");

const loginRoute = require("./login");
const auditRoutes = require("./auditRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Backend is alive!");
});

app.use("/api", loginRoute);
app.use("/api", auditRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
