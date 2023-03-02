import React, { PureComponent } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import orders from "../orders.json";

export default class ReChartsLine extends PureComponent {
  static demoUrl = "https://codesandbox.io/s/tiny-line-chart-r5z0f";
  
  
  render() {
  
  const metric = this.props.props.props.metric;
  const data = orders.orders
  
  var arr = []
  
  function add(arr, ym, val) {
    const found = arr.some((el) => el.date === ym);
    if (!found) {
      arr.push({ 'date': ym, 'val': val });
    } else {
      let obj = arr.find((f) => f.date === ym);
      if (obj) obj.val += val 
    }
    return arr;
  }
  
  for (var i = 0; i < data.length; i++) {
    var date = new Date(data[i]['Order Date']);
    var ym = date.getFullYear() + "-" + (date.getMonth()+1);
    var val = data[i][metric]
    arr = add(arr,ym, val)
  }
  
  console.log(arr)
    
    return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart width={300} height={100} data={arr}>
          <Tooltip />
          <Line
            type="monotone"
            dataKey="val"
            stroke="#03647a"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    );
  }
}
