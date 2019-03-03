import React, { Component } from 'react';
import LineChart from './charts/LineChart';
import NumberDisplay from './NumberDisplay'
import DoughnutChart from './charts/DoughnutChart';

export default class Overview extends Component {
  render() {
    return (
      <div className="app-page">
        <h2>Overview</h2>
        <NumberDisplay number="43" statistic="Total Commits"/>
        <div className="chart chart-vertical-primary">
          <DoughnutChart title="Technologies Used" chartData={technologiesUsed} options={{}}/>
        </div>
        <div className="chart chart-horizontal-primary">
          <LineChart/>
        </div>
      </div>
    );
  }
}

let technologiesUsed = {
  labels: ["ReactJS", "Python", "HTML"],
  datasets: [{
    label: 'Technologies Used',
    data: [6, 4, 3],
    backgroundColor: [
        'rgb(43, 175, 204, 1)',
        'rgb(62, 273, 99, 1)',
        'rgb(13, 206, 110, 1)',
    ],
  }]
}