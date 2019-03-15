import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import GridLayout from 'react-grid-layout';
import { Doughnut, Bar } from 'react-chartjs-2';
import { grabTaigaData } from '../actions/taigaActions';
import stackBarChartData from './charts/stackedBarChartData';

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
        <GridLayout className="layout" cols={12} rowHeight={30} width={1200}>
          <div className='box' key="1" data-grid={{ w: 3, h: 5, x: 0, y: 0, minW: 3, minH: 5 }}>
            <div className="chart chart-pie">
              <span className="chart-title">User Story Progress</span>
              <Doughnut data={taigaUsProgress} options={{maintainAspectRatio: true, responsive: true}}/>
            </div>
          </div>
          <div className='box' key="2" data-grid={{ w: 5, h: 7, x: 3, y: 0, minW: 2, minH: 3 }}>
            <div className="chart">
              <span className="chart-title">Taiga Tasks</span>
              <Bar data={stackBarChartData} options={{maintainAspectRatio: true, responsive: true}}/>
            </div>
          </div>
          <h4>{this.props.storeData}</h4>
        </GridLayout>
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