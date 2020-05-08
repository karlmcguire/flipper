import Config from "../config"
import State from "../state"

export default (vnode) => {
  return {
    view: vnode => m(".column.is-one-quarter", m(".card", {
      style: `display:flex;flex-direction:column;height:100%;`,
    }, [
      m("a.header.card-header", {
        href: "/#!/view/" + vnode.attrs.id,
        onclick: () => {
          console.log(State)
        },
      },
        m("p.card-header-title", m("div", {style: `
          height: 3rem;
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        `}, vnode.attrs.data.name))
      ),
      m("a.card-image", {
        href: "/#!/view/" + vnode.attrs.id,
      },
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
          (State.saved.has(vnode.attrs.id) ? ".has-text-danger" : "") +
          (State.auth ? "" : ".is-hidden"), {
          onclick: e => {
            if(e.target.text == "Saved") {
              State.saved.delete(vnode.attrs.id)
            } else {
              State.saved.set(vnode.attrs.id, Date.now() / 1000)
            }
            window.localStorage.setItem("saved", 
              JSON.stringify([...State.saved]))
            fetch((e.target.text == "Saved" ? 
              Config.api.unsave : Config.api.save), {
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
              .then(res => {if("err" in res) console.error(res.err)})
          },
        }, "Save" + (State.saved.has(vnode.attrs.id) ? "d" : "")),
        m("a.card-footer-item", {
          target: "_",
          href: "https://amzn.com/" + vnode.attrs.id,
        }, "Buy"),
      ])
    ]))
  }
}
