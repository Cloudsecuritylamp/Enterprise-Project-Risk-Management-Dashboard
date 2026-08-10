const { Pool } = require("pg");

const pool = process.env.DATABASE_URL
  ? new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false } // required for Render Postgres
    })
  : new Pool({
      user: "postgres",        // your pgAdmin username
      host: "localhost",       // local server
      database: "riskdb",      // your local database name
      password: "yourpassword",// your pgAdmin password
      port: 5432               // default PostgreSQL port
    });

module.exports = pool;
