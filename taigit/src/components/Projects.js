import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import ProjectPanel from './ProjectPanel'
import * as keys from '../keys.json';
import { authRedirect, getAuthToken } from '../libraries/GitHub/GitHub';
import Select from 'react-select';
import colors from "../styles/colors";
import {connect} from "react-redux";
import { grabSprintStats } from "../actions/taigaActions";
import { getUsersRepos } from "../actions/githubActions";
import { saveToLocalStorage, getFromLocalStorage } from "../utils/utils";
import { selectRepoList } from "../reducers";
import GitHub from "./GitHub";

const redirect = authRedirect(keys.GH_CLIENT_ID);
let storedProjects = getFromLocalStorage('project-list') || {};
let auth = getFromLocalStorage('auth-key');

class Projects extends Component {
    state = {
        githubID: '',
        taigaID: '',
        githubOwner: '',
        githubRepo: ''
    };

    onSubmit = (e) => {
        e.preventDefault();
        saveToLocalStorage('github-id', this.state.githubID);
        saveToLocalStorage('taiga-id', this.state.taigaID);
        this.props.getUsersRepos(this.state.githubID, auth);
        e.target.reset();
    }

    onTextChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSelectChange = (e) => {
        this.setState({ githubOwner: e.target.value });
        //this.setState({ githubRepo: e.target.label });
    }

    showProject = (proj) => (
        storedProjects.map((proj) => (<ProjectPanel project = {proj}/>))
    )

    componentWillMount() {
        this.props.getUsersRepos(this.state.githubID, auth);
    }

    render() {
        return(
            <div className="app-page">
                <h2>Projects</h2>
                <h2>New Project</h2>
                <div className="selector">
                    <Select options={this.props.repoList}
                            placeholder="Select GitHub Repository"
                            onChange={this.onSelectChange}
                            value={this.state.value}
                            theme={(theme) => ({
                                ...theme,
                                colors: {
                                    ...theme.colors,
                                    primary25: colors.yellow.light,
                                    primary: colors.blue.light,
                                },
                            })} />
                </div>
                <div className = "selector">
                    <Select options={this.props.repoList}
                            placeholder="Select Taiga Project"
                            theme={(theme) => ({
                                ...theme,
                                colors: {
                                    ...theme.colors,
                                    primary25: colors.yellow.light,
                                    primary: colors.blue.light,
                                },
                            })} />
                </div>
                <div className="form">
                    <form onSubmit={this.onSubmit} style={{display: 'absolute'}}>
                        <input type="text"
                               name="githubID"
                               style={{flex: '10', padding: '12px 20px', width: '20%', margin: '0 8px'}}
                               placeholder="Your GitHub ID"
                               value={this.state.title}
                               onChange={this.onTextChange}
                               id="text-form"
                        />
                        <input type="text"
                               name="taigaID"
                               style={{flex: '10', padding: '12px 20px', width: '20%', margin: '0 8px'}}
                               placeholder="Your Taiga ID"
                               value={this.state.title}
                               onChange={this.onTextChange}
                               id="text-form"
                        />
                        <input type="submit"
                               value="Register Accounts"
                               className="btn"
                               style={{flex: '1', margin: '8px 4px', border: 'none'}}
                        />
                    </form>
                </div>
                <br/>
                <a href={redirect}>
                    <button type="button" className="gh-btn">Authenticate with GitHub</button>
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
    repoList: selectRepoList(state)
});

export default connect(mapStateToProps, { grabSprintStats, getUsersRepos })(Projects)