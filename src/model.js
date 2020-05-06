const bcrypt = require("bcrypt")
const db = require("./db/pool")

const signup = async user => {
  const hash = await bcrypt.hash(user.password, 10)
  delete user.password
  try {
    const text = `INSERT INTO users (name, email, hash)
      VALUES ($1, $2, $3)
      RETURNING id`
    const {rows} = await db.query(text, [user.name, user.email, hash])
    user.session.id = rows[0].id
    user.session.name = user.name
    user.session.email = user.email
    return user.session
  } catch(err) {
    return {err: "existing"}
  }
}

const signin = async user => {
  try {
    const text = `SELECT id, name, hash FROM users WHERE email = $1`
    const {rows} = await db.query(text, [user.email])
    const good = await bcrypt.compare(user.password, rows[0].hash)
    if(good) {
      user.session.id = rows[0].id
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

module.exports = {
  user: {
    signup: signup,
    signin: signin,
  },
}
