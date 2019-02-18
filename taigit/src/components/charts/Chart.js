import React, {Component} from 'react';
import {Bar, Line, Pie} from 'react-chartjs-2';

class Chart extends Component{
  constructor(props){
    super(props);
    this.state = {
      chartLanguages:this.props.chartLanguages,
      chartCommits:this.props.chartCommits
      }
    }

  static defaultProps = {
    displayTitle:true,
    displayLegend: true,
    legendPosition:'right',
    language:'OOP',
    commits:'20'
  }


  render(){
    return (
      <div className="chart">
        <Pie
           language={this.state.chartLanguages}
  	       options={{
             title:{
              display:this.props.displayTitle,
              text:'Technologies Used in Project ' + this.props.language,
              fontSize:25
            },
            legend:{
              display:this.props.displayLegend,
              position:this.props.legendPosition
            }
          }}
        />

        <Line
           commits={this.state.chartCommits}
  	       options={{
             title:{
              display:this.props.displayTitle,
              text:'Total Number of Commits  ' + this.props.commits,
              fontSize:25
            },
            legend:{
              display:this.props.displayLegend,
              position:this.props.legendPosition
            }
          }}
        />


      </div>
    )
  }
}

export default Chart;
