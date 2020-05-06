const { Pool } = require("pg")
const init = require("./init")

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  idleTimeoutMillis: 60 * 1000,
})

pool.on("connect", (err, client) => console.log("connected: " + err.stack))
pool.on("error", (err, client) => console.error("idle client: " + err))

init(pool)

console.log("connected to db")

module.exports = pool
