export default {
  view: () => m(".container.section", m(".columns", [
    m(".column.is-one-quarter"),
    m(".column.is-two-quarters", m(".card", [
      m(".card-content", [
        m(".field", [
          m("label.label", "Email"),
          m(".control", m("input.input", {
            "type": "email",
            "placeholder": "Email",
          })),
        ]),
        m(".field", [
          m("label.label", "Password"),
          m(".control", m("input.input", {
            "type": "password",
            "placeholder": "Password",
          })),
        ]),
        m(".field", [
          m(".control", m("label.checkbox", [
            m("input", {"type": "checkbox"}),
            m("span", " Remember me"),
          ]))
        ]),
        m(".field.is-grouped.is-grouped-right", [
          m(".control", m("button.button.is-primary", m("strong", "Login"))),
          m(".control", m("a.button.is-danger.is-light", {
            "href": "/#!/"}, "Cancel")),
        ])
      ]) 
    ])),
    m(".column.is-one-quarter"),
  ]))
}
