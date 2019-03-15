import React, { Component } from 'react';
import NumberDisplay from './NumberDisplay'
import GridLayout from 'react-grid-layout';
import { getBranchList, getCommitsPerUser } from '../actions/githubActions';
import { selectBranchList, selectNumCommitsChartData } from '../reducers';
import { connect } from 'react-redux';
import { Bar } from 'react-chartjs-2';
import barChartData from './charts/barChartData';

class GitHub extends Component {
  // Calls methods in actions/githubActions to fetch data from API
  componentWillMount() {
    this.props.getBranchList();
    this.props.getCommitsPerUser('trevorforrey', 'OttoDB', 'trevorforrey');
  }

  render() {
    return(
      <div className="app-page">
        <h2>GitHub</h2>
        <GridLayout className="layout" cols={12} rowHeight={30} width={1200}>
          <div className='box' key="1" data-grid={{ w: 4, h: 6, x: 0, y: 0, minW: 2, minH: 5 }}>
            <div className="chart">
                <span className="chart-title">Commits Per Member</span>
                <Bar data={barChartData} options={{maintainAspectRatio: true, responsive: true}}/>
            </div>
          </div>
          <div className='box' key="2" data-grid={{ w: 2, h: 5, x: 0, y: 0, minW: 2, minH: 5 }}>
            <NumberDisplay number="13" statistic="Pull Requests Created"/>
          </div>
          <div className='box' key="3" data-grid={{ w: 2, h: 5, x: 2, y: 0, minW: 2, minH: 5 }}>
            <NumberDisplay number="6" statistic="Pull Requests Reviewed"/>
          </div>
          <div className='box' key="4" data-grid={{ w: 2, h: 9, x: 0, y: 0, minW: 2, minH: 5 }}>
            <h3>List of Branches</h3>
            {this.props.branches.map((branchName) => {
              return <p>{branchName}</p>
            })}
          </div>
          <div className='box' key="5" data-grid={{ w: 3, h: 5, x: 4, y: 0, minW: 2, minH: 5 }}>
            <div className="chart">
                <span className="chart-title">(Redux) Commits Per Member</span>
                <Bar data={this.props.commitChartData} options={{maintainAspectRatio: true, responsive: true}}/>
            </div>
          </div>
        </GridLayout>
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
  branches: selectBranchList(state),
  commitChartData: selectNumCommitsChartData(state)
});

/**
 * connect(mapStateToProps, actions)(componentName)
 * connects the component to the redux store
 */
export default connect(mapStateToProps, { getBranchList, getCommitsPerUser })(GitHub)
