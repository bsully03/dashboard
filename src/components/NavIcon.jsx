import React from 'react'

export default function NavIcon(props) {
  return (
    <div class='NavIcon tooltip'>
      <div>
        {props.name === "Overview" ? <i class="fi fi-rr-stats"></i> : 
          props.name === "Metrics" ? <i class="fi fi-rr-chart-pyramid"></i> :
          <i class="fi fi-rr-bars-progress"></i>
        }
        <span class="tooltiptext">{props.name}</span>
      </div>
    </div>
  )
}
