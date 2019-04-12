import React, { Component } from 'react';
import NumberDisplay from './NumberDisplay'
import {Doughnut, Line} from 'react-chartjs-2';
import {saveLayoutToLocalStorage, getLayoutFromLocalStorage, getFromLocalStorage} from '../utils/utils';
import { WidthProvider, Responsive } from "react-grid-layout";
import colors from '../styles/colors';
import { Bar } from 'react-chartjs-2';
import { selectUserTaskDistributionChartData } from '../reducers';
import { connect } from 'react-redux';
import { loadAllTaigaProjectData } from '../actions/taigaActions';
import { loadAllGitHubProjectData } from '../actions/githubActions';
import { 
  selectTaigaProjectData,
  selectProjectTechnologiesChartData 
} from '../reducers';

const ResponsiveReactGridLayout = WidthProvider(Responsive);
const layoutname = 'overview-layout';
let originalLayouts = getLayoutFromLocalStorage(layoutname, 'layouts') || {};

//export default 
class Overview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      layouts: JSON.parse(JSON.stringify(originalLayouts)),
      taigaSlug: getFromLocalStorage('taiga-slug') || '',
      githubOwner: getFromLocalStorage('github-owner') || '',
      githubRepo: getFromLocalStorage('github-repo') || ''
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
    saveLayoutToLocalStorage(layoutname, 'layouts', layouts);
    this.setState({ layouts: layouts });
  }

  componentWillMount() {
    // Handle if user refreshes on overview page
    if (Object.keys(this.props.taigaProjectData).length == 0) {
      const auth = getFromLocalStorage('auth-key');
      loadAllTaigaProjectData(this.state.taigaSlug);
      loadAllGitHubProjectData(this.state.githubOwner, this.state.githubRepo, auth);
    }
    originalLayouts = getLayoutFromLocalStorage(layoutname, 'layouts') || [];
    this.setState({ layouts: JSON.parse(JSON.stringify(originalLayouts)) });
  }

  render() {
    return (
      <div className="app-page">
        <h2>Overview: <p style={{color: colors.blue.base, display: 'inline'}}>
            {this.state.githubRepo}</p> | <p style={{color:colors.red.base, display: 'inline'}}>
            {this.state.taigaSlug}</p></h2>
        <ResponsiveReactGridLayout
          className="layout"
          cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
          rowHeight={30}
          layouts={this.state.layouts}
          onLayoutChange={(layout, layouts) =>
            this.onLayoutChange(layout, layouts)
          }
        >
          <div className='box' key="1" data-grid={{ w: 2, h: 5, x: 0, y: 0, minW: 0, minH: 0 }}>
            <NumberDisplay number="43" statistic="Total Commits"/>
          </div>
          <div className='box' key="2" data-grid={{ w: 3, h: 5, x: 2, y: 0, minW: 0, minH: 0 }}>
            <div className="chart chart-pie">
              <span className="chart-title">Technologies Used</span>
              <Doughnut data={this.props.techUsedChartData} options={{maintainAspectRatio: true, responsive: true}}/>
            </div>
          </div>
          <div className='box' key="3" data-grid={{ w: 5, h: 7, x: 5, y: 0, minW: 0, minH: 0 }}>
            <div className="chart chart-horizontal-primary">
              <span className="chart-title">Github Contributions</span>
              <Line data={gitContributionsData} options={{maintainAspectRatio: true, responsive: true}}/>
            </div>
          </div>
          <div className='box' key="4" data-grid={{ w: 5, h: 7, x: 5, y: 0, minW: 0, minH: 0 }}>
            <div className="chart chart-horizontal-primary">
              <span className="chart-title">Taiga Task Distributions</span>
              <Bar data={this.props.taigaTaskDistribution} options={barGraphOptions}/>
            </div>
          </div>

        </ResponsiveReactGridLayout>
      </div>
    )
  }
}

let gitContributionsData = {
  labels: ["1/31", "2/3", "2/7", "2/10", "2/14", "2/17", "2/18", '2/19', '2/20', '2/21'],
  datasets: [{
    fill: false,
    label: 'Commits on Master',
    data: [1, 2, 5, 8, 10, 15, 17, 18, 22, 27, 30, 32],
    lineWidth: 2,
    borderColor: [
      colors.blue.base
    ],
    borderWidth: 3
  }]
}


const barGraphOptions = {
  maintainAspectRatio: true,
  responsive: true,
  scales: {
    yAxes: [{
      scaleLabel:{
        display: true,
        labelString: "Count"
      },
      ticks: {
        autoSkip: false
      }
    }],

    xAxes: [{
      scaleLabel:{
        display: true,
        labelString: "Contributors"
      },
      ticks: {
        autoSkip: false
      }
    }]
    }
}
const mapStateToProps = state => ({
  taigaTaskDistribution: selectUserTaskDistributionChartData(state),
  taigaProjectData: selectTaigaProjectData(state),
  techUsedChartData: selectProjectTechnologiesChartData(state)
});
export default connect(mapStateToProps, { 
  loadAllGitHubProjectData,
  loadAllTaigaProjectData
})(Overview)