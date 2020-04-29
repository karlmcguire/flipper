const pool = require("./pool.js")
const util = require("./util.js")

const Add = (user, bad, good) => pool.connect((err, client, done) => {
  const query = [
    `SELECT id FROM users 
       WHERE email = $1`,
    `INSERT INTO users (name, email, hash)
       VALUES($1, $2, $3)`,
  ]
  client.query("BEGIN", err => {
    if(util.Err(err)) {
      bad(err) 
      return
    }
    // check if email is already registered
    client.query(query[0], [user[1]], (err, res) => {
      if(util.Err(err)) {
        bad(err)
        return
      }
      // if user already registered, abort
      if(res.rows.length != 0) {
        util.Abort(client, done)
        bad(err)
        return
      }
      // insert new user
      client.query(query[1], user, (err, res) => {
        if(util.Err(err)) {
          bad(err)
          return
        }
        // finish tx
        client.query("COMMIT", err => {
          if(err) {
            console.error("error committing tx: ", err.stack)
            bad(err)
          }
          good()
          done()
        })
      })
    })
  })
})

module.exports = {
  Add,
}
