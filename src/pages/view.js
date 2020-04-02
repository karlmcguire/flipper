import Price from "../components/price"
import Details from "../components/details"

export default () => {
  return {
    view: (vnode) => m(".container.section", [
      m(".columns", [
        m(".column.is-one-half", m(".box", [
          m("br"),
          m("br"),
          m("br"),
          m("br"),
        ])),
        m(".column.is-one-half", m(".box", [
          m("br"),
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
