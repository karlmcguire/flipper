import State from "../state"

export default () => {
  let notification = true
  return {
    view: () => m(".main", m(".container.section", [
      m(".columns", [
        m(".column"),
        m(".column.is-two-thirds", [
          m(".notification.is-info" + (notification ? "" : ".is-hidden"), [
            m("button.delete", {
              onclick: () => notification = false,
            }),
            m("span", "We love to hear from you! Please use this form to send us any questions, concerns, or suggestions you may have. We'll be sure to respond as quickly as possible.")
          ]),
          m(".card", [
            m(".card-content", m("form", {
              onsubmit: e => e.preventDefault(),
            }, [
              m(".field.is-horizontal", [
                m(".field-label.is-normal", m("label.label", "From")),
                m(".field-body", [
                  m(".field", m("p.control.is-expanded", m("input.input", {
                    type: "text",
                    placeholder: "Your name",
                    autocomplete: "name",
                    value: State.name, 
                  }))),
                  m(".field", m("p.control.is-expanded", m("input.input", {
                    type: "email",
                    placeholder: "Your email",
                    autocomplete: "email",
                    value: State.email,
                  }))),
                ]),
              ]),
              m(".field.is-horizontal", [
                m(".field-label"),
                m(".field-body", [
                  m(".field.is-expanded", [
                    m(".field.has-addons", [
                      m(".control", m("a.button.is-static", "+1")),
                      m(".control.is-expanded", m("input.input", {
                        type: "tel",
                        placeholder: "Your phone number (optional)",
                        autocomplete: "tel",
                      }))
                    ]),
                    m("p.help", "We'll only use your number to follow up."), 
                  ]),
                ]),
              ]),
              m(".field.is-horizontal", [
                m(".field-label.is-normal", m("label.label", "Question")),
                m(".field-body", m(".field", m(".control", 
                  m("textarea.textarea", {
                    placeholder: "How can we help you?",
                  }),
                )))
              ]),
              m(".field.is-horizontal", [
                m(".field-label"),
                m(".field-body", m(".field.is-grouped.is-grouped-right", [
                  m(".control", m("button.button.is-primary", 
                    m("strong", "Send"),
                  )),
                  m(".control", m("a.button.is-danger.is-light", {
                    href: "/#!/",
                  }, "Cancel"))
                ]))
              ])
            ])),
          ]),
        ]),
        m(".column"),
      ]),
    ])),
  }
}

