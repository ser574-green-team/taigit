import React, { Component } from 'react'
import { connect } from 'react-redux'
import TeamMemberCard from './TeamMemberCard'
import {Link} from 'react-router-dom';
import { faConnectdevelop } from '@fortawesome/free-brands-svg-icons';

class Team extends Component {
  render() {
    return(
      <div className="app-page">
        <h2>TeamName</h2>
          <div className="team-members">
          {this.props.teamMembers.map((memberObj) => {
            return <Link to={`/team/members/${memberObj.githubId}`} replace={true}>
                    <TeamMemberCard taigaId={memberObj.taigaId} githubId={memberObj.githubId} name={memberObj.name} pictureUrl={memberObj.pictureUrl}/>
                  </Link>
          })}
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

export default connect(mapStateToProps)(Team)