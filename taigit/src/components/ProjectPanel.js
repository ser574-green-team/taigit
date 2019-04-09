import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { getFromLocalStorage } from "../utils/utils";

let projectList = getFromLocalStorage('project-list');
//button onClick={this.props.delTodo.bind(this, id)}
export default class ProjectPanel extends Component {
    render() {
        return(
            <div className="project">
                { this.props.project }

                <button>Analyze</button>

                <button>x</button>
            </div>
        );
    }
}