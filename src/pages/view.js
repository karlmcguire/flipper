import Charts from "../components/charts"

export default () => {
  return {
    view: (vnode) => m(".container.section", m(".columns", [
      m(".column.is-one-third", m(".panel", [
        m("p.panel-heading", "Item"),
      ])),
      m(".column.is-two-thirds", m(Charts)),
    ]))
  }
}
