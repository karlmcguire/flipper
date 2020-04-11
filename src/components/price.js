const months = [
  "",
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
  let points = []
  let labels = []
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
      m.redraw()
    }, 
    view: (vnode) => m(".box", [
      m(".tabs.is-boxed", m("ul", [
        m("li.is-active", m("a", "Chart")),
        m("li", m("a", "Table")),
      ])),
      m("div", {
        style: `height:400px;`,
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
                  borderColor: "hsl(204, 86%, 53%)",
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
