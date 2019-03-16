import React, { Component } from 'react';
import StackedBarChart from './charts/StackedBarChart';
import stackBarChartData from './charts/stackedBarChartData';
import DoughnutChart from './charts/DoughnutChart';
import {us_history} from '../libraries/Taiga';


let taigaUsProgress = {
  labels: ["Completed", "In Progress", "Not Done"],
  datasets: [{
    label: 'User Story Progress',
    data: [5, 4, 13],
    backgroundColor: [
        'rgb(242, 105, 104, 1)',
        'rgb(242, 173, 159, 1)',
        'rgb(223, 226, 210, 1)',
    ],
  }]
}

export default class Taiga extends Component {
  render() {
    return(
      <div className="app-page">
        <h2>Taiga</h2>
        <div className="chart chart-pie">
          <DoughnutChart title="User Stories" chartData={taigaUsProgress} options={{}}/>
        </div>
        <div className="chart chart-stacked-bar">
          <span className="chart-title">Taiga Tasks</span>
          <StackedBarChart chartData={stackBarChartData}/>
          {console.log(us_history(2657204).then(val => console.log(val)))}
        </div>
      </div>
    );
  }
}
