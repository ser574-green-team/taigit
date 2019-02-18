import React, { Component } from 'react'
import BarChart from './charts/Chart';

export default class GitHub extends Component {
  render() {
    return(
      <div className="app-page">
        <h2>GitHub</h2>
        <div className="chart chart-horizontal-primary">
        <BarChart/>
        </div>
        <div className="chart chart-square-primary"></div>
        <div className="chart chart-horizontal-primary"></div>
        <div className="chart chart-square-primary"></div>
        <div className="chart chart-horizontal-primary"></div>
        <div className="chart chart-square-primary"></div>
        <div className="chart chart-square-primary"></div>
        <div className="chart chart-horizontal-primary"></div>
        <div className="chart chart-square-primary">
        </div>
      </div>
    );
  }
}
