const Pool = require("pg").Pool;
require('dotenv').config();


const pool = new Pool({
    user: process.env.db_user,
    password: process.env.db_password,
    host: process.env.db_host,
    port: process.env.db_port,
    database: "workspace"
});

module.exports = pool;