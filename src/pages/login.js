import Config from "../config"
import State from "../model/state"

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
  return {
    oninit: () => {
      if(State.loggedIn) m.route.set("/")
    }, 
    view: () => m(".main", m(".container.section", m(".columns", [
      m(".column.is-one-quarter"),
      m(".column.is-two-quarters", m(".card", [
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
                fetch(Config.api.login, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(data),
                })
                .then(res => res.json())
                .then(res => {
                  if(res.err !== null) {
                    // TODO: alert box
                    console.error(res.err)
                    return
                  }
                  State.name = res.name
                  State.email = data.email
                  State.token = res.token
                  m.route.set("/")
                })
              },
            }, m("strong", "Log in"))),
            m(".control", m("a.button.is-danger.is-light", {
              href: "/#!/",
            }, "Cancel")),
          ])
        ]))
      ])),
      m(".column.is-one-quarter"),
    ])))
  }
}
