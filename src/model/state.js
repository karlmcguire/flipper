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

if(window.localStorage.getItem("saved") == null) {
  fetch(Config.api.saved, {
    method: "GET",
    credentials: "include",
  })
  .then(res => res.json())
  .then(res => {
    if("err" in res) {
      if(res.err != "invalid") console.error(res.err)
      return
    }
    if("saved" in res) {
      state.saved = new Map(res.saved.reduce((acc, cur) => {
        acc.push([cur.item, cur.created]) 
        return acc
      }, []))
      window.localStorage.setItem("saved", JSON.stringify([...state.saved]))
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
    state.saved.set(id, Date.now() / 1000)
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
  saved: state.saved,
  signedIn: () => state.email != null && state.name != null,
  isSaved: id => state.saved.has(id),
}
