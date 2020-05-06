const express = require("express")
const session = require("express-session")
const config = require("./config")
const redis = require("redis")

const state = require("./state")
const action = require("./action")
const model = require("./model")

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

api.post("/user/signup", async (req, res) => {
  res.json(await state(model.user.signup(action.user.signup(req))))
})

api.disable("x-powered-by")
api.listen(8080, () => {
  console.log("listening on :8080")
})
