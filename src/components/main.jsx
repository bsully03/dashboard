import React from 'react'
import Card from './Card'
import orders from "../orders.json";
import Header from './header';
import { useState } from 'react';

export default function Main() {

  const [minDate, setMinDate] = useState(new Date("1/1/2019"));
  const [maxDate, setMaxDate] = useState(new Date("12/30/2019"));
  const [value, setValue] = useState("Profit");

  const handleMinDateChange = (event) => {
    console.log(event.target.value)
    setMinDate(new Date(event.target.value));
  };
  const handleMaxDateChange = (event) => {
    setMaxDate(new Date (event.target.value));
  };

  const handleValueChange = (event) => {
    setValue(event.target.value)
  }

  const dimension = 'Segment'
  const rawData = orders.orders;

  var data = rawData.map((x) => {
    x.dateOrderDate = new Date(x['Order Date']);
    return x;
  });

  data = rawData.filter(
    function (el) {
      return (
        el.dateOrderDate >= minDate &&
        el.dateOrderDate <= maxDate
      );
    },
    minDate,
    maxDate
  );

  return (
    <div className ='main-contain'>
      <Header 
        minDate = {minDate} 
        maxDate = {maxDate} 
        value = {value}
        handleMinDateChange = {handleMinDateChange} 
        handleMaxDateChange = {handleMaxDateChange}
        handleValueChange = {handleValueChange}
      />
      <div className="Main">
        <Card type = 'kpi' dimension = {dimension} metric = 'Sales' data  = {data}/>
        <Card type = 'kpi' dimension = {dimension} metric = 'Profit' data  = {data}/>
        <Card type = 'kpi' dimension = {dimension} metric = 'Quantity' data  = {data}/>
        <Card type = 'kpi' dimension = {dimension} metric = {value} data  = {data}/>
        <Card type = 'bar' dimension = 'Category' metric = {value}  data  = {data}/>
        <Card type = 'column' dimension = {dimension} metric = {value}  data  = {data}/>
        <Card type = 'bar' dimension = 'Segment' metric = {value}  data  = {data}/>
        <Card type = 'column' dimension = 'Region' metric = {value}  data  = {data}/>
        <Card type = 'bar' dimension = 'Sub-Category' metric = {value}  data  = {data}/>
        <Card type = 'column' dimension = 'Ship Mode' metric = {value}  data  = {data}/>
      </div>
    </div>
      
  )
}
