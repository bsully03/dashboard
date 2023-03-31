import React, { PureComponent } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LabelList
} from "recharts";
import formatter from "../helper functions/formatter";

export default class ReChartsBar extends PureComponent {

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
    const dimension = this.props.dimension;
    const value = this.props.metric;
    const type = this.props.type;

    var data = this.sumByDimension(this.props.data, dimension, value)

    const rightMargin = this.props.type === "bar" ? 20 : 120

    const topMargin = this.props.type === "bar" ? 20 : 5;

    return (
      <div style={{ width: "100%", height: "82%" }}>
        <p className="chartTitle">
          {value} by {dimension}
        </p>
        <ResponsiveContainer>
          <BarChart
            width={150}
            height={40}
            data={data}
            layout={type === "bar" ? "horizontal" : "vertical"}
            margin={{ top: topMargin, right: rightMargin , left: 20, bottom: 5 }}
          >
            <Tooltip
              formatter={
                value === "Quantity"
                  ? (value) => new Intl.NumberFormat("en").format(value)
                  : (value) => formatter.format(value)
              }
            />
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
            <Bar dataKey={value} fill="#03647a">
              <LabelList
                dataKey={dimension}
                position={type === "bar" ? "top" : "right"}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }
}