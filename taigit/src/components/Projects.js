import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import ProjectPanel from './ProjectPanel'
import * as keys from '../keys.json';
import { authRedirect, getAuthToken } from '../libraries/GitHub/GitHub';
import Select from 'react-select';
import colors from "../styles/colors";
import {connect} from "react-redux";
import { grabSprintStats } from "../actions/taigaActions";
import { saveToLocalStorage, getFromLocalStorage } from "../utils/utils";
//import { selectRepoList } from '../reducers';

const redirect = authRedirect(keys.GH_CLIENT_ID);
let storedProjects = getFromLocalStorage('project-list') || [];
saveToLocalStorage();

class Projects extends Component {
    state = {
        githubID: '',
        taigaID: '',
    }

    onSubmit = (e) => {
        e.preventDefault();
        saveToLocalStorage('github-id', this.state.githubID);
        saveToLocalStorage('taiga-id', this.state.taigaID);
        var str = this.state.githubID + ' || ' + this.state.taigaID;
        console.log(storedProjects);
        storedProjects.push(str);
        saveToLocalStorage('project-list', storedProjects);
        this.showProject(str);
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
        console.log(e.target.name);
    }

    showProject = (proj) => (
        storedProjects.map((proj) => (<ProjectPanel project = {proj}/>))
    )

    componentWillMount() {
        //this.props.grabRepoList();
    }

    render() {
        return(
            <div className="app-page">
                <h2>Projects</h2>
                <h2>New Project</h2>
                <div className="selector">
                    <Select options={this.props.sprintList}
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
                               onChange={this.onChange}
                        />
                        <input type="text"
                               name="taigaID"
                               style={{flex: '10', padding: '12px 20px', width: '20%', margin: '0 8px'}}
                               placeholder="Your Taiga ID"
                               value={this.state.title}
                               onChange={this.onChange}
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
    //repos: selectRepoList(state),
});

export default connect(mapStateToProps, { grabSprintStats })(Projects)
