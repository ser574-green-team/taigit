import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ProjectPanel from './ProjectPanel'
import * as keys from '../keys.json';
import { authRedirect, getAuthToken } from '../libraries/GitHub/GitHub';
import Select from 'react-select';
import colors from "../styles/colors";
import { connect } from "react-redux";
import {
    grabSprintStats,
    grabTaigaUserId,
    grabUserProjects,
    initializeUserData,
    setTaigaProjectID,
    loadAllTaigaProjectData,
} from "../actions/taigaActions";
import { getUsersRepos, addUserInfo } from "../actions/githubActions";
import { saveToLocalStorage, getFromLocalStorage } from "../utils/utils";
import {
    selectRepoList,
    selectTaigaUserID,
    selectProjectList
} from "../reducers";
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
      taigaProject: '',
      taigaNumID: '',
      codacyID: ''
    }

    this.onProjectAnalyze = this.onProjectAnalyze.bind(this);
    this.handleTaigaIDChange = this.handleTaigaIDChange.bind(this);
    this.handleTaigaPasswordChange = this.handleTaigaPasswordChange.bind(this);
    this.onTaigaSubmit = this.onTaigaSubmit.bind(this);
    this.onCodacySubmit = this.onCodacySubmit.bind(this);
    this.handleCodacyChange = this.handleCodacyChange.bind(this);
  }

  componentWillMount() {
    // Only reload data if none exists
    if (typeof this.props.repoList === 'undefined' || this.props.repoList.length == 0) {
      this.props.getUsersRepos(this.props.userLogin, auth);
    }
    if (typeof this.props.projectList === 'undefined' || this.props.projectList.length == 0) {
      this.props.grabUserProjects(getFromLocalStorage('taiga-user-id'));
    }
  }

  onProjectAnalyze = (event) => {
      console.log('analyzing project!');
      event.preventDefault();

      // Load all Taiga Data
      this.props.loadAllTaigaProjectData(this.state.taigaProject.value);

      //save project set to be displayed in project panel
      //redirect to overview page
  }

  onTaigaSubmit = (e) => {
    e.preventDefault();
    saveToLocalStorage('taiga-username', this.state.taigaID);
    this.props.initializeUserData(this.state.taigaID, this.state.taigaPassword);
    e.target.reset();
  }

    onCodacySubmit = (e) => {
        e.preventDefault();

        e.target.reset();
    }

  // Dropdown change listeners
  onGitHubSelectChange = (gitHubRepo) => {
    this.setState({ gitHubRepo });
    saveToLocalStorage('github-owner', gitHubRepo.value);
    saveToLocalStorage('github-repo', gitHubRepo.label);
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

  handleCodacyChange(event) {
    this.setState({codacyID: event.target.value});
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
              <Select options={this.props.projectList}
                placeholder="Select Taiga Project"
                onChange={this.onTaigaSelectChange}
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
          <form onSubmit={this.onProjectAnalyze} style={{display: 'inline'}}>
            <input type="submit" className="btn" value="Analyze Project"/>
          </form>
        </div>
        <h3>Connect Accounts</h3>
        <div className="form">
          <form onSubmit={this.onTaigaSubmit} style={{ display: 'absolute' }}>
            <input type="text"
              name="taigaID"
              style={{ flex: '10', padding: '12px 20px', width: '20%', margin: '0 8px' }}
              placeholder="Your Taiga Username"
              value={this.state.taigaID}
              onChange={this.handleTaigaIDChange}
              id="text-form"
            />
            <input type="password"
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
          <div className="form">
              <form onSubmit={this.onCodacySubmit} style={{ display: 'absolute' }}>
                  <input type="text"
                         name="codacyID"
                         style={{ flex: '10', padding: '12px 20px', width: '20%', margin: '0 8px' }}
                         placeholder="Your Codacy Username"
                         value={this.state.codacyID}
                         onChange={this.handleCodacyChange}
                         id="text-form"
                  />
                  <input type="submit"
                         value="Connect Codacy Account"
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
  userLogin: selectUserLogin(state),
  taigaUserID: selectTaigaUserID(state),
  projectList: selectProjectList(state)
});

export default connect(mapStateToProps, {
    grabSprintStats,
    getUsersRepos,
    addUserInfo,
    grabTaigaUserId,
    grabUserProjects,
    initializeUserData,
    setTaigaProjectID,
    loadAllTaigaProjectData
})(Projects)