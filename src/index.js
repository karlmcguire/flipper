const express = require("express")
const session = require("express-session")
const config = require("./config")
const redis = require("redis")
const db = require("./db/pool")

const api = express()
const redisClient = redis.createClient()
const redisStore = require("connect-redis")(session)

api.use(express.json())
api.use(session({
  secret: config.sessions.secret,
  name: config.name + "_session",
  resave: false,
  saveUninitialized: false,
  cookie: config.sessions.cookie,
  store: new redisStore(config.sessions.redis(redisClient)),
}))

api.get("/", (req, res) => {
  req.session.name = "karl" 
  res.json({hello: "world"})
})

api.listen(8080, () => {
  console.log("listening on :8080")
})
