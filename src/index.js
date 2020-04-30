const dotenv = require("dotenv")
dotenv.config()

const express = require("express")
const cookieParser = require("cookie-parser")
const bcrypt = require("bcrypt")
const cors = require("cors")
const jwt = require("jsonwebtoken")
const db = require("./db/pool")
const app = express()

app.use(cors())
app.use(express.json())
app.use(cookieParser())

app.post("/signup", (req, res) => {
  const user = req.body
  bcrypt.hash(user.password, 10, (err, hash) => {
    if(err) console.error(err.stack)
    const query = `INSERT INTO users (name, email, hash)
      VALUES($1, $2, $3)
      RETURNING id`
    db.query(query, [user.name, user.email, hash])
      .then(r => {
        // generate jwt
        const token = jwt.sign({
          id: r.rows[0].id,
          name: user.name,
          email: user.email,
        }, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRE,
        })
        // TODO: the set-cookie header isn't working, this has something to do
        //       with the path or domain under a localhost environment, need to
        //       fix so we can simulate token cookies during development
        res.cookie("token", token, {
          maxAge: 600000,
        })
        res.json({err: null})
      })
      .catch(e => {
        console.error(e.stack)
        res.json({err: "db"})
      })
  })
})

app.get("/", (req, res) => {
  res.send("nothing")
})

app.listen(8080, () => {
  console.log("listening on :8080")
})
