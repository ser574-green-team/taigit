import React, { Component } from 'react';
import NumberDisplay from './NumberDisplay'
import GridLayout from 'react-grid-layout';
import {Doughnut, Line} from 'react-chartjs-2';

export default class Overview extends Component {
  render() {
    return (
      <div className="app-page">
        <h2>Team Project Name</h2>
        <GridLayout className="layout" cols={12} rowHeight={30} width={1200}>
          <div className='box' key="1" data-grid={{ w: 2, h: 5, x: 0, y: 0, minW: 2, minH: 5 }}>
            <NumberDisplay number="43" statistic="Total Commits"/>
          </div>
          <div className='box' key="2" data-grid={{ w: 3, h: 5, x: 2, y: 0, minW: 3, minH: 5 }}>
            <div className="chart chart-pie">
            <span className="chart-title">Technologies Used</span>
            <Doughnut data={technologiesUsed} options={{maintainAspectRatio: true, responsive: true}}/>
            </div>
          </div>
          <div className='box' key="3" data-grid={{ w: 5, h: 7, x: 5, y: 0, minW: 2, minH: 3 }}>
            <div className="chart chart-horizontal-primary">
              <span className="chart-title">Github Contributions</span>
              <Line data={lineData} options={{maintainAspectRatio: false, responsive: true}}/>
            </div>
          </div>
          <div className='box' key="4" data-grid={{ w: 2, h: 3, x: 6, y: 0, minW: 2, minH: 3 }}>
            <span className="text">4</span>
          </div>
          <div className='box' key="5" data-grid={{ w: 2, h: 3, x: 8, y: 0, minW: 2, minH: 3 }}>
            <span className="text">5</span>
          </div>
        </GridLayout>
      </div>
    )
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

let lineData = {
  labels: ["1/31", "2/3", "2/7", "2/10", "2/14", "2/17"],
  datasets: [{
    label: 'Commits by #1',
    data: [1, 2, 1, 2, 1, 2],
    backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
    ],
    borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
    ],
    borderWidth: 1
  }, {
    label: 'Commits  by #2',
    data: [1, 0, 1, 2, 0, 1],
    backgroundColor: 'rgba(100,100,100,0.1)',
    borderColor: 'rgba(0,100,0,1)',
    borderWidth: 1,
    fill: false
}]
};