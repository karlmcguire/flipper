import Cookie from "./cookie"
import Config from "./config"
import State from "./state"

const getInfo = state => {
  m.request({
    method: "GET",
    url: Config.api.info,
    withCredentials: true,
  }).then(res => {
      if("err" in res) {
        if(res.err != "invalid") console.error(res.err)
        return
      }
      state.name = res.name
      state.email = res.email
      window.localStorage.setItem("name", state.name)
      window.localStorage.setItem("email", state.email)
      state.auth = true
    })
}

const getSaved = state => {
  m.request({
    method: "GET",
    url: Config.api.saved,
    withCredentials: true,
  }).then(res => {
      if("err" in res) {
        if(res.err != "invalid") console.error(res.err)
        return
      }
      const saved = res.saved.reduce((acc, cur) => {
        acc.push([cur.item, cur.created])
        return acc
      }, [])
      window.localStorage.setItem("saved", JSON.stringify([...state.saved]))
      state.saved = new Map(saved)
    })
}

export default state => {
  state.name = window.localStorage.getItem("name")
  state.email = window.localStorage.getItem("email")
  state.saved = new Map(JSON.parse(window.localStorage.getItem("saved")))
  state.auth = ((state.name != null && state.email != null) ? true : false)

  if(state.name == null || state.email == null)
    getInfo(state)
  
  if(window.localStorage.getItem("saved") == null)
    getSaved(state)
}
