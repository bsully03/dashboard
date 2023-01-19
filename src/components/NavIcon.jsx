import React from 'react'

export default function NavIcon(props) {
  return (
    <div className='NavIcon tooltip'>
      <div>
        {props.name === "Overview" ? <i className="fi fi-rr-stats"></i> : 
          props.name === "Metrics" ? <i className="fi fi-rr-chart-pyramid"></i> :
          <i className="fi fi-rr-bars-progress"></i>
        }
        <span className="tooltiptext">{props.name}</span>
      </div>
    </div>
  )
}
