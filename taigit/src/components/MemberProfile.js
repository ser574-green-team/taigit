import React, { Component } from 'react'
import TeamMemberCard from './TeamMemberCard'

export default class MemberProfile extends Component {
  render() {
    return(
      <div className="app-page">
        <h2>TeamMemberId: {this.props.match.params.memberId}</h2>
        <div className="team-members">
          <TeamMemberCard taigaId='broutzong' githubId='broutzong' name='Bailey Routzong' pictureUrl='https://baileyroutzong.com/wp-content/uploads/2015/03/circle-man.png'/>
        </div>
      </div>
    );
  }
}