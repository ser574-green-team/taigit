import React, {Component} from 'react';
import {HorizontalBar} from 'react-chartjs-2';

export default class Chart extends Component {
    render() {
        return (
            <div>
                <HorizontalBar
                    type = 'horizontalBar'
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