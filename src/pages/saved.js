import State from "../model/state"
import Items from "../model/items"
import Item from "../components/item"

export default () => {
  return {
    oninit: () => {
      if(!State.signedIn) m.route.set("/login")
    },
    view: () => m(".main", m(".container.section", [
      m("h1.title", "Saved"),
      m("br"),
      m(".columns.is-multiline.d-flex",
        [...State.saved].map(([key, val]) => m(Item, {id: key, data: Items.get(key)}))
      ),
    ])),
  }
}
