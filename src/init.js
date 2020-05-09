import Cookie from "./cookie"
import Config from "./config"
import State from "./state"
import Util from "./util"

const getInfo = state => {
  m.request({
    method: "GET",
    url: Config.api.info,
    withCredentials: true,
  }).then(res => {
      if("err" in res) { if(res.err != "invalid") console.error(res.err) }
      else Util.user.signIn(res)
    })
}

const getSaved = state => {
  m.request({
    method: "GET",
    url: Config.api.saved,
    withCredentials: true,
  }).then(res => {
      if("err" in res) { if(res.err != "invalid") console.error(res.err) }
      else Util.user.setSaved(res.saved)
    })
}

export default state => {
  state.name = window.localStorage.getItem("name")
  state.email = window.localStorage.getItem("email")
  state.saved = new Map(JSON.parse(window.localStorage.getItem("saved")))
  state.auth = ((state.name != null && state.email != null) ? true : false)

  if(document.cookie.indexOf(Config.session.cookie) < 0)
    return

  if(state.name == null || state.email == null)
    getInfo(state)
  
  if(window.localStorage.getItem("saved") == null)
    getSaved(state)
}
