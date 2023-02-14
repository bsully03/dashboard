import React from 'react'
import ReChartsLine from './reChartsLine'

export default function Kpi(props) {
    // complete necessary data transformations here
    // Add appropriate formatting here
  return (
    <div style={{ width: "100%", height: 50 }}>
        <span>{props.props.metric}</span>
        <br/>
        <span>1,000</span>
        <ReChartsLine props={props} />
    </div>
  );
}
