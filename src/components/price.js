const months = [
  // TODO: handle this 0 month, should never be used
  "Jan",
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
]

export default () => {
  let state = {
    tab: "chart",
  }
  let points = []
  let labels = []
  let table = []
  return {
    oninit: (vnode) => {
      /* shows gaps in the lines where data is missing
      points = vnode.attrs.chart.points.map(point => point == -1 ? 
        null : point.toFixed(0))
      */
      points = vnode.attrs.chart.points
      let val = points.filter(point => point != -1)
      //val.push(parseFloat(vnode.attrs.current_price.substring(1)))
      //console.log(vnode.attrs.chart)
      const sum = val.reduce((acc, point) => acc + point)
      const avg = (sum / val.length).toFixed(0)
      points = points.map(point => point == -1 ? avg : point.toFixed(0))
      labels = vnode.attrs.chart.x_axis.map(label =>
        months[label[1]] + " " + (label[0] - 2000).toString())
      for(let i = 0; i < points.length; i++) {
        table.push({label: labels[i], point: points[i]})
      }
      m.redraw()
    }, 
    view: (vnode) => m(".box", [
      m(".tabs.is-boxed", m("ul", [
        m("li" + (state.tab == "chart" ? ".is-active" : ""), {
          onclick: () => {
            state.tab = "chart"
          },
        }, m("a", "Chart")),
        m("li" + (state.tab == "table" ? ".is-active" : ""), {
          onclick: () => {
            state.tab = "table"
          },
        }, m("a", "Table")),
      ])),
      m("div" + (state.tab == "table" ? "" : ".is-hidden"), 
        m("table.table.is-striped.is-fullwidth", m("tbody", [
          table.map(row => m("tr", [
            m("th", row.label),
            m("td", "$" + row.point.toString()),
          ])), 
        ])),
      ),
      m("div" + (state.tab == "chart" ? "" : ".is-hidden"), {
        style: `height:500px;`,
      }, m("canvas", {
          oncreate: (vnode) => {
            const chart = new Chart(vnode.dom.getContext("2d"), {
              type: 'line',
              data: {
                labels: labels,
                datasets: [{ 
                  data: points,
                  spanGaps: true,   
                  label: "Amazon",
                  borderColor: "#3273dc",
                  fill: false
                }]
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
                  position: "bottom",
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
                maintainAspectRatio: false
              },
            }) 
          }
        })
      )
    ])
  }
}
