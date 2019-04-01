import React, { Component } from 'react'
import { connect } from 'react-redux'
import TeamMemberCard from './TeamMemberCard'
import NumberDisplay from './NumberDisplay'
import { WidthProvider, Responsive } from "react-grid-layout";
import { Radar } from 'react-chartjs-2';
import { saveLayoutToLocalStorage, getLayoutFromLocalStorage } from '../utils/utils';

const ResponsiveReactGridLayout = WidthProvider(Responsive);
const layoutname = 'member-layout';
let originalLayouts = getLayoutFromLocalStorage(layoutname, 'layouts') || {};

class MemberProfile extends Component {
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
    saveLayoutToLocalStorage(layoutname, 'layouts', layouts);
    this.setState({ layouts: layouts });
  }

  componentWillMount() {
    originalLayouts = getLayoutFromLocalStorage(layoutname, 'layouts') || [];
    this.setState({ layouts: JSON.parse(JSON.stringify(originalLayouts)) });
  }

  render() {
    let member = this.props.teamMembers.filter(member => member.githubId == this.props.match.params.memberId)[0];
    return(
      <div className="app-page">
        <h2>TeamMemberId: {this.props.match.params.memberId}</h2>
        <ResponsiveReactGridLayout
          className="layout"
          cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
          rowHeight={30}
          layouts={this.state.layouts}
          onLayoutChange={(layout, layouts) =>
            this.onLayoutChange(layout, layouts)
          }
        >          
          <div className='box' key="1" data-grid={{ w: 3, h: 9, x: 0, y: 0, minW: 0, minH: 0 }}>
            <div className="chart">
              <TeamMemberCard taigaId={member.taigaId} githubId={member.githubId} name={member.name} pictureUrl={member.pictureUrl}/>
            </div>
          </div>
          <div className='box' key="2" data-grid={{ w: 4, h: 7, x: 3, y: 0, minW: 0, minH: 0 }}>
            <div className="chart">
              <Radar data={radarChartData}/>
            </div>
          </div>
          <div className='box' key="3" data-grid={{ w: 2, h: 5, x: 3, y: 0, minW: 0, minH: 0 }}>
            <NumberDisplay number={member.totalCommits} statistic="Total Commits"/>
          </div>
          <div className='box' key="4" data-grid={{ w: 2, h: 5, x: 7, y: 0, minW: 0, minH: 0 }}>
            <NumberDisplay number="52" statistic="PRs Reviewed"/>
          </div>
          <div className='box' key="5" data-grid={{ w: 2, h: 5, x: 9, y: 0, minW: 0, minH: 0 }}>
            <NumberDisplay number="23" statistic="Tasks Completed"/>
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
const mapStateToProps = state => {
  return {
    teamMembers: state.team.teamMembers
  }
}

const radarChartData = {
  labels: ["Commits", "Tasks Completed", "PRs Reviewed", "Taiga Edits", "Issues Documented"],
  datasets: [{
    label: 'Work Distribution',
    data: [12, 19, 15, 10, 2],
    backgroundColor: 'rgba(255, 99, 132, 0.2)',
    borderColor: 'rgba(255,99,132,1)',
    borderWidth: 1,
  }]
}

export default connect(mapStateToProps)(MemberProfile)