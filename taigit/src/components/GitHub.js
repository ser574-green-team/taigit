import React, { Component } from 'react';
import BarChart from './charts/BarChart';
import HorizBarChart from './charts/HorizBarChart'
import NumberDisplay from './NumberDisplay'
import commitPerMemberData from './charts/commitPerMemberData'
import commitPerBranchData from './charts/commitPerBranchData'
import * as GH from '../libraries/GitHub/GitHub';

export default class GitHub extends Component {
  render() {
    return(
      <div className="app-page">
        <h2>GitHub</h2>
          <div className="chart chart-bar">
              <span className="chart-title">Commits Per Member</span>
              <BarChart chartData={commitPerMemberData}/>
          </div>

          <NumberDisplay number="13" statistic="Pull Requests Created"/>
          <NumberDisplay number="6" statistic="Pull Requests Reviewed"/>

          <div className="chart horizontal-bar">
              <span className = "chart-title">Commits Per Branch</span>
              <HorizBarChart chartData={commitPerBranchData}/>
          </div>
      </div>
    );
  }
}
