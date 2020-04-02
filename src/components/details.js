export default {
  view: () => m(".columns", [
    m(".column.is-half", [ 
      m(".box", [
        m("h2.is-size-4", "Product Details"),
        m("br"),
        m("table.table.is-striped.is-fullwidth", [
          m("tbody", [
            m("tr", [m("th", "Product group"), m("td", "BISS")]),
            m("tr", [m("th", "Category"), m("td", "Misc.")]),
            m("tr", [m("th", "Manufacturer"), m("td", "Vee Gee Scientific")]),
            m("tr", [m("th", "Model"), m("td", "1433PHI")]),
            m("tr", [m("th", "Locale"), m("td", "US")]),
            m("tr", [m("th", "List price"), m("td", "$2,343.87")]),
            m("tr", [m("th", "SKU"), m("td", "B004TTED6U")]),
            m("tr", [m("th", "Last update scan"), m("td", "18 hours ago")]),
            m("tr", [m("th", "Last tracked"), m("td", "on Jul 16, 2018")]),
          ])
        ])
      ])
    ])
  ])
}
