const bcrypt = require("bcrypt")
const db = require("./db/pool")

const signedIn = session => session.uid != null

const info = async user => {
  if(!signedIn(user)) return {err: "invalid"}
  return user.session
}

const signup = async user => {
  if(signedIn(user.session)) return user.session
  const hash = await bcrypt.hash(user.password, 10)
  delete user.password
  try {
    const text = `INSERT INTO users (name, email, hash) VALUES ($1, $2, $3)
      RETURNING id`
    const {rows} = await db.query(text, [user.name, user.email, hash])
    user.session.uid = rows[0].id
    user.session.name = user.name
    user.session.email = user.email
    return user.session
  } catch(err) {
    return {err: "existing"}
  }
}

const signin = async user => {
  if(signedIn(user.session)) return user.session
  try {
    const text = `SELECT id, name, hash FROM users WHERE email = $1`
    const {rows} = await db.query(text, [user.email])
    const good = await bcrypt.compare(user.password, rows[0].hash)
    if(good) {
      user.session.uid = rows[0].id
      user.session.name = rows[0].name
      user.session.email = user.email
      return user.session
    } else {
      return {err: "invalid"}
    }
  } catch(err) {
    return {err: "unknown"}
  }
}

const save = async data => {
  if(!signedIn(data.session)) return {err: "invalid"}
  try {
    const text = `INSERT INTO saved ("user", item) VALUES ($1, $2)`
    await db.query(text, [data.session.uid, data.item])
    return {}
  } catch(err) {
    console.error(err.stack)
    return {err: "unknown"}
  }
}

const unsave = async data => {
  if(!signedIn(data.session)) return {err: "invalid"}
  try {
    const text = `DELETE FROM saved WHERE "user" = $1 AND item = $2`
    await db.query(text, [data.session.uid, data.item])
    return {}
  } catch(err) {
    console.error(err.stack)
    return {err: "unknown"}
  }
}

module.exports = {
  user: {
    info: info,
    signup: signup,
    signin: signin,
    save: save,
    unsave: unsave,
  },
}
