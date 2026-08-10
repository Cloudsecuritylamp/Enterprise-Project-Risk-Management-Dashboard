const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",        // your pgAdmin username
  host: "localhost",       // or your server host
  database: "riskdb",      // your database name
  password: "yourpassword",// your pgAdmin password
  port: 5432,              // default PostgreSQL port
});

module.exports = pool;
