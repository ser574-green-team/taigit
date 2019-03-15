import React, { Component } from 'react'
import { connect } from 'react-redux'
import TeamMemberCard from './TeamMemberCard'
import NumberDisplay from './NumberDisplay'
import ReactGridLayout from 'react-grid-layout';
import { Radar } from 'react-chartjs-2';
import { saveToLocalStorage, getFromLocalStorage } from '../utils/utils';

const layoutname = 'member-layout';
const originalLayout = getFromLocalStorage(layoutname, 'layout') || [];

class MemberProfile extends Component {
  static defaultProps = {
    className: "layout",
    cols: 12,
    rowHeight: 10,
    width: 1200,
    onLayoutChange: function() {}
  };

  constructor(props) {
    super(props);

    this.state = {
      layout: JSON.parse(JSON.stringify(originalLayout))
    };

    this.onLayoutChange = this.onLayoutChange.bind(this);
  }

  onLayoutChange(layout) {
    console.log('about to save to local storage');
    saveToLocalStorage(layoutname, "layout", layout);
    this.setState({layout});
    console.log('new layout', layout);
    this.props.onLayoutChange(layout);
  }

  render() {
    let member = this.props.teamMembers.filter(member => member.githubId == this.props.match.params.memberId)[0];
    return(
      <div className="app-page">
        <h2>TeamMemberId: {this.props.match.params.memberId}</h2>
        <ReactGridLayout layout={this.state.layout} onLayoutChange={this.onLayoutChange} cols={12} rowHeight={30} width={1200}>
          <div className='box' key="1" data-grid={{ w: 3, h: 9, x: 0, y: 0, minW: 2, minH: 3 }}>
            <div className="chart">
              <TeamMemberCard taigaId={member.taigaId} githubId={member.githubId} name={member.name} pictureUrl={member.pictureUrl}/>
            </div>
          </div>
          <div className='box' key="2" data-grid={{ w: 4, h: 7, x: 3, y: 0, minW: 2, minH: 3 }}>
            <div className="chart">
              <Radar data={radarChartData}/>
            </div>
          </div>
          <div className='box' key="3" data-grid={{ w: 2, h: 5, x: 3, y: 0, minW: 2, minH: 5 }}>
            <NumberDisplay number={member.totalCommits} statistic="Total Commits"/>
          </div>
          <div className='box' key="4" data-grid={{ w: 2, h: 5, x: 7, y: 0, minW: 2, minH: 5 }}>
            <NumberDisplay number="52" statistic="PRs Reviewed"/>
          </div>
          <div className='box' key="5" data-grid={{ w: 2, h: 5, x: 9, y: 0, minW: 2, minH: 3 }}>
            <NumberDisplay number="23" statistic="Tasks Completed"/>
          </div>
        </ReactGridLayout>
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