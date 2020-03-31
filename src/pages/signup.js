export default () => {
  return {
    view: () => m(".container.section", m(".columns", [
      m(".column.is-one-quarter"),
      m(".column.is-two-quarters", m(".card", [
        m(".card-content", [
          m(".field", [
            m("label.label", "Name"),
            m(".control", m("input.input", {
              "type": "text",
              "placeholder": "Name",
            })),
          ]),
          m(".field", [
            m("label.label", "Email"),
            m(".control", m("input.input", {
              "type": "email",
              "placeholder": "Email",
            })),
            m("p.help", "We promise to not spam you."),
          ]),
          m(".field", [
            m("label.label", "Password"),
            m(".control", m("input.input", {
              "type": "password",
              "placeholder": "Password",
            })),
            m("p.help", "8+ alphanumeric characters."),
          ]),
          m(".field", [
            m("label.label", "Password Verification"),
            m(".control", m("input.input", {
              "type": "password",
              "placeholder": "Password",
            })),
            m("p.help", "Must match password above."),
          ]),
          m(".field", [
            m(".control", m("label.checkbox", m.trust(`
              <input type="checkbox"> I agree to the <a href="#">terms and conditions</a>   
            `)))
          ]),
          m(".field.is-grouped.is-grouped-right", [
            m(".control", m("button.button.is-primary", m("strong", "Sign up"))),
            m(".control", m("a.button.is-danger.is-light", {
              "href": "/#!/"}, "Cancel")),
          ])
        ]) 
      ])),
      m(".column.is-one-quarter"),
    ]))
  }
}
