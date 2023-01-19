import React from 'react'
import Card from './Card'

export default function Main() {

  const dimension = 'Category'
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
        <Card type = 'kpi'/>
        <Card type = 'kpi'/>
        <Card type = 'kpi'/>
        <Card type = 'kpi'/>
        <Card type = 'bar' dimension = {dimension} metric = {value} />
        <Card type = 'column' dimension = {dimension} metric = {value} />
        <Card type = 'bar' dimension = {dimension} metric = {value} />
        <Card type = 'bar' dimension = {dimension} metric = {value} />
        <Card type = 'bar' dimension = {dimension} metric = {value} />
        <Card type = 'bar' dimension = {dimension} metric = {value} />
      </div>
    </div>
      
  )
}
