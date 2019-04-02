import React, { Component } from 'react'
import { connect } from 'react-redux'
import TeamMemberCard from './TeamMemberCard'
import { Link } from 'react-router-dom';
import { faConnectdevelop } from '@fortawesome/free-brands-svg-icons';
import { getFromLocalStorage } from "../utils/utils";
import {
  getContributorData
} from '../actions/githubActions';
import { selectBasicContributorData } from '../reducers';

class Team extends Component {
  componentWillMount() {
    let auth = getFromLocalStorage('auth-key');
    console.log('auth key is', auth);
    if (this.props.teamMembers.length == 0) {
      this.props.getContributorData('ser574-green-team', 'taigit', auth);
    }
  }

  render() {
    return(
      <div className="app-page">
        <h2>TeamName</h2>
          <div className="team-members">
          {this.props.teamMembers.map((memberObj) => {
            return <div className="team-member-page-card"> 
                    <Link to={`/team/members/${memberObj.login}`}>
                      <TeamMemberCard taigaId={memberObj.taigaId} githubId={memberObj.login} name={memberObj.login} pictureUrl={memberObj.avatar_url}/>
                    </Link>
                  </div>
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
    teamMembers: selectBasicContributorData(state)
  }
}

export default connect(mapStateToProps, { getContributorData })(Team)