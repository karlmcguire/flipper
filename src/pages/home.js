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
      m("p.level-item", m("a", "Facebook")),
    ]),
  ])
}

const items = {
  view: () => m(".columns.is-multiline", [
    m(Item),
    m(Item),
    m(Item),
    m(Item),
  ])
}

export default {
  view: () => m(".container.section", [
    m(menu),
    m("br"),
    m(items)
  ])
}
