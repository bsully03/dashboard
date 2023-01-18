import React from 'react'
import Card from './Card'

export default function Main() {
  return (
    <div class='main-contain'>
      <div className='main-header'>
        <h1>Overview Dashboard</h1>
        <p>
          Welcome, Guest!
        </p>
      </div>
      <div class="Main">
        <Card name = 'kpi1'/>
        <Card name = 'kpi2'/>
        <Card name = 'kpi3'/>
        <Card name = 'kpi4'/>
        <Card name = 'viz1'/>
        <Card name = 'viz2'/>
        <Card name = 'viz3'/>
        <Card name = 'viz4'/>
        <Card name = 'viz5'/>
        <Card name = 'viz6'/>
      </div>
    </div>
      
  )
}
