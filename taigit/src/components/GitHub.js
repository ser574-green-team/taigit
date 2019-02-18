import React, { Component } from 'react';
import BarChart from './charts/BarChart';
import NumberDisplay from './NumberDisplay'
import barChartData from './charts/barChartData'
import * as GH from '../libraries/GitHub/GitHub';

export default class GitHub extends Component {
  render() {
    return(
      <div className="app-page">
        <h2>GitHub</h2>
          <div className="chart chart-bar">
              <span className="chart-title">Commits Per Member</span>
              <BarChart chartData={barChartData}/>
          </div>

          <NumberDisplay number="13" statistic="Pull Requests Created"/>
          <NumberDisplay number="6" statistic="Pull Requests Reviewed"/>
      </div>
    );
  }
}
