const dotenv = require("dotenv")
dotenv.config()

const express = require("express")
const cookieParser = require("cookie-parser")
const sessions = require("./sessions")
const bcrypt = require("bcrypt")
const crypto = require("crypto")
const cors = require("cors")
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
        // TODO: use time-sensitive tokens
        const token = crypto
                        .createHash("sha256")
                        .update(process.env.JWT_SECRET + hash)
                        .digest("base64")
        sessions.Add(token, r.rows[0].id)
        res.json({token: token})
      })
      .catch(e => {
        console.error(e.stack)
        res.json({err: "db"})
      })
  })
})

app.post("/login", (req, res) => {
  const user = req.body
  const query = `SELECT id, name, hash FROM users WHERE email = $1`
  db.query(query, [user.email])
    .then(r => {
      bcrypt.compare(user.password, r.rows[0].hash, (err, good) => {
        if(good) {
          // TODO: use time-sensitive tokens
          const token = crypto
                          .createHash("sha256")
                          .update(process.env.JWT_SECRET + r.rows[0].hash)
                          .digest("base64")
          sessions.Add(token, r.rows[0].id)
          res.json({
            name: r.rows[0].name,
            token: token,
          })
        } else {
          // bad password
          res.json({err: "invalid"})
        }
      }) 
    })
    .catch(e => {
      // user doesn't exist
      res.json({err: "missing"}) 
    })
})

app.post("/user/save", (req, res) => {
  const user = {
    token: req.body.token,
    id: sessions.Get(req.body.token),
  }
  const item = req.body.id
  if(user.token == undefined) {
    res.json({err: "expired"})
    return
  }
  const query = `INSERT INTO saved ("user", "item") VALUES($1, $2)`
  db.query(query, [user.id, item])
    .then(r => res.json({}))
    .catch(e => {
      console.log(e.stack)
      res.json({err: "db"})
    })
})

app.get("/sessions/has", (req, res) => {
  res.json({has: sessions.Has(req.query.token)})
})

app.listen(8080, () => {
  console.log("listening on :8080")
})
