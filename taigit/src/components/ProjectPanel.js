import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class ProjectPanel extends Component {
    render() {
        return(
            <div className="project">
                <Link to={this.props.projUrl}>
                    <p>{this.props.projName}</p>
                </Link>
                <div className="team-member-info">
                    <Link to={this.props.memberUrl}>
                        <p>{this.props.member}</p>
                    </Link>
                </div>
            </div>
        );
    }
}