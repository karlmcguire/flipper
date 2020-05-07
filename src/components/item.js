import Config from "../config"
import State from "../model/state"

export default () => {
  let saved = false
  return {
    oninit: (vnode) => {
      saved = State.isSaved(vnode.attrs.id)
    },
    onbeforeupdate: (vnode) => {
      saved = State.isSaved(vnode.attrs.id)
    },
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
            m(".tag.is-light.is-medium.has-text-weight-semibold", {
              style: `width: 100%;`,
            }, (vnode.attrs.data.list_price.includes("$") ? 
                  vnode.attrs.data.list_price : "-"))
          ])
        ]),
      ])),
      m("footer.card-footer", [
        m("a.card-footer-item", {
          href: "/#!/view/" + vnode.attrs.id,
        }, "View"),
        m("a.card-footer-item" + 
          (saved ? ".has-text-danger" : "") +
          (State.signedIn() ? "" : ".is-hidden"), {
          onclick: () => {
            if(saved) {
              State.unsave(vnode.attrs.id)
              saved = false
            } else {
              State.save(vnode.attrs.id)
              saved = true
            }
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
            .then(res => {
              if("err" in res) {
                console.error(err.stack)
                return
              }
            })
          },
        }, "Save" + (saved ? "d" : "")),
        m("a.card-footer-item", {
          target: "_",
          href: "https://amzn.com/" + vnode.attrs.id,
        }, "Buy"),
      ])
    ]))
  }
}
