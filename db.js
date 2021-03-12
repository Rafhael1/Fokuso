const Pool = require("pg").Pool;
require('dotenv').config();


const pool = new Pool({
    user: process.env.db_user,
    password: process.env.db_password,
    host: "localhost",
    port: 5432,
    database: process.env.db_name
});

module.exports = pool;