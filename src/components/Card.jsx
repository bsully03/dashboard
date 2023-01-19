import React from 'react'
import Chart from './chart'

export default function Card(props) {

  return (
    <div className = 'Card'>
      <Chart {...props} />  
    </div>
  )
}
