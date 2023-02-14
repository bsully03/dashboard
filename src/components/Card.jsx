import React, { useState, useEffect, useRef } from "react";
import Kpi from "./kpi";
import Example from "./reChartsBars";

export default function Card(props) {
  const [height, setHeight] = useState(0);
  const [width, setwidth] = useState(0);
  const elementRef = useRef(null);

  const getSize = () => {
    setHeight(elementRef.current.clientHeight * .95);
    setwidth(elementRef.current.clientWidth * .95);
  }

  useEffect(() => {
    getSize()
  }, [elementRef]); //empty dependency array so it only runs once at render

    useEffect(() => {
      window.addEventListener("resize", getSize);
    }, []);

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
  );
}
