import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import ProjectPanel from './ProjectPanel'

export default class Projects extends Component {
    render() {
        return(
            <div className="app-page">
                <h2>Projects</h2>
                <ProjectPanel projUrl="/"
                              projName="Team Broccoli"
                              memberUrl="/team/members/broutzong"
                              member="Bailey Routzong" //, "Amy Koffee", "Miguel Smith", "Mr Wicked"
                />
                <div className="form">
                    <form style={{display: 'absolute'}}>
                        <input type="text"
                               name="repo-name"
                               style={{flex: '10', padding: '5px', width: '200px', right: '5px'}}
                               placeholder="GitHub repository name"
                        />
                        <input type="text"
                               name="repo-owner"
                               style={{flex: '10', padding: '5px', width: '200px', right: '5px'}}
                               placeholder="GitHub repository owner"
                        />
                        <input type="text"
                               name="taiga"
                               style={{flex: '10', padding: '5px', width: '200px', right: '5px'}}
                               placeholder="Taiga project ID"
                        />
                        <input type="submit"
                               value="Add Project"
                               className="btn"
                               style={{flex: '1'}}
                        />
                    </form>
                </div>
            </div>
        );
    }
}