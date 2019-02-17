import React, { Component } from 'react';
import StackedBarChart from './charts/StackedBarChart';
import stackBarChartData from './charts/stackedBarChartData';
export default class Taiga extends Component {
  render() {
    return(
      <div className="app-page">
        <h2>Taiga</h2>
        <div className="chart chart-stacked-bar">
          <span className="chart-title">Taiga Tasks</span>
          <StackedBarChart chartData={stackBarChartData}/>       
        </div>
      </div>
    );
  }
}