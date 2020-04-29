const express = require("express")
const bcrypt = require("bcrypt")
const cors = require("cors")
const init = require("./db/init.js")
const user = require("./db/user.js")
const app = express()

init.Users()

// only for development
app.use(cors())

app.use(express.json())

app.post("/signup", (req, res) => {
  const user = req.body
  // hash password and attempt to add
  bcrypt.hash(user.password, 10, (err, hash) => {
    user.Add(
      [user.name, user.email, hash],
      err => res.json({err: "db"}),
      () => res.json({err: "none"}),
    )
  })
})

app.get("/", (req, res) => {
  user.Add({email: "karl@karlmcguire.com"}) 
  res.send("nothing")
})

app.listen(8080, () => {
  console.log("listening on :8080")
})
