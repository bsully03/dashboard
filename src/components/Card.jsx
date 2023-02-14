import React, { useState, useEffect, useRef } from "react";
import Kpi from "./kpi";
import Example from "./reChartsBars";

export default function Card(props) {

  return (
    <div  className="Card" >
      {
        //<Chart props = {props} height = {height} width={width}/>
      }
      {props.type === "kpi" ? (
        <Kpi props={props} />
      ) : (
        <Example props={props} />
      )}
    </div>
  )
}
