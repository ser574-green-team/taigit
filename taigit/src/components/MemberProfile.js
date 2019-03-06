import React, { Component } from 'react'
import { connect } from 'react-redux'
import RadialChart from './charts/RadialChart'
import TeamMemberCard from './TeamMemberCard'
import NumberDisplay from './NumberDisplay'

class MemberProfile extends Component {
  render() {
    let member = this.props.teamMembers.filter(member => member.githubId == this.props.match.params.memberId)[0];
    return(
      <div className="app-page">
        <h2>TeamMemberId: {this.props.match.params.memberId}</h2>
        <div>
          <TeamMemberCard taigaId={member.taigaId} githubId={member.githubId} name={member.name} pictureUrl={member.pictureUrl}/>
        </div>
        <div className="team-member-stats">
          <div className="team-member-radar-chart">
            <RadialChart/>
          </div>
          <NumberDisplay number={member.totalCommits} statistic="Total Commits"/>
          <NumberDisplay number="52" statistic="PRs Reviewed"/>
          <NumberDisplay number="23" statistic="Tasks Completed"/>
        </div>
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