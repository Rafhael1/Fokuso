const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "Rafafoda123",
    host: "localhost",
    port: 5432,
    database: "workspace"
});

module.exports = pool;