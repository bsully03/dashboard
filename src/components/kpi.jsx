import React from 'react'
import ReChartsLine from './reChartsLine'
import formatter from '../helper functions/formatter'

export default function Kpi(props) {

  let result = props.data.reduce((a, b) => {
    return a + b[props.metric];
  }, 0);

  return (
    <div style={{ width: "100%", height: '20%' }}>
      <span className = 'kpiTitle'>{props.metric}</span>
      <br />
      <span>
        {
          props.metric === 'Quantity' ? result.toLocaleString() : formatter.format(result)
        }
      </span>
        <div style={{ width: "75%", height: 50, float: 'right' }}>
        <ReChartsLine {...props} />
        </div>
    </div>
  );
}
