import React, { useState, useEffect, useRef } from "react";
import Kpi from "./kpi";
import ReChartsBar from "./reChartsBars";

export default function Card(props) {

  return (
    <div  className="Card" >
      {props.type === "kpi" ? (
        <Kpi {...props} />
      ) : (
        <ReChartsBar {...props} />
      )}
    </div>
  );
}
