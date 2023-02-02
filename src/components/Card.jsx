import React, { useState, useEffect, useRef } from "react";
import Chart from "./chart";

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
    <div ref={elementRef} className="Card" x={height}>
      <Chart props = {props} height = {height} width={width}/>
    </div>
  );
}
