import React, { Component } from 'react'
import TeamMemberCard from './TeamMemberCard'
import {Link} from 'react-router-dom';

export default class Team extends Component {
  render() {
    return(
      <div className="app-page">
        <h2>TeamName</h2>
          <div className="team-members">
          <Link to="/team/members/broutzong" replace={true}>
            <TeamMemberCard taigaId='broutzong' githubId='broutzong' name='Bailey Routzong' pictureUrl='https://baileyroutzong.com/wp-content/uploads/2015/03/circle-man.png'/>
          </Link>
          <TeamMemberCard taigaId='akoffee' githubId='akoffee' name='Amy Koffee' pictureUrl='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBhi8xXNgLziI1Orp9x_10TGtmQSnZlCOseWC_0uUh5ZMhE5QM'/>
          <TeamMemberCard taigaId='msmith' githubId='msmith' name='Miguel Smith' pictureUrl='https://broadstreetautoloans.com/Content/images/circle-person02.png'/>
          <TeamMemberCard taigaId='wickedfan' githubId='wicked4eva' name='Mr Wicked' pictureUrl='http://www.onecenter.in/wp-content/uploads/2018/07/face.png'/>
          </div>
      </div>
    );
  }
}