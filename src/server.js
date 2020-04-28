const express = require("express")
const cors = require("cors")
const pool = require("./db/pool.js")
const init = require("./db/init.js")
const app = express()

init.Users()

// only for development
app.use(cors())

app.use(express.json())

app.post("/signup", (req, res) => {
  console.log(req.body)
  res.json({
    testing: "testing",
  })
})

app.get("/", (req, res) => {
  pool
    .query("SELECT * FROM users", null)
    .then(res => console.log(res.rows))
    .catch(err => console.log(err))
})

app.listen(8080, () => {
  console.log("listening on :8080")
})
