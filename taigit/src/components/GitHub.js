import React, { Component } from 'react';
import NumberDisplay from './NumberDisplay'
import { getBranchList, getCommitsPerUser, getPullRequests, getContributorData, getBranchCommits } from '../actions/githubActions';
import { selectBranchList, selectNumCommitsChartData, selectNumPullRequestsData, selectCommitsPerContributorChartData, selectNumBranchCommits } from '../reducers';
import { connect } from 'react-redux';
import { Bar } from 'react-chartjs-2';
import { saveToLocalStorage, getFromLocalStorage } from '../utils/utils';
import { WidthProvider, Responsive } from "react-grid-layout";
import HorizBarChart from './charts/HorizBarChart'
import colors from "../styles/colors";

const ResponsiveReactGridLayout = WidthProvider(Responsive);
const layoutname = 'github-layout';
let originalLayouts = getFromLocalStorage(layoutname, 'layouts') || {};

class GitHub extends Component {
  constructor(props) {
    super(props);

    this.state = {
      layouts: JSON.parse(JSON.stringify(originalLayouts))
    };
  }
  
  static get defaultProps() {
    return {
      className: "layout",
      cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
      rowHeight: 30
    }
  };

  onLayoutChange(layout, layouts) {
    saveToLocalStorage(layoutname, 'layouts', layouts);
    this.setState({ layouts: layouts });
  }

  // Calls methods in actions/githubActions to fetch data from API
  componentWillMount() {
    this.props.getBranchList();
    this.props.getCommitsPerUser('trevorforrey', 'OttoDB', 'trevorforrey');
    this.props.getPullRequests('ser574-green-team', 'taigit');
    this.props.getContributorData();
    this.props.getBranchCommits('ser574-green-team', 'taigit', 'master');
    this.props.getBranchCommits('ser574-green-team', 'taigit', 'dev');
      originalLayouts = getFromLocalStorage(layoutname, 'layouts') || [];
    this.setState({ layouts: JSON.parse(JSON.stringify(originalLayouts)) });
  }

  render() {
    return(
      <div className="app-page">
        <h2>GitHub</h2>
        <ResponsiveReactGridLayout
          className="layout"
          cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
          rowHeight={30}
          layouts={this.state.layouts}
          onLayoutChange={(layout, layouts) =>
            this.onLayoutChange(layout, layouts)
          }
        >
          <div className='box' key="1" data-grid={{ w: 3, h: 5, x: 4, y: 0, minW: 0, minH: 0 }}>
            <div className="chart">
                <span className="chart-title">Commits Per Member</span>
                <Bar data={this.props.commitChartData} options={{maintainAspectRatio: true, responsive: true}}/>
            </div>
          </div>
          <div className='box' key="2" data-grid={{ w: 2, h: 5, x: 0, y: 0, minW: 0, minH: 0 }}>
            <NumberDisplay number="13" statistic="Pull Requests Created"/>
          </div>
          <div className='box' key="3" data-grid={{ w: 2, h: 5, x: 2, y: 0, minW: 0, minH: 0 }}>
            <NumberDisplay number="6" statistic="Pull Requests Reviewed"/>
          </div>
          <div className='box' key="4" data-grid={{ w: 2, h: 9, x: 0, y: 0, minW: 0, minH: 0 }}>
            <h3>List of Branches</h3>
            {this.props.branches.map((branchName) => {
              return <p>{branchName}</p>
            })}
          </div>
          <div className='box' key="5" data-grid={{ w: 2, h: 5, x: 2, y: 0, minW: 0, minH: 0 }}>
            <NumberDisplay number={this.props.numPullRequests} statistic="Pull Requests Open"/>
          </div>
          <div className="box" key="6" data-grid={{ w: 5, h: 5, x: 0, y: 0, minW: 0, minH: 0 }}>
            <div className="chart">
              <span className = "chart-title">Commits Per Branch</span>
              <HorizBarChart chartData={this.props.commitPerBranchData} options={{maintainAspectRatio: true, responsive: true}}/>
            </div>
          </div>
        </ResponsiveReactGridLayout>
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
  commitChartData: selectCommitsPerContributorChartData(state),
  numPullRequests: selectNumPullRequestsData(state),
  commitPerBranchData: selectNumBranchCommits(state),
});

/**
 * connect(mapStateToProps, actions)(componentName)
 * connects the component to the redux store
 */
export default connect(mapStateToProps, { getBranchList, getCommitsPerUser, getPullRequests, getContributorData, getBranchCommits })(GitHub)
