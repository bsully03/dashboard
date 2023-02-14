
import React, { Component } from 'react'
import * as d3 from 'd3'
import orders from '../orders.json'

class Chart extends Component {
  
  componentDidMount() {
    const dimension = this.props.props.dimension;
    const metric = this.props.props.metric;
    const type = this.props.props.type;
    const height = this.props.height;
    const width = this.props.width;

    const result = this.sumByDimension(orders.orders, dimension, metric);

    type === "bar"
      ? this.drawBarChart(result, metric, height, width)
      : type === "column"
      ? this.drawColumnChart(result, metric, height, width)
      : type === "kpi"
      ? this.createKPIChart(result, metric, height, width)
      : setTimeout(999999);

  }

  sumByDimension(array, dimension, metric, result = []) {
    array.reduce(function (res, value) {
      if (!res[value[dimension]]) {
        res[value[dimension]] = { [dimension]: value[dimension], [metric]: 0 };
        result.push(res[value[dimension]]);
      }
      res[value[dimension]][metric] += value[metric];
      return res;
    }, {});
    return result;
  }

  drawBarChart(result, metric, height, width) {

    const arr = result.map((d) => d[metric]);
    const maxVal = Math.max(...arr);

    const factor = 0.75;

    const padding = 10;

    const svgCanvas = d3
      .select(this.refs.canvas)
      .append("svg")
      .attr("class", "ChartContain")
      .attr("width", width)
      .attr("height", height)
      .attr("margin", "auto");

    svgCanvas
      .selectAll("rect")
      .data(result)
      .enter()
      .append("rect")
      .attr("class", "bars")
      .attr("width", width / result.length - padding)
      .attr(
        "height",
        (d) => (d[this.props.props.metric] / maxVal) * (height * factor)
      )
      .attr("x", (d, i) => i * (width / result.length))
      .attr(
        "y",
        (d) =>
          height - (d[this.props.props.metric] / maxVal) * (height * factor)
      )
      .attr("val", (d) => d[this.props.props.metric])
      .text((d) => d[this.props.props.dimension]);
  }

  drawColumnChart(result, metric, height, width) {
    const arr = result.map((d) => d[metric]);
    const maxVal = Math.max(...arr);

    const factor = 0.75;

    const padding = 5;

    const svgCanvas = d3
      .select(this.refs.canvas)
      .append("svg")
      .attr("class", "ChartContain")
      .attr("width", width)
      .attr("height", height)
      .attr("margin", "auto");

    svgCanvas
      .selectAll("rect")
      .data(result)
      .enter()
      .append("rect")
      .attr("class", "bars")
      .attr("height", (height / result.length - padding) * factor)
      .attr("width", (d) => (d[this.props.props.metric] / maxVal) * width)
      .attr(
        "y",
        (d, i) =>
          height -
          (height / result.length - padding) * factor * (i + 1) -
          i * padding
      )
      .attr("x", 0)
      .attr("val", (d) => d[this.props.props.metric])
      .text((d) => d[this.props.props.dimension]);
  }

  createKPIChart(result, metric, height, width) {
    function amount(item) {
      return item[metric];
    }

    function sum(prev, next) {
      return prev + next;
    }

    const kpiSum = result.map(amount).reduce(sum);

    // Create our number formatter.
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",

      // These options are needed to round to whole numbers if that's what you want.
      //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
      maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
    });

    const svgCanvas = d3
      .select(this.refs.canvas)
      .append("svg")
      .attr("class", "KpiContain");

    svgCanvas.append("text").text(metric).attr("fill", "black").attr("y", 15);
    svgCanvas
      .append("text")
      .text(formatter.format(kpiSum))
      .attr("fill", "black")
      .attr("y", 40);

    // here

    var data = orders.orders;
    data = data.map((x) => ({
      ...x,
      orderDate: new Date(x["Order Date"]),
      orderMonthYear:
        x["Order Date"].substring(0, x["Order Date"].indexOf("/")) +
        "-" +
        x["Order Date"].substring(x["Order Date"].length - 4),
    }));

    var lineData = this.sumByDimension(data, "orderDate", metric);
    //var data = lineData

    var data = [
      { date: new Date("1/1/2022"), sales: 4 },
      { date: new Date("1/20/2022"), sales: 8 },
      { date: new Date("3/1/2022"), sales: 6 },
      { date: new Date("4/1/2022"), sales: 2 },
      { date: new Date("5/1/2022"), sales: 1 },
      { date: new Date("6/1/2022"), sales: 7 },
    ];

    var maxY = 8,
      minY = 1,
      maxX = new Date("6/1/2022"),
      minX = new Date("1/1/2022");

    var xScale = d3.scaleTime().domain([minX, maxX]).range([0, width]),
      yScale = d3.scaleLinear().domain([minY, maxY]).range([height, 0]);

    var line = d3
      .line()
      .x(function (d) {
        return xScale(d.date);
      })
      .y(function (d) {
        return yScale(d["sales"]);
      })
      .curve(d3.curveMonotoneX);

    svgCanvas
      .append("path")
      .datum(data)
      .attr("class", "line")
      .attr("transform", "translate(" + 100 + "," + 15 + ")")
      .attr("d", line)
      .style("fill", "none")
      .style("stroke", "#03647a")
      .style("stroke-width", "2");
  }

  createLineChart(height, width) {
    var data = [
      { date: new Date("1/1/2022"), sales: 4 },
      { date: new Date("2/1/2022"), sales: 8 },
      { date: new Date("3/1/2022"), sales: 6 },
      { date: new Date("4/1/2022"), sales: 2 },
      { date: new Date("5/1/2022"), sales: 1 },
      { date: new Date("6/1/2022"), sales: 7 },
    ];

    var maxY = 8,
      minY = 1,
      maxX = new Date("6/1/2022"),
      minX = new Date("1/1/2022");

    var xScale = d3.scaleTime().domain([minX, maxX]).range([0, width]),
      yScale = d3.scaleLinear().domain([minY, maxY]).range([height, 0]);

    const svgCanvas = d3
      .select(this.refs.canvas)
      .append("svg")
      .attr("class", "KpiContain");

    svgCanvas
      .append("g")
      .selectAll("dot")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", function (d) {
        return xScale(d.date);
      })
      .attr("cy", function (d) {
        return yScale(d.sales);
      })
      .attr("r", 2)
      .attr("transform", "translate(" + 80 + "," + -30 + ")")
      .style("fill", "#CC0000");

    var line = d3
      .line()
      .x(function (d) {
        return xScale(d.date);
      })
      .y(function (d) {
        return yScale(d.sales);
      })
      .curve(d3.curveMonotoneX);

    svgCanvas
      .append("path")
      .datum(data)
      .attr("class", "line")
      .attr("transform", "translate(" + 80 + "," + -30 + ")")
      .attr("d", line)
      .style("fill", "none")
      .style("stroke", "#CC0000")
      .style("stroke-width", "2");
  }

  render() {
    return <div ref="canvas"></div>;
  }
}
export default Chart
