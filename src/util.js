import Config from "./config"
import State from "./state"

export default {
  user: {
    signOut: () => {
      State.name = null
      State.email = null
      State.auth = false
      State.saved = new Map()
      window.localStorage.clear()
      fetch(Config.api.signout, {
        method: "POST",
        credentials: "include",
      })
        .then(res => res.json())
        .then(res => {if("err" in res) console.error(res.err)})
    },
    signIn: res => {
      State.name = res.name
      State.email = res.email
      State.auth = true
      window.localStorage.setItem("name", State.name)
      window.localStorage.setItem("email", State.email)
    },
    setSaved: saved => {
      State.saved = new Map(saved.reduce((acc, cur) => {
        acc.push([cur.item, cur.created])
        return acc
      }, []))
      window.localStorage.setItem("saved", JSON.stringify([...State.saved]))
    },
  },
}
