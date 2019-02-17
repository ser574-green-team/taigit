import React, {Component} from 'react';
import {Bar} from 'react-chartjs-2';

export default class StackedBarChart extends Component {
  render() {
    return (
      <div>
      <Bar
        data = {this.props.chartData}
        options = {{
          responsive: true,
          scales: {
            xAxes: [{
              stacked: true,
            }],
            yAxes: [{
              stacked: true
            }]
          }
        }}
      />
      </div>
    )
  }
}