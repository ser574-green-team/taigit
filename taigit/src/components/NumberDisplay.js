import React, { Component } from 'react'
import RadialChart from './charts/RadialChart'
import TeamMemberCard from './TeamMemberCard'

export default class NumberDisplay extends Component {
  render() {
    return(
      <div className="number-display">
        <div className="number-display-number">
          <span>{this.props.number}</span>
        </div>
        <div className="number-display-title">
          <h3>{this.props.statistic}</h3>
        </div>
      </div>
    );
  }
}