const pool = require("./pool.js")

pool.on("connect", () => console.log("connected to db"))

const Users = () => pool
  .query(`CREATE TABLE IF NOT EXISTS users
            (id SERIAL PRIMARY KEY,
             name VARCHAR(100),
             email VARCHAR(100) UNIQUE NOT NULL,
             hash VARCHAR(60) NOT NULL,
             created TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP)`)
  .then(res => console.log(res.rows))
  .catch(err => console.log(err))

module.exports = {
  Users,
}
