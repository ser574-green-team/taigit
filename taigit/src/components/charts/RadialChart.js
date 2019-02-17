import React, {Component} from 'react';
import {Radar} from 'react-chartjs-2';

export default class RadialChart extends Component {
  render() {
    return (
      <div>
      <Radar
        data = {{
          labels: ["Commits", "Tasks Completed", "PRs Reviewed", "Taiga Edits", "Issues Documented"],
          datasets: [{
            label: 'Work Distribution',
            data: [12, 19, 15, 10, 2],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1,
          }]
        }}
      />
      </div>
    )
  }
}