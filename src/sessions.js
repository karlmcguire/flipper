const sessions = new Map()

const Has = hash => sessions.has(hash)
const Add = (hash, id) => sessions.set(hash, id) 
const Get = hash => sessions.get(hash)
const Del = hash => sessions.delete(hash)

module.exports = {
  Has,
  Add,
  Get,
  Del
}
