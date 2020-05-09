import Config from "../config"
import State from "../state"
import Util from "../util"

export default () => {
  let data = {
    email: "",
    password: "",
    remember: false
  }
  let mod = {
    email: "",
    password: ""
  }
  let errMsg = "" 
  return {
    oninit: () => {
      if(State.auth) m.route.set("/")
    }, 
    view: (vnode) => m(".main", m(".container.section", m(".columns", [
      m(".column.is-one-quarter"),
      m(".column.is-two-quarters", [
        m(".notification.is-danger" + (errMsg != "" ? "" : ".is-hidden"), [
          m("button.delete", {
            onclick: () => errMsg = "",
          }),
          m.trust(errMsg),
        ]),
        m(".card", [
          m(".card-content", m("form", {
            onsubmit: e => e.preventDefault(),
          }, [
            m(".field", [
              m("label.label", "Email"),
              m(".control", m("input.input" + mod.email, {
                type: "email",
                placeholder: "Email",
                autocomplete: "email",
                oninput: (e) => {
                  data.email = e.target.value
                  if(!data.email.includes("@"))
                    mod.email = ".is-danger"
                  else
                    mod.email = ".is-success"
                }
              })),
            ]),
            m(".field", [
              m("label.label", "Password"),
              m(".control", m("input.input" + mod.password, {
                type: "password",
                placeholder: "Password",
                autocomplete: "current-password",
                oninput: (e) => {
                  data.password = e.target.value
                  if(data.password.length < 4)
                    mod.password = ".is-danger"
                  else
                    mod.password = ".is-success"
                }
              })),
            ]),
            m(".field", [
              m(".control", m("label.checkbox", {
                oninput: (e) => {
                  data.remember = e.target.checked
                }
              }, [
                m("input", {type: "checkbox"}),
                m("span", " Remember me"),
              ]))
            ]),
            m(".field.is-grouped.is-grouped-right", [
              m(".control", m("button.button.is-primary", {
                onclick: () => {
                  fetch(Config.api.signin, {
                    method: "POST",
                    credentials: "include",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                  })
                  .then(res => res.json())
                  .then(res => {
                    if("err" in res) {
                      if(res.err == "missing") {
                        errMsg = "A user with that email doesn't exist."
                        mod.email = ".is-danger"
                      } else if(res.err == "invalid") {
                        errMsg = "Incorrect password for that user."
                        mod.password = ".is-danger"
                      } else {
                        errMsg = "Unexpected server error."
                      }
                      m.redraw()
                      return
                    }
                    Util.user.signIn(res)
                    Util.user.setSaved(res.saved)
                    m.route.set("/")
                  })
                },
              }, m("strong", "Log in"))),
              m(".control", m("a.button.is-danger.is-light", {
                href: "/#!/",
              }, "Cancel")),
            ])
          ]))
        ])
      ]),
      m(".column.is-one-quarter"),
    ])))
  }
}
