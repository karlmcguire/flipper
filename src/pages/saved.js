import State from "../model/state"

export default () => {
  return {
    oninit: () => {
      if(!State.loggedIn) m.route.set("/#!/login")
    },
    view: () => m(".main", m(".container.section", [
      m("h1.title", "Saved"),
    ])),
  }
}
