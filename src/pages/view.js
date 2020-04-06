import Items from "../model/items"
import Price from "../components/price"
import Details from "../components/details"

export default () => {
  let item = {}
  return {
    oninit: (vnode) => {
      item = Items.get(vnode.attrs.id)
    },
    view: (vnode) => m(".container.section", [
      m(".columns", [
        m(".column.is-one-half", m(".box", [
          m("p", item.name),
          m("br"),
          m("br"),
          m("br"),
          m("br"),
        ])),
        m(".column.is-one-half", m(".box", [
          m("p", item.desc),
          m("br"),
          m("br"),
          m("br"),
        ]))
      ]),
      m(Price),
      m(Details),
    ]) 
  }
}
