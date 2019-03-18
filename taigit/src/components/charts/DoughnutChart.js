import React, {Component} from 'react';
import {Doughnut} from 'react-chartjs-2';

export default class DoughnutChart extends Component {
  render() {
    return (
      <div>
      <span className="chart-title">{this.props.title}</span>
      <Doughnut
        data = {this.props.chartData}
        options = {this.props.options}
      />
      </div>
    )
  }
}