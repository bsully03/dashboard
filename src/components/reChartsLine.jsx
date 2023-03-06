import React, { PureComponent } from "react";
import {
  LineChart,
  Line,
  Tooltip,
  ResponsiveContainer,
  XAxis
} from "recharts";
import formatter from "../helper functions/formatter";

export default class ReChartsLine extends PureComponent {  
  
  render() {
  
  const metric = this.props.metric;
  const data = this.props.data
  
  var arr = []
  
  function add(arr, ym, val, sortDate, metric) {
    const found = arr.some((el) => el.date === ym);
    if (!found) {
      arr.push({ 'date': ym, [metric]: val, 'sortDate': sortDate });
    } else {
      let obj = arr.find((f) => f.date === ym);
      if (obj) obj[metric] += val 
    }
    return arr;
  }

  
  for (var i = 0; i < data.length; i++) {
    var date = new Date(data[i]['Order Date']);
    
    const months = [
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
    ];
    var ym = months[date.getMonth()] + " " + date.getFullYear()
    var val = data[i][metric]
    arr = add(arr, ym, val, date, metric)
  }
  
  arr = arr.sort(function (a, b) {
    return a.sortDate - b.sortDate;
  });

    return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart width={300} height={100} data={arr}>
          <Tooltip
            formatter={
              metric === 'Quantity' ?
              (value) => new Intl.NumberFormat("en").format(value) :
              (value) => formatter.format(value)
            }
          />
          <XAxis dataKey="date" hide={true} />
          <Line
            type="monotone"
            dataKey={metric}
            stroke="#03647a"
            strokeWidth={3}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    );
  }
}
