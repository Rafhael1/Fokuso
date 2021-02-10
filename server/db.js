const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "kth18822",
    host: 5432,
    database: "workspace"
});

module.exports = pool;