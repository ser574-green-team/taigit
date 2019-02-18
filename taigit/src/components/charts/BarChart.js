import React, {Component} from 'react';
import {Bar, Line, Pie} from 'react-chartjs-2';

export default class Chart extends Component {
  render() {
    return (
      <div>
      <Bar
        data = {this.props.chartData}
        options = {{
          maintainAspectRatio: false,
          scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
          }
        }}
      />
      </div>
    )
  }
}