import State from "../state"
import Items from "../model/items"
import Item from "../components/item"

export default () => {
  return {
    oninit: () => {
      if(!State.auth) m.route.set("/login")
    },
    view: () => m(".main", m(".container.section", [
      m("h1.title", "Saved"),
      m("br"),
      m(".columns.is-multiline.d-flex",
        [...State.saved].map(([id, val]) => m(Item, {
          id: id,
          data: Items.get(id),
        })) 
      ),
    ])),
  }
}
