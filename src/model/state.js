import Config from "../config"
import Cookie from "../cookie"

let state = {
  name: window.localStorage.getItem("name"),
  email: window.localStorage.getItem("email"),
  token: Cookie.Get(Config.client.tokenCookie),
}

if(state.token != "") {
  fetch(Config.api.sessions.has + `?token=${state.token}`)
  .then(res => res.json())
  .then(res => {
    if(!res.has) {
      // delete everything, log out 
    }
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
  logOut: () => {
    state.name = null
    state.email = null
    state.token = ""
    window.localStorage.clear()
    Cookie.Del(Config.client.tokenCookie)
  },
  // read-only
  get loggedIn() {
    return state.email != null && state.name != null
  },
}
