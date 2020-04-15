import Items from "../model/items"
import Item from "../components/item"

const menu = {
  view: () => m("nav.level", [
    m(".level-left", [
      m(".level-item", m("p.subtitle.is-5", m.trust(`
        <strong>1852</strong> items
      `))),
      m(".level-item", m(".field.has-addons", [
        m("p.control", m("input.input", {
          "type": "text",
          "placeholder": "Find an item",
        })),
        m("p.control", m("button.button", "Search"))
      ]))
    ]),
    m(".level-right", [
      m("p.level-item", m("strong", "All")),
      m("p.level-item", m("a", "Amazon")),
      m("p.level-item", m("a", "Ebay")),
      m("p.level-item", m("a", "Alibaba")),
    ]),
  ])
}

export default () => {
  let currPage = 0
  const pageSize = 16
  const pages = Math.ceil(Items.size / pageSize)
  let prevAttr = {disabled: ""}
  let nextAttr = {}
  const items = Array.from(Items)
  return {
    oninit: (vnode) => {
      console.log(vnode.attrs.page)
    },
    onupdate: (vnode) => {
      console.log("hello")
    },
    view: (vnode) => m(".container.section", [
      m(menu),
      m("br"),
      m(".columns.is-multiline.d-flex", {
      }, items.slice(currPage * pageSize, currPage * pageSize + pageSize).map(
          ([key, val]) => m(Item, {id: key, data: val})),
      ),
      m("br"),
      m("nav.pagination.is-centered", {
        "role": "navigation",
        "aria-label": "pagination",
      }, [
        m("a.pagination-previous", {
          disabled: "",
          onclick: (e) => {
            e.target.nextSibling.removeAttribute("disabled")
            if(currPage != 0)
              currPage--
            if(currPage == 0)
              e.target.setAttribute("disabled", "")
          },
        }, "Previous"),
        m("a.pagination-next", {
          onclick: (e) => {
            e.target.previousSibling.removeAttribute("disabled")
            if(currPage != pages)
              currPage++
            if(currPage == pages)
              e.target.setAttribute("disabled", "")
          },
        }, "Next"),
      ]),
    ])
  }
}
