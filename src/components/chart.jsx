
import React, { Component } from 'react'
import * as d3 from 'd3'
import orders from '../orders.json'

class Chart extends Component {
    componentDidMount() {
        var result = [];
        orders.orders.reduce(function(res, value) {
          if (!res[value.Category]) {
            res[value.Category] = { Category: value.Category, Sales: 0 };
            result.push(res[value.Category])
          }
          res[value.Category].Sales += value.Sales;
          return res;
        }, {});
        this.drawBarChart(result)
    }
    drawBarChart(result)  {
      const svgCanvas = d3.select(this.refs.canvas)
        .append('svg')
        .attr('width', 100)
        .attr('height', 100)

      svgCanvas.selectAll('rect')
        .data(result)
        .enter()
        .append('rect')
        .attr('width',  20)
        .attr('height', (d) => d.Sales)
        .attr('fill', 'blue')
        .attr('x', (d, i) => i * 45)
        .attr('y', 20)
        .text(d  => d.Category)
    }
    render() { 
      return (
        <div ref="canvas"></div>
      )
     }
}
export default Chart
