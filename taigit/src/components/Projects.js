import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import ProjectPanel from './ProjectPanel'
import * as keys from '../keys.json';
import { authRedirect, getAuthToken } from '../libraries/GitHub/GitHub';

const redirect = authRedirect(keys.GH_CLIENT_ID);

export default class Projects extends Component {
    render() {
        return(
            <div className="app-page">
                <h2>Projects</h2>
                <ProjectPanel projUrl="/"
                              projName="Team Broccoli"
                              memberUrl={["/team/members/broutzong","","",""]}
                              member={["Bailey Routzong", "Amy Koffee","Miguel Smith","Mr Wicked"]}
                />
                <br/>
                <h2>New Project</h2>
                <div className="form">
                    <form style={{display: 'absolute'}}>
                        <input type="text"
                               name="repo-name"
                               style={{flex: '10', padding: '12px 20px', width: '20%', margin: '0 8px'}}
                               placeholder="GitHub repository name"
                        />
                        <input type="text"
                               name="repo-owner"
                               style={{flex: '10', padding: '12px 20px', width: '20%', margin: '0 8px'}}
                               placeholder="GitHub repository owner"
                        />
                        <input type="text"
                               name="taiga"
                               style={{flex: '10', padding: '12px 20px', width: '20%', margin: '0 8px'}}
                               placeholder="Taiga project ID"
                        />
                        <input type="submit"
                               value="Add Project"
                               className="btn"
                               style={{flex: '1', margin: '8px 4px', border: 'none'}}
                        />
                    </form>
                </div>
                <br/><br/>
                <a href={redirect}>
                    <button type="button" className="gh-btn">Sign in to GitHub</button>
                </a>
            </div>
        );
    }
}