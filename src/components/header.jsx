import React from "react";

export default function Header(props) {
  function getFullMonth(date) {
    const month = date.getMonth() + 1;
    return month < 10 ? "0" + month : month;
  }

  function getFullDay(date) {
    const day = date.getDate()+1;
    return day < 10 ? "0" + day : day;
  }

  var maxDateUse = 
    props.maxDate.getFullYear() +
    "-" +
    getFullMonth(props.maxDate) +
    "-" +
    getFullDay(props.maxDate);

  var minDateUse = 
    props.minDate.getFullYear() +
    "-" +
    getFullMonth(props.minDate) +
    "-" +
    getFullDay(props.minDate);

  return (
    <div className="main-header">
      <div>
        <h1>Overview Dashboard</h1>
        <p>Welcome, Guest!</p>
      </div>
      <div>
        <label>Start date: </label>
        <input
          type="date"
          id="start"
          name="start"
          value={minDateUse}
          min="2018-01-01"
          max="2024-12-31"
          onChange={props.handleMinDateChange}
        ></input>
        <label>End date: </label>
        <input
          type="date"
          id="end"
          name="end"
          value={maxDateUse}
          min="2018-01-01"
          max="2024-12-31"
          onChange={props.handleMaxDateChange}
        ></input>
        <label>Choose a Metric: </label>
        <select 
            id="metric" 
            name="metric"
            onChange={props.handleValueChange}
            value = {props.value}>
          <option value="Profit">Profit</option>
          <option value="Sales">Sales</option>
          <option value="Quantity">Quantity</option>
        </select>
      </div>
    </div>
  );
}
