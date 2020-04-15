export default () => {
  let model = {
    saved: false
  }
  return {
    view: (vnode) => m(".column.is-one-quarter", m(".card", {
      style: `display:flex;flex-direction:column;height:100%;`,
    }, [
      m("a.header.card-header", {href: "/#!/view/" + vnode.attrs.id},
        m("p.card-header-title", m("div", {style: `
          height: 3rem;
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        `}, vnode.attrs.data.name))
      ),
      m("a.card-image", {href: "/#!/view/" + vnode.attrs.id},
        m("figure.image", {style: `
          padding: 2rem;
          padding-bottom: 0;
          margin-bottom: -1rem;
          display: flex;
          justify-content: space-around;
        `}, m("img", {
          src: vnode.attrs.data.img,
          style: `
            height: 125px;
            width: auto;
        `}))
      ),
      m(".card-content", m(".content", {
        style: `height:100%;`,
      }, [
        m("hr"),
        m(".columns", {style: `
          margin-top: -1.25em; 
        `}, [
          m(".column.is-half.has-text-centered", [
            m("p.has-text-grey", {style: `
              margin-bottom: 0.5em;
            `}, "Price"),
            m(".tag.is-light.is-medium.has-text-weight-semibold" + 
              (vnode.attrs.data.current_price == "Not in Stock" ? 
                ".is-danger" : ".is-success"), 
              {style: `width: 100%;`}, 
                (vnode.attrs.data.current_price == "Not in Stock" ?
                "Out of stock" : vnode.attrs.data.current_price))
          ]),
          m(".column.is-half.has-text-centered", [
            m("p.has-text-grey", {style: `
              margin-bottom: 0.5em; 
            `}, "List"),
            m(".tag.is-light.is-medium.has-text-weight-semibold", 
              {style: `width: 100%;`}, vnode.attrs.data.list_price)
          ])
        ]),
      ])),
      m("footer.card-footer", [
        m("a.card-footer-item", {href: "/#!/view/" + vnode.attrs.id}, "View"),
        m("a.card-footer-item" + (model.saved ? ".has-text-danger" : ""), {
          onclick: () => model.saved = (model.saved ? false : true ),
        }, "Save" + (model.saved ? "d" : "")),
        m("a.card-footer-item", {
          target: "_",
          href: "https://amzn.com/" + vnode.attrs.id,
        }, "Buy"),
      ])
    ]))
  }
}
