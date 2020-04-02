export default () => {
  let model = {
    saved: false
  }
  return {
    view: (vnode) => m(".column.is-one-third", m(".card", [
      m("a.header.card-header", {href: "/#!/view/" + vnode.attrs.id},
        m("p.card-header-title", m("div", {style: `
          max-height: 3rem;
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        `}, vnode.attrs.name))
      ),
      m("a.card-image", {href: "/#!/view/" + vnode.attrs.id},
        m("figure.image.is-4by4", {style: `
          padding: 2rem;
          padding-bottom: 0;
          margin-bottom: -1rem;
          display: flex;
          justify-content: space-around;
        `}, m("img", {
          src: vnode.attrs.img,
          style: `
            height: 200px;
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
              {style: `width: 100%;`}, "$" + vnode.attrs.price)
          ]),
          m(".column.is-half.has-text-centered", [
            m("p.has-text-grey", {style: `
              margin-bottom: 0.5em; 
            `}, "Last"),
            m(".tag.is-light.is-medium.has-text-weight-semibold", 
              {style: `width: 100%;`}, "$" + vnode.attrs.lastPrice)
          ])
        ]),
      ])),
      m("footer.card-footer", [
        m("a.card-footer-item", {href: "/#!/view/stuff/"}, "View"),
        m("a.card-footer-item" + (model.saved ? ".has-text-danger" : ""), {
          onclick: () => model.saved = (model.saved ? false : true ),
        }, "Save" + (model.saved ? "d" : "")),
        m("a.card-footer-item", "Buy"),
      ])
    ]))
  }
}
