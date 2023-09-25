<script>
    import {Plot} from "@observablehq/plot"
</script>


Plot.plot({
  inset: 6,
  width: 960,
  y: {
    label: "↑ Apple stock price ($)"
  },
  color,
  marks: [
    Plot.ruleY(aapl, Plot.selectFirst({
      y: d => d.Open,
      stroke: 'grey',
      strokeDasharray: "3,2",
    })),
    Plot.ruleX(aapl, {
      x: "Date",
      y1: "Low",
      y2: "High"
    }),
    Plot.ruleX(aapl, {
      x: "Date",
      y1: "Open",
      y2: "Close",
      stroke: (d) => Math.sign(d.Close - d.Open),
      strokeWidth: 4,
      strokeLinecap: "round"
    }),
  ]
})