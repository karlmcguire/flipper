export default () => {
  let data = {
    name: "",
    email: "",
    password: "",
    passwordVerify: "",
    terms: false
  }
  let mod = {
    name: "",
    email: "",
    password: "",
    passwordVerify: "",
    terms: "" 
  }
  let showTerms = false
  return {
    view: () => m(".container.section", m(".columns", [
      m(".column.is-one-quarter"),
      m(".column.is-two-quarters", [
        m(".notification.is-danger" + (showTerms ? "" : ".is-hidden"), [
          m("button.delete", {
            onclick: () => showTerms = false, 
          }),
          m.trust(`Please accept the terms and conditions.`)
        ]),
        m(".card", [
          m(".card-content", [
            m(".field", [
              m("label.label", "Name"),
              m(".control", m("input.input" + mod.name, {
                type: "text",
                placeholder: "Name",
                oninput: (e) => {
                  data.name = e.target.value
                  if(data.name.length > 100) mod.name = ".is-danger"
                  else mod.name = ".is-success"
                }
              })),
              m("p.help", "Optional, but this will help us personalize your experience"),
            ]),
            m(".field", [
              m("label.label", "Email"),
              m(".control", m("input.input" + mod.email, {
                type: "email",
                placeholder: "Email",
                oninput: (e) => {
                  data.email = e.target.value
                  if(!data.email.includes("@")) mod.email = ".is-danger"
                  else mod.email = ".is-success"
                }
              })),
              m("p.help", "We promise to not spam you"),
            ]),
            m(".field", [
              m("label.label", "Password"),
              m(".control", m("input.input" + mod.password, {
                type: "password",
                placeholder: "Password",
                oninput: (e) => {
                  data.password = e.target.value
                  if(data.password.length < 4 || data.password.length > 1000)
                    mod.password = ".is-danger"
                  else
                    mod.password = ".is-success"
                }
              })),
              m("p.help", "8+ alphanumeric characters"),
            ]),
            m(".field", [
              m("label.label", "Password Verification"),
              m(".control", m("input.input" + mod.passwordVerify, {
                type: "password",
                placeholder: "Password",
                oninput: (e) => {
                  data.passwordVerify = e.target.value
                  if(data.passwordVerify !== data.password)
                    mod.passwordVerify = ".is-danger"
                  else
                    mod.passwordVerify = ".is-success"
                }
              })),
              m("p.help", "Must match password above"),
            ]),
            m(".field", [
              m(".control", m("label.checkbox", [
                m("input", {
                  type: "checkbox",
                  oninput: (e) => {
                    data.terms = e.target.checked
                    if(data.terms === true) showTerms = false
                  }
                }),
                m.trust(` I agree to the <a href="#">terms and conditions</a>`),
              ])),
            ]),
            m(".field.is-grouped.is-grouped-right", [
              m(".control", m("button.button.is-primary", {
                onclick: (e) => {
                  if(!data.terms) showTerms = true 
                }
              }, m("strong", "Sign up"))),
              m(".control", m("a.button.is-danger.is-light", {
                "href": "/#!/"}, "Cancel")),
            ])
          ]) 
        ])
      ]),
      m(".column.is-one-quarter"),
    ]))
  }
}
