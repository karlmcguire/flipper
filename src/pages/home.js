import Items from "../model/items"
import Item from "../components/item"
  
let items = Array.from(Items)

const menu = {
  view: () => m("nav.level", [
    m(".level-left", [
      m(".level-item", m("p.subtitle.is-5", m.trust(`
        <strong>` + items.length + `</strong> items
      `))),
      m(".level-item", m(".field.has-addons", [
        m("p.control", m("input#search.input", {
          "type": "text",
          "placeholder": "Find an item",
        })),
        m("p.control", m("button.button", {
          onclick: (e) => {
            const query = document.getElementById("search").value.toLowerCase()
            items = items.filter(item => 
              item[1].name.toLowerCase().includes(query))
          }
        }, "Search"))
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
  const pages = Math.ceil(items.size / pageSize)
  let prevAttr = {disabled: ""}
  let nextAttr = {}
  return {
    oninit: (vnode) => {
      //console.log(vnode.attrs.page)
    },
    onupdate: (vnode) => {
      //console.log("hello")
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
