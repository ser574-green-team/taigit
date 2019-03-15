import React, { Component } from 'react';
import PropTypes from 'prop-types';
import StackedBarChart from './charts/StackedBarChart';
import stackBarChartData from './charts/stackedBarChartData';
import DoughnutChart from './charts/DoughnutChart';
import { connect } from 'react-redux';
import { grabTaigaData } from '../actions/taigaActions';
import {getTaskStatusCount} from '../libraries/Taiga';

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

class Taiga extends Component {
  componentWillMount() {
    this.props.grabTaigaData();
  }

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
        </div>
        <h4>{this.props.storeData}</h4>
        <div>
        {console.log(getTaskStatusCount('sanaydevi-ser-574').then((val)=> 
              {console.log('fe1: ', val)}
              ))}
        </div>
      </div>
    );
  }
}

/**
 * Declaring the types for all props that Taiga component uses
 */
Taiga.propTypes = {
  grabTaigaData: PropTypes.func.isRequired,
  data: PropTypes.string
}

/**
 * mapStateToProps
 * maps state in redux store (right)
 * to component props property (left)
 */
const mapStateToProps = state => ({
  storeData: state.taiga.taigaData
});

/**
 * connect(mapStateToProps, actions)(componentName)
 * connects the component to the redux store
 */
export default connect(mapStateToProps, { grabTaigaData })(Taiga)