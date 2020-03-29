export default () => {
  let notification = true
  return {
    view: () => m(".container.section", [
      m(".columns", [
        m(".column"),
        m(".column.is-four-fifths", [
          m(".notification.is-info.has-text-weight-semibold" + (notification ? "" : ".is-hidden"), [
            m("button.delete", {onclick: () => notification = false}),
            m("span", "We love to hear from you! Please use this form to send us any questions, concerns, or suggestions you may have. We'll be sure to respond as quickly as possible.")
          ]),
          m(".card", [
            m(".card-content", [
              m(".field.is-horizontal", [
                m(".field-label.is-normal", m("label.label", "From")),
                m(".field-body", [
                  m(".field", m("p.control.is-expanded", m("input.input", {
                    "type": "text",
                    "placeholder": "Your name",
                  }))),
                  m(".field", m("p.control.is-expanded", m("input.input", {
                    "type": "email",
                    "placeholder": "Your email",
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
                        "type": "tel",
                        "placeholder": "Your phone number (optional)",
                      }))
                    ]),
                    m("p.help", "This is the help text."), 
                  ]),
                ]),
              ]),
              m(".field.is-horizontal", [
                m(".field-label.is-normal", m("label.label", "Question")),
                m(".field-body", m(".field", m(".control", m("textarea.textarea", {
                  "placeholder": "How can we help you?",
                }))))
              ]),
              m(".field.is-horizontal", [
                m(".field-label"),
                m(".field-body", m(".field.is-grouped.is-grouped-right", [
                  m(".control", m("button.button.is-primary", m("strong", "Send"))),
                  m(".control", m("a.button.is-danger.is-light", {
                    "href": "/#!/"}, "Cancel"))
                ]))
              ])
            ]),
          ]),
        ]),
        m(".column"),
      ]),
    ]),
  }
}

