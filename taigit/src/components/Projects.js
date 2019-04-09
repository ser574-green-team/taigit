import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ProjectPanel from './ProjectPanel'
import * as keys from '../keys.json';
import { authRedirect, getAuthToken } from '../libraries/GitHub/GitHub';
import Select from 'react-select';
import colors from "../styles/colors";
import { connect } from "react-redux";
import { grabSprintStats } from "../actions/taigaActions";
import { getUsersRepos, addUserInfo } from "../actions/githubActions";
import { saveToLocalStorage, getFromLocalStorage } from "../utils/utils";
import { selectRepoList } from "../reducers";
import {
  faGithub
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { selectUserLogin } from '../reducers';

const redirect = authRedirect(keys.GH_CLIENT_ID);
let storedProjects = getFromLocalStorage('project-list') || {};
let auth = getFromLocalStorage('auth-key');

class Projects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taigaID: '',
      taigaPassword: '',
      gitHubRepo: '',
      taigaProject: ''
    }

    this.handleTaigaIDChange = this.handleTaigaIDChange.bind(this);
    this.handleTaigaPasswordChange = this.handleTaigaPasswordChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount() {
    if (this.props.repoList || this.props.repoList.length == 0) {
      this.props.getUsersRepos(this.state.githubID, auth);
    }
    this.props.addUserInfo(auth);
  }

  onSubmit = (e) => {
    e.preventDefault();
    saveToLocalStorage('taiga-id', this.state.taigaID);
    /*** 
     * call action which does the following:
     * - login to taiga (store user id in redux)
     * - get list of all projects (store in redux as well)
    */
    e.target.reset();
  }

  // Dropdown change listeners
  onGitHubSelectChange = (gitHubRepo) => {
    this.setState({ gitHubRepo });
  }
  onTaigaSelectChange = (taigaProject) => {
    this.setState({ taigaProject });
  }

  // Form change listeners
  handleTaigaIDChange(event) {
    this.setState({taigaID: event.target.value});
  }
  handleTaigaPasswordChange(event) {
    this.setState({taigaPassword: event.target.value});
  }

  showProject = (proj) => (
    storedProjects.map((proj) => (<ProjectPanel project={proj} />))
  )

  render() {
    return (
      <div className="app-page">
        <h2>Projects</h2>
        {/* Render already paired projects here */}
        <div className="project-picker">
        <h3>New Project</h3>
          <div className="project-selector-container">
            <h4 className="project-selector-title">Select A Repo</h4>
            <div className="selector project-selector">
              <Select options={this.props.repoList}
                placeholder="Select GitHub Repository"
                onChange={this.onGitHubSelectChange}
                value={this.state.githubRepo}
                theme={(theme) => ({
                    ...theme,
                    colors: {
                        ...theme.colors,
                        primary25: colors.yellow.light,
                        primary: colors.blue.light,
                    },
                })} 
              />
            </div>
          </div>
          <div className="project-selector-container">
            <h4 className="project-selector-title">Select A Project</h4>
            <div className="selector project-selector">
              <Select options={this.props.repoList}
                placeholder="Select Taiga Project"
                onChange={this.onTaigaSelectChange}
                value={this.state.taigaProject}
                theme={(theme) => ({
                    ...theme,
                    colors: {
                        ...theme.colors,
                        primary25: colors.yellow.light,
                        primary: colors.blue.light,
                    },
                })} 
              />
            </div>
          </div>
          <button type="button" className="project-button">Analyze Project</button>
        </div>
        <h3>Connect Accounts</h3>
        <div className="form">
          <form onSubmit={this.onSubmit} style={{ display: 'absolute' }}>
            <input type="text"
              name="taigaID"
              style={{ flex: '10', padding: '12px 20px', width: '20%', margin: '0 8px' }}
              placeholder="Your Taiga Username"
              value={this.state.taigaID}
              onChange={this.handleTaigaIDChange}
              id="text-form"
            />
            <input type="text"
              name="taigaPassword"
              style={{ flex: '10', padding: '12px 20px', width: '20%', margin: '0 8px' }}
              placeholder="Your Taiga Password"
              value={this.state.taigaPassword}
              onChange={this.handleTaigaPasswordChange}
              id="text-form"
            />
            <input type="submit"
              value="Connect Taiga Account"
              className="btn"
              style={{ flex: '1', margin: '8px 4px', border: 'none' }}
            />
          </form>
        </div>
        <br/>
        <a href={redirect}>
          <button type="button" className="gh-btn">
            <FontAwesomeIcon className="navFont small-icon" icon={faGithub} size="2x"/>
            Authenticate with GitHub
          </button>
        </a>
      </div>
    );
  }
}

/**
 * mapStateToProps
 * maps state in redux store (right)
 * to component props property (left)
 */
const mapStateToProps = state => ({
  repoList: selectRepoList(state),
  userLogin: selectUserLogin(state)
});

export default connect(mapStateToProps, { grabSprintStats, getUsersRepos, addUserInfo })(Projects)
