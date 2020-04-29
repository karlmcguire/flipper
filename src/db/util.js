const pool = require("./pool.js")

const Abort = (client, done) => {
  client.query("ROLLBACK", err => {
    if(err) console.error("error rollingback client: ", err.stack)
  })
  done()
}

const Err = (err, client, done) => {
  if(err) {
    console.error("error in tx: ", err.stack)
    Abort(client, done)
  }
  return !!err
}

module.exports = {
  Abort,
  Err,
}
