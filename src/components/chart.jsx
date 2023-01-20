
import React, { Component } from 'react'
import * as d3 from 'd3'
import orders from '../orders.json'

class Chart extends Component {
  componentDidMount() {
    const dimension = this.props.dimension;
    const metric = this.props.metric;
    const type = this.props.type
    
    const result = this.sumByDimension(orders.orders, dimension, metric)
    
    type === "bar"
      ? this.drawBarChart(result, metric)
      : type === "column"
      ? this.drawColumnChart(result, metric)
      : type === "kpi"
      ? this.createKPIChart(result, metric)
      : setTimeout(999999)
    
  };

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
  };

  drawBarChart(result, metric) {
    const height = 150;
    const width = 250;

    const arr = result.map((d) => d[metric]);
    const maxVal = Math.max(...arr);

    const factor = 0.75;

    const padding = 10;

    const svgCanvas = d3
      .select(this.refs.canvas)
      .append("svg")
      .attr("class", "ChartContain")
      .attr("width", "100%")
      .attr("height", "80%")
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
        (d) => (d[this.props.metric] / maxVal) * (height * factor)
      )
      .attr("x", (d, i) => i * (width / result.length))
      .attr(
        "y",
        (d) => height - (d[this.props.metric] / maxVal) * (height * factor)
      )
      .attr("val", (d) => d[this.props.metric])
      .text((d) => d[this.props.dimension]);
  }

  drawColumnChart(result, metric) {
    const height = 150;
    const width = 250;

    const arr = result.map((d) => d[metric]);
    const maxVal = Math.max(...arr);

    const factor = 0.75;

    const padding = 5;

    const svgCanvas = d3
      .select(this.refs.canvas)
      .append("svg")
      .attr("class", "ChartContain")
      .attr("width", "100%")
      .attr("height", "80%")
      .attr("margin", "auto");

    svgCanvas
      .selectAll("rect")
      .data(result)
      .enter()
      .append("rect")
      .attr("class", "bars")
      .attr("height", (height / result.length - padding) * factor)
      .attr("width", (d) => (d[this.props.metric] / maxVal) * width)
      .attr(
        "y",
        (d, i) =>
          height -
          (height / result.length - padding) * factor * (i + 1) -
          i * padding
      )
      .attr("x", 0)
      .attr("val", (d) => d[this.props.metric])
      .text((d) => d[this.props.dimension]);
  }

  createKPIChart(result, metric) {
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

    const svgCanvas = d3.select(this.refs.canvas)
      .append("svg")
      .attr("class", "KpiContain");

    svgCanvas.append("text")
      .text(metric)
      .attr("fill", "black")
      .attr("y", 15);
    svgCanvas.append("text")
      .text(formatter.format(kpiSum))
      .attr("fill", "black")
      .attr("y", 40);
    
    
    // here

    var data = orders.orders
    data = data.map((x) => ({
      ...x,
      orderDate: new Date(x["Order Date"]),
      orderMonthYear:
        x["Order Date"].substring(0, x["Order Date"].indexOf("/")) +
        "-" +
        x["Order Date"].substring(x["Order Date"].length - 4),
    }));

    var lineData = this.sumByDimension(data, "orderMonthYear", metric); 
    console.log(lineData)
  }

  render() {
    return <div ref="canvas"></div>;
  }
}
export default Chart
