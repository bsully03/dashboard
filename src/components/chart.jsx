
import React, { Component } from 'react'
import * as d3 from 'd3'
import orders from '../orders.json'

class Chart extends Component {

    componentDidMount() {
        const dimension = this.props.dimension
        const metric = this.props.metric
        const type = this.props.type

        var result = [];
        orders.orders.reduce(function(res, value) {
          if (!res[value[dimension]]) {
            res[value[dimension]] = { [dimension]: value[dimension], [metric]: 0 };
            result.push(res[value[dimension]])
          }
          res[value[dimension]][metric] += value[metric];
          return res;
        }, {});

        ( type === 'bar' ? this.drawBarChart(result, metric) : setTimeout(999999))
    }

    
    drawBarChart(result, metric)  {
      
      const height = 150
      const width = 250

      const arr = result.map(d => d[metric]);
      const maxVal = Math.max(...arr)

      const factor = .75
      
      const svgCanvas = d3.select(this.refs.canvas)
        .append('svg')
        .attr('class', 'ChartContain')
        .attr('width', '100%')
        .attr('height', '80%')
        .attr('margin', 'auto')

      svgCanvas.selectAll('rect')
        .data(result)
        .enter()
        .append('rect')
        .attr('class', 'bars')
        .attr('width',  (width / result.length) - 5 )
        .attr('height', (d) => (d[this.props.metric] / maxVal) * (height * factor))
        .attr('x', (d, i) => i * (width / result.length))
        .attr('y', (d) => height - (d[this.props.metric] / maxVal) * (height * factor) )
        .attr('val', (d)=> d[this.props.metric])
        .text(d  => d[this.props.dimension])
    }
    render() { 
      return (
        <div ref="canvas"></div>
      )
     }
}
export default Chart
