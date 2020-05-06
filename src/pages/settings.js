import State from "../model/state"

export default () => {
  return {
    oninit: () => {
      if(!State.signedIn) m.route.set("/login")
    },
    view: () => m(".main", m(".container.section", [
      m("h1.title", "Settings"),
      m("h3.subtitle.has-text-grey", "Under construction."),
    ])),
  }
}
