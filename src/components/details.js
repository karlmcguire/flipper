export default {
  view: (vnode) => m(".columns", [
    m(".column.is-half", [ 
      m(".box", [
        m("h2.is-size-4", "Product Details"),
        m("br"),
        m("table.table.is-striped.is-fullwidth", [
          m("tbody", [
            m("tr", [
              m("th", "Product group"), 
              m("td", vnode.attrs.product_group)
            ]),
            m("tr", [
              m("th", "Category"), 
              m("td", vnode.attrs.category)
            ]),
            m("tr", [
              m("th", "Manufacturer"), 
              m("td", vnode.attrs.manufacturer)
            ]),
            m("tr", [
              m("th", "Model"), 
              m("td", vnode.attrs.model)
            ]),
            m("tr", [
              m("th", "Locale"), 
              m("td", vnode.attrs.locale)
            ]),
            m("tr", [
              m("th", "List price"), 
              m("td", vnode.attrs.list_price)
            ]),
            m("tr", [
              m("th", "SKU"), 
              m("td", vnode.attrs.sku)
            ]),
          ])
        ])
      ])
    ])
  ])
}
