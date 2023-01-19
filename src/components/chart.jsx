
import React, { Component } from 'react'
import * as d3 from 'd3'
import orders from '../orders.json'

class Chart extends Component {

    componentDidMount() {
        const dimension = this.props.dimension
        const metric = this.props.metric
        const type = this.props.type

        console.log(type)

        var result = [];
        orders.orders.reduce(function(res, value) {
          if (!res[value[dimension]]) {
            res[value[dimension]] = { [dimension]: value[dimension], [metric]: 0 };
            result.push(res[value[dimension]])
          }
          res[value[dimension]][metric] += value[metric];
          return res;
        }, {});

        (this.props.type === 'bar' ? this.drawBarChart(result) : setTimeout(999999))
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
        .attr('height', (d) => d[this.props.metric])
        .attr('fill', 'blue')
        .attr('x', (d, i) => i * 45)
        .attr('y', 20)
        .text(d  => d[this.props.dimension])
    }
    render() { 
      return (
        <div ref="canvas"></div>
      )
     }
}
export default Chart
