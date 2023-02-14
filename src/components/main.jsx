import React from 'react'
import Card from './Card'

export default function Main() {

  const dimension = 'Segment'
  const value = 'Sales'

  return (
    <div className ='main-contain'>
      <div className='main-header'>
        <h1>Overview Dashboard</h1>
        <p>
          Welcome, Guest!
        </p>
      </div>
      <div className="Main">
        <Card type = 'kpi' dimension = {dimension} metric = 'Sales'/>
        <Card type = 'kpi' dimension = {dimension} metric = 'Profit'/>
        <Card type = 'kpi' dimension = {dimension} metric = 'Quantity'/>
        <Card type = 'kpi' dimension = {dimension} metric = {value}/>
        <Card type = 'bar' dimension = 'Category' metric = {value} />
        <Card type = 'column' dimension = {dimension} metric = {value} />
        <Card type = 'bar' dimension = 'Segment' metric = {value} />
        <Card type = 'column' dimension = 'Region' metric = {value} />
        <Card type = 'bar' dimension = 'Sub-Category' metric = {value} />
        <Card type = 'column' dimension = 'Ship Mode' metric = {value} />
      </div>
    </div>
      
  )
}
