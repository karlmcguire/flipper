export default () => {
  return {
    view: (vnode) => m(".box", [
      m(".tabs.is-boxed", m("ul", [
        m("li.is-active", m.trust("<a><span>Price</span></a>")), 
        m("li", m.trust("<a><span>Historical</span></a>")), 
        m("li", m.trust("<a><span>Something</span></a>")), 
      ])),
    ])
  }
}
