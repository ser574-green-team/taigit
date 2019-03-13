import React, { Component } from 'react'
import { connect } from 'react-redux'
import RadialChart from './charts/RadialChart'
import TeamMemberCard from './TeamMemberCard'
import NumberDisplay from './NumberDisplay'
import GridLayout from 'react-grid-layout';

class MemberProfile extends Component {
  render() {
    let member = this.props.teamMembers.filter(member => member.githubId == this.props.match.params.memberId)[0];
    return(
      <div className="app-page">
        <h2>TeamMemberId: {this.props.match.params.memberId}</h2>
        <GridLayout className="layout" cols={12} rowHeight={30} width={1200}>
          <div className='box' key="1" data-grid={{ w: 3, h: 9, x: 0, y: 0, minW: 2, minH: 3 }}>
            <div className="chart">
              <TeamMemberCard taigaId={member.taigaId} githubId={member.githubId} name={member.name} pictureUrl={member.pictureUrl}/>
            </div>
          </div>
          <div className='box' key="2" data-grid={{ w: 4, h: 7, x: 3, y: 0, minW: 2, minH: 3 }}>
            <div className="chart">
              <RadialChart/>
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
const mapStateToProps = state => {
  return {
    teamMembers: state.team.teamMembers
  }
}

export default connect(mapStateToProps)(MemberProfile)