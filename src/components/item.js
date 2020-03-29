export default {
  view: () => m(".column.is-one-fourth", m(".card", [
    m("header.card-header", m("p.card-header-title", m("div", {
      "style": "max-height:3rem;overflow:hidden;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;",  
    }, "New Apple MacBook Pro (13-inch, 8GB RAM, 128GB Storage) - Space Gray"))),
    m(".card-image", m("figure.image.is-4by4", {
      "style": "padding:2rem;padding-bottom:0;margin-bottom:-1rem;", 
    }, m("img", {
      "src": "https://m.media-amazon.com/images/I/71IQiviMzWL._AC_UY436_FMwebp_QL65_.jpg",
      "alt": "Item image",
    }))),
    m(".card-content", 
      m(".content", [
        m("hr"),
        m("div", {
          "style": "display:flex;justify-content:space-around;",
        }, m(".tag.is-success.is-light.is-large.has-text-weight-semibold", "$1299.99")),
      ])),
    m("footer.card-footer", [
      m("a.card-footer-item", "Buy"),
      m("a.card-footer-item", "Save"),
    ])
  ]))
}
