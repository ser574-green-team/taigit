import React, { Component } from 'react'
import RadialChart from './charts/RadialChart'
import TeamMemberCard from './TeamMemberCard'
import NumberDisplay from './NumberDisplay'

export default class MemberProfile extends Component {
  render() {
    return(
      <div className="app-page">
        <h2>TeamMemberId: {this.props.match.params.memberId}</h2>
        <div>
          <TeamMemberCard taigaId='broutzong' githubId='broutzong' name='Bailey Routzong' pictureUrl='https://baileyroutzong.com/wp-content/uploads/2015/03/circle-man.png'/>
        </div>
        <div className="team-member-stats">
          <div className="team-member-radar-chart">
            <RadialChart/>
          </div>
          <NumberDisplay number="45" statistic="Total Commits"/>
          <NumberDisplay number="52" statistic="PRs Reviewed"/>
          <NumberDisplay number="23" statistic="Tasks Completed"/>
        </div>
      </div>
    );
  }
}