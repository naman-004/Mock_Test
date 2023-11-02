const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  host: "",
  database: "product_try",
  password: "naman@004",
  port: 5432,
});

module.exports = {
    pool
}