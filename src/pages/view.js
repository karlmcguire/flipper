import Config from "../config"
import State from "../state"
import Items from "../model/items"
import Price from "../components/price"
import Details from "../components/details"

export default () => {
  let item = {}
  let saved = false
  return {
    oninit: (vnode) => {
      item = Items.get(vnode.attrs.id)
      window.scrollTo(0, 0)
      saved = State.saved.has(vnode.attrs.id)
    },
    view: (vnode) => m(".main", m(".container.section", [
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
            m("br"),
            m(".level", [
              m(".level-left", [
                m("a.button.is-warning.has-text-weight-semibold", {
                  target: "_",
                  href: "https://amzn.com/" + vnode.attrs.id, 
                }, "View on Amazon")
              ]),
              m(".level-right", [
                m("a.button" + 
                  (saved ? ".is-danger" : ".is-link") +
                  (State.auth ? "" : ".is-hidden"), {
                  onclick: e => {
                    if(saved) {
                      State.saved.delete(vnode.attrs.id)
                      saved = false
                    } else {
                      State.saved.set(vnode.attrs.id, Date.now() / 1000)
                      saved = true
                    }
                    window.localStorage.setItem("saved",
                      JSON.stringify([...State.saved]))
                    fetch((saved ? Config.api.save : Config.api.unsave), {
                      method: "POST",
                      credentials: "include",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        item: vnode.attrs.id,
                      }),
                    })
                      .then(res => res.json())
                      .then(res => {if("err" in res) console.error(res.err)})

                  },
                }, (saved ? "Saved" : "Save"))
              ]),
            ]),
          ]),
        ]))),
        m(".column.is-one-third", m(".box", {
          style: `display:flex;flex-direction:column;height:100%;`,
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
    ]))
  }
}
