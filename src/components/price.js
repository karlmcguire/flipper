export default () => {
  let chart;
  return {
    view: (vnode) => m(".box", [
      m(".tabs.is-boxed", m("ul", [
        m("li.is-active", m("a", "Chart")),
        m("li", m("a", "Table")),
      ])),
      m("canvas", {
        oncreate: (vnode) => {
          chart = new Chart(vnode.dom.getContext("2d"), {
            type: 'line',
            data: {
              labels: [
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct", 
                "Nov", 
                "Dec", 
                "Jan", 
                "Feb",
                "Mar",
              ],
              datasets: [{ 
                  data: [86,114,106,106,107],
                  label: "Amazon",
                  borderColor: "hsl(48, 100%, 67%)",
                  fill: false
                }, { 
                  data: [282,350,411,502,635],
                  label: "Ebay",
                  borderColor: "hsl(348, 100%, 61%)",
                  fill: false
                }, { 
                  data: [168,170,178,190,203],
                  label: "Alibaba",
                  borderColor: "hsl(204, 86%, 53%)",
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
