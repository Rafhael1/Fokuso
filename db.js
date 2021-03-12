const Pool = require("pg").Pool;
require('dotenv').config();


const devConfig = {
    user: process.env.db_user,
    password: process.env.db_password,
    host: process.env.db_host,
    port: process.env.db_port,
    database: process.env.db_name
};

const proConfig = {
    connectionString: process.env.DATABASE_URL
}

const pool = new Pool(process.env.NODE_ENV === "production" ? proConfig : devConfig)

module.exports = pool;