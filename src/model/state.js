import Config from "../config"
import Cookie from "../cookie"

let state = {
  token: Cookie.Get(Config.client.tokenCookie),
  name: window.localStorage.getItem("name"),
  email: window.localStorage.getItem("email"),
  saved: new Map(JSON.parse(window.localStorage.getItem("saved"))),
}

const exit = () => {
  state.name = null
  state.email = null
  state.token = ""
  state.saved = null
  window.localStorage.clear()
  Cookie.Del(Config.client.tokenCookie)
}

if(state.token != "") {
  fetch(Config.api.sessions.has + `?token=${state.token}`)
  .then(res => res.json())
  .then(res => {
    if(!res.has) exit()
  })
}

export default {
  get name() { 
    return state.name
  }, 
  set name(name) { 
    state.name = name
    window.localStorage.setItem("name", name)
  },
  get email() {
    return state.email
  }, 
  set email(email) {
    state.email = email
    window.localStorage.setItem("email", email)
  },
  get token() {
    return state.token
  },
  set token(token) {
    state.token = token
    Cookie.Set(Config.client.tokenCookie, token, Config.client.tokenExDays)
  },
  saved: id => state.saved.has(id),
  save: id => {
    state.saved.set(id, true)
    window.localStorage.setItem("saved", JSON.stringify([...state.saved]))
  },
  unsave: id => {
    state.saved.delete(id)
    window.localStorage.setItem("saved", JSON.stringify([...state.saved]))
  },
  logOut: exit,
  // read-only
  get loggedIn() {
    return state.email != null && state.name != null
  },
}
