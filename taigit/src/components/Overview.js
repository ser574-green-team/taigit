import React, { Component } from 'react';
import Chart from './charts/Chart';

class Overview extends Component {

  constructor(){
    super();
    this.state = {
      chartData:{},
      chartCommits:{}
    }
  }

  componentWillMount(){
    this.getChartLanguages();
    this.getChartCommits();
  }

  getChartLanguages(){
    // Ajax call here to get the data from API
    this.setState({
      chartLanguages:{
        labels: ['Front End', 'Back End', 'DataBase'],
        datasets:[{
            label:'Technologies Used',
            lang:[
              'ReactJs',
              'Python',
              'SQL'
          ],
          backgroundColor:[
            'rgba(255,99,32,0.6)',
            'rgba(54,162,130,0.6)',
            'rgba(128,153,128,0.6)',
            'rgba(255,255,75,0.6)'
          ]
        }
      ]
    }

    });
  }

  getChartCommits(){
    // Ajax call here to get the data from API
    this.setState({
      chartCommits:{
        labels: ['taigit'],
        datasets:[{
            label:'Total Commits',
            commt:[400
            ],
            backgroundColor2:[
              'rgba(255,99,32,0.6)',
              'rgba(54,162,130,0.6)'
            ]
        }
      ]
    }
    });
  }

  render() {
    return(
      <div className="app-page">
        <h2>Overview</h2>
        <p>
          This is a Dashboard.
        </p>
        <Chart chartLanguages={this.state.chartLanguages} language="Programming" legendPosition="bottom"/>
        <Chart chartCommits={this.state.chartCommits} commits="GitHub" legendPosition="bottom"/>
      </div>
    );
  }
}
export default Overview;
