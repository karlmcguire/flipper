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
        m(".column.is-two-thirds", m(".box", m(".columns", [
          m(".column.is-one-quarter", m("figure.image.is-4by4",
            m("img", {
              style: `height:122px;width:auto;`,
              src: item.img,
            }),
          )),
          m(".column.is-three-quarters", [
            m("h1", m("strong", item.name)),
            m(""),
          ]),
        ]))),
        m(".column.is-one-third", m(".box", {
          //style: `display:flex;flex-direction:column;height:100%;`,
        }, [
          m("table.table.is-striped.is-fullwidth", m("tbody", [
            m("tr", [
              m("th", "Current Price"),
              m("td", (item.current_price == "Not in Stock" ?
                "Out of stock" : item.current_price)),
            ]),
            m("tr", [
              m("th", "Highest Price"),
              m("td", item.highest_price),
            ]),
            m("tr", [
              m("th", "Lowest Price"),
              m("td", item.lowest_price),
            ]),
          ]))
        ]))
      ]),
      m(Price, item),
      m(Details, item),
    ]) 
  }
}
