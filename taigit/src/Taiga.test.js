import React, { Component } from 'react';

import {taiga_login, project_info, project_stats, sprint_stats}  from './libraries/Taiga'

export default class TaigaTest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            projectData: {'projectId':'', 'projectName': '', 'projectCreated': ''},
            projStatuses: {}
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
        project_info('halcyonaura-quiz-creator').then(val => {
            console.log(val)
            let data = {'projectId': val.id, 'projectName': val.name, 'projectCreated': val.created_date}
            this.setState({projectData: data});
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
                {console.log(this.state.projectData)}
                <p>Project ID: {this.state.projectData.projectId}</p>
                <p>Project Name: {this.state.projectData.projectName}</p>
                <p>Project Created: {this.state.projectData.projectCreated}</p>
            </div>
                
            {/*<div>
                <p>These are the results from the project_info call.</p>
                <p>{project_stats()}</p>
            </div>
            <div>
                <p>These are the results from the project_info call.</p>
            <p>{sprint_stats()}</p>
            </div>*/}
        </div>
        );
    }
}