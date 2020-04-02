const people = [
  {
    name: "Karl McGuire",
    handle: "karlmcguire",
    handleUrl: "https://github.com/karlmcguire",
    img: "https://i.imgur.com/06B9Ajk.png",
    info: `Karl is the Team Lead and has a background in building high performance services at <a href="https://dgraph.io">Dgraph Labs</a>.`,
  }, 
  {
    name: "Jordan Ramos",
    handle: "username",
    handleUrl: "#",
    img: "https://i.imgur.com/wAgpEhJ.png",
    info: "",
  },
  {
    name: "Devan Nesbit",
    handle: "username",
    handleUrl: "#",
    img: "https://i.imgur.com/wAgpEhJ.png",
    info: "",
  },
  {
    name: "Hyun Shik",
    handle: "username",
    handleUrl: "#",
    img: "https://i.imgur.com/wAgpEhJ.png",
    info: "",
  },
  {
    name: "Isaac Damiani",
    handle: "username",
    handleUrl: "#",
    img: "https://i.imgur.com/wAgpEhJ.png",
    info: "",
  },
  {
    name: "Tarun Ravada",
    handle: "username",
    handleUrl: "#",
    img: "https://i.imgur.com/wAgpEhJ.png",
    info: "",
  },
]

const person = {
  view: (vnode) => m(".column.is-half", m(".box", m("article.media", [
    m("figure.media-left", m("p.image.is-96x96", m("img", {
      src: vnode.attrs.img,
    }))),
    m(".media-content", m(".content", m("p", [
      m("strong", vnode.attrs.name),
      m("small", m("a", {
        href: vnode.attrs.handleUrl
      }, " @" + vnode.attrs.handle)),
      m("br"),
      m.trust(vnode.attrs.info),
    ])))
  ])))
}

export default {
  view: () => m(".container.section", [
    m("h1.title", "About"),
    m.trust(`<p>At <a href="https://uncc.edu">UNCC</a>, some undergraduate Computer Science students opt to take a <a href="https://catalog.uncc.edu/preview_course_nopop.php?catoid=25&coid=81442">Software Development Project</a> course wherein they are required to build a piece of software and be judged/graded on its quality. Flipper is one of those projects, and we've spent an entire semester building it for you.</p>`),
    m("br"),
    m("h2.is-size-4.has-text-weight-semibold", "Team"),
    m("br"),
    m(".columns.is-multiline", people.map(p => m(person, p)))
  ])
}
