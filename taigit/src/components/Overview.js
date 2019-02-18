import React, { Component } from 'react';
import LineChart from './charts/LineChart';

export default class Overview extends Component {
  render() {
    return(
      <div className="app-page">
        <h2>Overview</h2>
        <div className="chart chart-horizontal-primary">
          <LineChart/>
        </div>
      </div>
    );
  }
}