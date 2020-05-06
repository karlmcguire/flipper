const dotenv = require("dotenv")
const express = require("express")
const session = require("express-session")
const bcrypt = require("bcrypt")
const crypto = require("crypto")
const redis = require("redis")
const cors = require("cors")
const db = require("./db/pool")
const app = express()

const redisClient = redis.createClient()
const redisStore = require("connect-redis")(session)

dotenv.config()

app.use(cors())
app.use(session({
  secret: process.env.JWT_SECRET,
  name: "flipper",
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    httpOnly: true,
    domain: "lvh.me",
    path: "/",
  },
  store: new redisStore({
    host: "localhost",
    port: 6379,
    client: redisClient,
    ttl: 86400,
  }),
}))
app.use(express.json())

app.post("/signup", (req, res) => {
  const user = req.body
  bcrypt.hash(user.password, 10, (err, hash) => {
    if(err) console.error(err.stack)
    const query = `INSERT INTO users (name, email, hash)
      VALUES($1, $2, $3)
      RETURNING id`
    db.query(query, [user.name, user.email, hash])
      .then(r => {
        //res.json({token: token})
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
          req.session.name = r.rows[0].name
          res.json({name: r.rows[0].name,})
          console.log(res.headersSent)
        } else {
          // bad password
          res.json({err: "invalid"})
        }
      }) 
    })
    .catch(e => {
      console.log(e.stack)
      // user doesn't exist
      res.json({err: "missing"}) 
    })
})

/*
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

app.post("/user/unsave", (req, res) => {
  const user = {
    token: req.body.token,
    id: sessions.Get(req.body.token),
  }
  const item = req.body.id
  if(user.token == undefined) {
    res.json({err: "undefined"})
    return
  }
})

app.get("/sessions/has", (req, res) => {
  res.json({has: sessions.Has(req.query.token)})
})
*/

app.listen(8080, () => {
  console.log("listening on :8080")
})
