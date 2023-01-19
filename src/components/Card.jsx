import React from 'react'
import Chart from './chart'

export default function Card(props) {

  console.log(Element.innerHeight)

  return (
    <div className = 'Card'>
      <Chart {...props} />  
    </div>
  )
}
