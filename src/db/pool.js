const { Pool } = require("pg")
const init = require("./init")

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  idleTimeoutMillis: 60 * 1000,
})

pool.on("connect", () => console.log("connected to db"))
pool.on("error", (err, client) => console.error("idle client: " + err))

init(pool)

module.exports = pool
