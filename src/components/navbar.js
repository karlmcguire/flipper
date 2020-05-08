import State from "../model/state"

const signedIn = {
  view: (vnode) => m(".navbar-end", [
    m("a.navbar-item" +
      (vnode.attrs.active === "saved" ? ".is-active" : ""), {
      href: "/#!/user/saved",
    }, "Saved"),
    m(".navbar-item.has-dropdown.is-hoverable", [
      m("a.navbar-link.has-text-weight-semibold", State.name),
      m(".navbar-dropdown.is-right", [
        m("a.navbar-item" + 
          (vnode.attrs.active === "settings" ? ".is-active" : ""), {
          href: "/#!/user/settings",
        }, "Settings"),
        m("a.navbar-item.has-text-danger", {
          onclick: () => {
            State.signOut()
            m.route.set("/")
          }
        }, "Log out"),
      ])
    ])
  ])
}

const signedOut = {
  view: (vnode) => m(".navbar-end", m(".navbar-item", m(".buttons", [
    m("a.button.is-primary" +
      (vnode.attrs.active == "signup" ? ".is-active" : ""), {
      href: "/#!/signup",
      }, m("strong", "Sign up")),
    m("a.button" +
      (vnode.attrs.active == "signin" ? ".is-active" : ""), {
      href: "/#!/signin",
      }, "Sign in")
  ])))
}

export default () => {
  let dropdown = ""
  return {
    view: (vnode) => m("nav.navbar.is-light.is-fixed-top", [
      m(".nav_container", [
        m(".navbar-brand", [
          m("a.navbar-item.has-text-weight-semibold", {
            href: "/#!/",
          }, "Flipper"),
          m("a.navbar-burger.burger" + dropdown, {
            role: "button",
            "aria-label": "menu",
            "aria-expanded": "false",
            "data-target": "navbar-content",
            onclick: () => {
              if(dropdown === "") dropdown = ".is-active"
              else dropdown = ""
            }
          }, [
            m("span", {"aria-hidden": "true"}),
            m("span", {"aria-hidden": "true"}),
            m("span", {"aria-hidden": "true"}),
          ])
        ]),
        m("#navbar-content.navbar-menu" + dropdown, [
          m(".navbar-start", [
            m("a.navbar-item" + 
              (vnode.attrs.active === "about" ? ".is-active" : ""), {
              href: "/#!/about",
            }, "About"), 
            m("a.navbar-item" + 
              (vnode.attrs.active === "contact" ? ".is-active" : ""), {
              href: "/#!/contact",
            }, "Contact"), 
          ]),
          m((State.signedIn() ? signedIn : signedOut), vnode.attrs), 
        ]),
      ]),
    ])
  }
}
