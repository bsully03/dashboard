import React, { PureComponent } from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";


import orders from "../orders.json";

export default class Example extends PureComponent {
  static demoUrl = "https://codesandbox.io/s/tiny-line-chart-r5z0f";

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

  
  render() {
    const dimension = this.props.props.dimension;
    const value = this.props.props.metric;
    const type = this.props.props.type;

    var data = this.sumByDimension(orders.orders, dimension, value)

    return (
      <div style={{ width: "100%", height: "100%" }}>
        <ResponsiveContainer>
          <BarChart
            width={150}
            height={40}
            data={data}
            layout={type === "bar" ? "horizontal" : "vertical"}
          >
            <Tooltip />
            <XAxis
              type={type === "bar" ? "category" : "number"}
              dataKey={type === "bar" ? dimension : ""}
              hide={true}
            />
            <YAxis
              dataKey={type === "bar" ? "" : dimension}
              type={type === "bar" ? "number" : "category"}
              hide={true}
            />
            <Bar dataKey={value} fill="#03647a" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }
}