import React, { Component } from 'react';
import Select from 'react-select'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Doughnut, Bar } from 'react-chartjs-2';
import { grabTaigaData } from '../actions/taigaActions';
import stackBarChartData from './charts/stackedBarChartData';
import { saveToLocalStorage, getFromLocalStorage } from '../utils/utils';
import { WidthProvider, Responsive } from "react-grid-layout";
import colors from '../styles/colors';

const ResponsiveReactGridLayout = WidthProvider(Responsive);
const layoutname = 'taiga-layout';
let originalLayouts = getFromLocalStorage(layoutname, 'layouts') || {};

const options = [
  { value: 'sprint1', label: 'Sprint 1 - Research' },
  { value: 'sprint2', label: 'Sprint 2 - Development' },
  { value: 'sprint3', label: 'Sprint 3 - Deployment' }
]

class Taiga extends Component {
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

  componentWillMount() {
    this.props.grabTaigaData();
    originalLayouts = getFromLocalStorage(layoutname, 'layouts') || [];
    this.setState({ layouts: JSON.parse(JSON.stringify(originalLayouts)) });
  }

  render() {
    return(
      <div className="app-page">
        <h2>Taiga</h2>
        <div className="selector">
          <Select options={options}
          theme={(theme) => ({
            ...theme,
            colors: {
            ...theme.colors,
              primary25: 'hotpink',
              primary: 'black',
            },
          })} />
        </div>
        <ResponsiveReactGridLayout
          className="layout"
          cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
          rowHeight={30}
          layouts={this.state.layouts}
          onLayoutChange={(layout, layouts) =>
            this.onLayoutChange(layout, layouts)
          }
        >
          <div className='box' key="1" data-grid={{ w: 3, h: 5, x: 0, y: 0, minW: 0, minH: 0 }}>
            <div className="chart chart-pie">
              <span className="chart-title">User Story Progress</span>
              <Doughnut data={taigaUsProgress} options={{maintainAspectRatio: true, responsive: true}}/>
            </div>
          </div>
          <div className='box' key="2" data-grid={{ w: 5, h: 7, x: 3, y: 0, minW: 0, minH: 0 }}>
            <div className="chart">
              <span className="chart-title">Taiga Tasks</span>
              <Bar data={stackBarChartData} options={{maintainAspectRatio: true, responsive: true}}/>
            </div>
          </div>
          <h4>{this.props.storeData}</h4>
        </ResponsiveReactGridLayout>
      </div>
    );
  }
}

let taigaUsProgress = {
  labels: ["Completed", "In Progress", "Not Done"],
  datasets: [{
    label: 'User Story Progress',
    data: [5, 4, 13],
    backgroundColor: [
        colors.blue.dark,
        colors.blue.base,
        colors.none
    ],
  }]
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