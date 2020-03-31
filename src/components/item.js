export default () => {
  let state = {
    saved: false
  }
  
  return {
    view: (vnode) => m(".column.is-one-third", m(".card", [
      m("a.header.card-header", {href: "/#!/view/stuff"},
        m("p.card-header-title", m("div", {style: `
          max-height: 3rem;
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        `}, "name"))
      ),
      m("a.card-image", {href: "/#!/view/stuff"},
        m("figure.image.is-4by4", {style: `
          padding: 2rem;
          padding-bottom: 0;
          margin-bottom: -1rem;
          display: flex;
          justify-content: space-around;
        `}, m("img", {
          src: "https://i.imgur.com/wAgpEhJ.png",
          style: `
            height: 150px;
            width: auto;
        `}))
      ),
      m(".card-content", m(".content", [
        m("hr"),
        m(".columns", {style: `
          margin-top: -1.25em; 
        `}, [
          m(".column.is-half.has-text-centered", [
            m("p.has-text-grey", {style: `
              margin-bottom: 0.5em;
            `}, "Price"),
            m(".tag.is-success.is-light.is-medium.has-text-weight-semibold", 
              {style: `width: 100%;`}, "$1299.99")
          ]),
          m(".column.is-half.has-text-centered", [
            m("p.has-text-grey", {style: `
              margin-bottom: 0.5em; 
            `}, "Last"),
            m(".tag.is-light.is-medium.has-text-weight-semibold", 
              {style: `width: 100%;`}, "$1249.99")
          ])
        ]),
      ])),
      m("footer.card-footer", [
        m("a.card-footer-item", {href: "/#!/view/stuff/"}, "View"),
        m("a.card-footer-item" + (state.saved ? ".has-text-grey" : ""), {
          onclick: () => state.saved = (state.saved ? false : true ),
        }, "Save" + (state.saved ? "d" : "")),
        m("a.card-footer-item", "Buy"),
      ])
    ]))
  }
}
