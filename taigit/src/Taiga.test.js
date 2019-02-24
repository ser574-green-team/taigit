import React, { Component } from 'react';

import {taiga_login, project_info, project_stats, sprint_stats, userstory_statuses, task_statuses}  from './libraries/Taiga'

export default class TaigaTest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            projectData: {'projectId':'', 'projectName': '', 'projectCreated': ''},
            projStats: {'sprints': [{'name': ''}], 'assignedpts': '', 'closedpts': ''},
            sprintStats: {},
            usStatuses: {},
            taskStatuses: {}
        };

        this.on_change = this.on_change.bind(this);
        this.on_submit = this.on_submit.bind(this);
    }

    on_change(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    on_submit(event) {
        taiga_login(this.state.username, this.state.password).then((ret)=>{
            if(ret) alert("taiga login: successful");
            else    alert("taiga login: unsuccessful");
        });
        event.preventDefault();
    }

    componentDidMount() {
        project_info('sanaydevi-ser-574').then(val => {
            let data = {'projectId': val.id, 'projectName': val.name, 'projectCreated': val.created_date};
            this.setState({projectData: data});
        });

        project_stats(306316).then(val => {
            let data = {'sprints': val.milestones, 'assignedpts': val.assigned_points, 
                'closedpts': val.closed_points};
                console.log('st', val)
            this.setState({projStats: data});
        });

        sprint_stats(220781).then(val => {
            let data = {};
            console.log('spr', val)
            this.setState({sprintStats: data});
        });

        // A discussion that needs to be had...
        userstory_statuses(1124228).then(val => {
            let data = {};
            console.log('us', val)

            this.setState({usStatuses: data});
        });

        task_statuses(1550500).then(val => {
            let data = {};
            console.log('task', val)

            this.setState({taskStatuses: data});
        });
    }

    render() {
    return(
        <div className="app-page">
            <h2>Taiga</h2>

            <form onSubmit={this.on_submit}>
                <label>
                    Username:
                    <input
                        type="text"
                        name="username"
                        value={this.state.username}
                        onChange={this.on_change} />
                </label><br/>

                <label>
                    Password:
                    <input
                        type="password"
                        name="password"
                        value={this.state.password}
                         onChange={this.on_change} />
                </label><br/>

                <input type="submit" value="Submit" />
            </form>

            <div>
                <p>These are the results from the project_info call.</p>
                <p>Project ID: {this.state.projectData.projectId}</p>
                <p>Project Name: {this.state.projectData.projectName}</p>
                <p>Project Created: {this.state.projectData.projectCreated}</p>
            </div>
                
            <div>
                <p>These are the results from the project_stats call.</p>
                <p>Sprint Names</p>
                {this.state.projStats.sprints.map(s => {
                return <p>{s.name}</p>})}
                <p>Assigned Points {this.state.projStats.assignedpts}</p>
                <p>Closed Points {this.state.projStats.closedpts}</p>
            </div>
            <div>
                <p>These are the results from the sprint_stats call.</p>
            <p>{}</p>
            </div>

            <div>
                <p>These are the results from the userstory_statuses call.</p>
                <p>{}</p>
            </div>
            <div>
                <p>These are the results from the task_statuses call.</p>
            <p>{}</p>
            </div>
        </div>
        );
    }
}