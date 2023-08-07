const Pool = require('pg').Pool

const pool = new Pool({
    user:"YOUR_POSTGRES_USERNAME",
    password:"YOUR_POSTGRES_PASSWORD",
    database:"todo_database",
    host:"localhost",
    port:5432
});

module.exports = pool;