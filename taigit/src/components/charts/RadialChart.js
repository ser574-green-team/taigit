import React, {Component} from 'react';
import {Radar} from 'react-chartjs-2';

export default class RadialChart extends Component {
  render() {
    return (
      <div>
      <Radar
        data = {{
          labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
          datasets: [{
            label: '# of Votes',
            data: [12, 19, 15, 15, 14, 10],
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