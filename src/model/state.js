import Cookie from "../cookie"
import Config from "../config"

const state = {
  name: window.localStorage.getItem("name"),
  email: window.localStorage.getItem("email"),
  saved: new Map(JSON.parse(window.localStorage.getItem("saved"))),
}

if((state.name == null || state.email == null)) {
  fetch(Config.api.info, {
    method: "GET",
    credentials: "include",
  })
  .then(res => res.json())
  .then(res => {
    if("err" in res) {
      if(res.err != "invalid") console.error(res.err)
      return
    }
    if("name" in res && "email" in res) {
      state.name = res.name
      window.localStorage.setItem("name", state.name)
      state.email = res.email
      window.localStorage.setItem("email", state.email)
      m.redraw() 
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
  
  save: id => {
    state.saved.set(id, true)
    window.localStorage.setItem("saved", JSON.stringify([...state.saved]))
  },
  unsave: id => {
    state.saved.delete(id)
    window.localStorage.setItem("saved", JSON.stringify([...state.saved]))
  },
  signOut: () => {
    state.name = null
    state.email = null
    state.saved = new Map()
    window.localStorage.clear()
    fetch(Config.api.signout, {
      method: "POST",
      credentials: "include",
    })
    .then(res => res.json())
    .then(res => {
      if("err" in res) {
        console.error(res.err)
        return
      }
    })
  },
  
  signedIn: () => state.email != null && state.name != null,
  
  saved: id => state.saved.has(id),
}
