const express = require("express")
const session = require("express-session")
const config = require("./config")
const redis = require("redis")
const cors = require("cors")

const state = require("./state")
const action = require("./action")
const model = require("./model")

const api = express()
const redisClient = redis.createClient()
const redisStore = require("connect-redis")(session)

if(config.dev) {
  api.use(cors({
    origin: config.dev.origin,
    preflightContinue: true,
    credentials: true,
  }))
}
api.use(express.json())
api.use(session({
  secret: config.sessions.secret,
  name: config.sessions.cookie.name,
  resave: false,
  saveUninitialized: false,
  cookie: config.sessions.cookie,
  store: new redisStore(config.sessions.redis(redisClient)),
}))

api.get("/user/info", async (req, res) => {
  res.json(await state(model.user.info(action.user.info(req))))
})

api.post("/user/signup", async (req, res) => {
  res.json(await state(model.user.signup(action.user.signup(req))))
})

api.post("/user/signin", async (req, res) => {
  res.json(await state(model.user.signin(action.user.signin(req))))
})

api.post("/user/signout", async (req, res) => {
  req.session.destroy(() => {
    res.clearCookie(config.sessions.cookie.name, {
      secure: config.sessions.cookie.secure,
      httpOnly: config.sessions.cookie.httpOnly,
      domain: config.sessions.cookie.domain,
      path: config.sessions.cookie.path,
    })
    res.json({})
  })
})

api.post("/user/save", async (req, res) => {
  res.json(await state(model.user.save(action.user.save(req))))
})

api.post("/user/unsave", async (req, res) => {
  res.json(await state(model.user.unsave(action.user.unsave(req))))
})

api.disable("x-powered-by")
api.listen(8080, () => {
  console.log("listening on :8080")
})
