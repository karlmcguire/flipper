const config = require("../config.js")
const { Pool } = require("pg")
const init = require("./init")

const pool = new Pool(config.database.postgres)

pool.on("connect", (err, client) => console.log("connected to db"))
pool.on("error", (err, client) => console.error("idle client: " + err))

init(pool)

module.exports = pool
