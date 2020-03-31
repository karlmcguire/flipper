export default () => {
  return {
    view: (vnode) => m(".box", [
      m(".tabs.is-boxed", m("ul", [
        m("li.is-active", m.trust("<a><span>Price</span></a>")), 
        m("li", m.trust("<a>Shipping</a>")), 
        m("li", m.trust("<a>Reviews</a>")), 
      ])),
      m("canvas", {
        oncreate: (vnode) => {
          new Chart(vnode.dom.getContext("2d"), {
            type: 'line',
            data: {
              labels: ["Oct", "Nov", "Dec", "Jan", "Feb"],
              datasets: [{ 
                  data: [86,114,106,106,107],
                  label: "Amazon",
                  borderColor: "#3e95cd",
                  fill: false
                }, { 
                  data: [282,350,411,502,635],
                  label: "Ebay",
                  borderColor: "#8e5ea2",
                  fill: false
                }, { 
                  data: [168,170,178,190,203],
                  label: "Alibaba",
                  borderColor: "#3cba9f",
                  fill: false
                },
              ]
            },
            options: {
              tooltips: {
                titleFontSize: 16,
                bodyFontSize: 14,
                callbacks: {
                  label: (tooltipItems, data) => {
                    return "$" + tooltipItems.yLabel
                  },
                },
              },
              legend: {
                position: "right",
                labels: {
                  fontSize: 16
                }
              },
              scales: {
                yAxes: [{
                  ticks: {
                    fontSize: 16,
                    callback: (value, index, values) => {
                      return "$" + value
                    },
                  }
                }],
                xAxes: [{
                  ticks: {
                    fontSize: 16
                  }
                }]
              },
              responsive: true,
              maintainAspectRatio: true
            },
          }) 
        }
      })
    ])
  }
}
