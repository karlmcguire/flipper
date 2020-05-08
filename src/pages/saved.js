import State from "../model/state"
import Items from "../model/items"
import Item from "../components/item"

const saved = {
  view: vnode => [...State.saved].map(([key, val]) => {
    return m(Item, {
      id: key,
      data: Items.get(key),
    })
  })
}

const loading = {
  view: vnode => m("p", "loading..."),
}

export default () => {
  return {
    oninit: () => {
      if(!State.signedIn()) m.route.set("/login")
      const a = m.stream("hello")
      const b = m.stream("world")

      const greeting = m.stream.merge([a, b]).map(values => {
        return values.join(" ")
      })

      console.log(greeting())
    },
    view: () => m(".main", m(".container.section", [
      m("h1.title", "Saved"),
      m("br"),
      m(".columns.is-multiline.d-flex", 
        m((State.savedLoaded ? saved : loading)), 
      ),
    ])),
  }
}
