import React, { Component } from 'react';
import LineChart from './charts/LineChart';
import DoughnutChart from './charts/DoughnutChart';

export default class Overview extends Component {
  render() {
    return(
      <div className="app-page">
        <h2>Overview</h2>
          <div className="chart chart-pie">
            <span className="chart-title">Number of Commits</span>
            <DoughnutChart chartData={numberOfCommits} options={{}}/>
          </div>
        <div className="chart chart-vertical-primary">
          <span className="chart-title">Technologies Used </span>
          <LineChart chartData={technologiesUsed} options={{}}/>
        </div>
      </div>
    );
  }
}



let technologiesUsed = {
  labels: ["Front-End", "Back-End", "Database"],
  datasets: [{
    label: 'Technologies Used',
    data: ['ReactJS', 'Python', 'SQL'],
    backgroundColor: [
        'rgb(43, 175, 204, 1)',
        'rgb(62, 273, 99, 1)',
        'rgb(13, 206, 110, 1)',
    ],
  }]
}

let numberOfCommits = {
  labels: ["01/31", "02/05", "02/10", "02/15", "02/17"],
  datasets: [{
    label: 'Number of Commits',
    data: [5, 14, 21, 46, 130],
    backgroundColor: [
        'rgb(73, 63, 74, 1)',
        'rgb(163, 45, 124, 1)',
        'rgb(143, 75, 104, 1)',
        'rgb(242, 73, 69, 1)',
        'rgb(23, 26, 210, 1)',
    ],
  }]
}
