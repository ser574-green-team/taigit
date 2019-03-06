import React, { Component } from 'react';
import BarChart from './charts/BarChart';
import NumberDisplay from './NumberDisplay'
import barChartData from './charts/barChartData'
import { getBranchList } from '../actions/githubActions';
import { connect } from 'react-redux';

class GitHub extends Component {
  componentWillMount() {
    this.props.getBranchList();
  }

  render() {
    return(
      <div className="app-page">
        <h2>GitHub</h2>
          <div className="chart chart-bar">
              <span className="chart-title">Commits Per Member</span>
              <BarChart chartData={barChartData}/>
          </div>
          <NumberDisplay number="13" statistic="Pull Requests Created"/>
          <NumberDisplay number="6" statistic="Pull Requests Reviewed"/>
          <h3>List of Branches</h3>
          {this.props.branches.map((branchName) => {
            return <p>{branchName}</p>
          })}
      </div>
    );
  }
}

/**
 * mapStateToProps
 * maps state in redux store (right)
 * to component props property (left)
 */
const mapStateToProps = state => ({
  branches: state.github.branchesList
});

/**
 * connect(mapStateToProps, actions)(componentName)
 * connects the component to the redux store
 */
export default connect(mapStateToProps, { getBranchList })(GitHub)
