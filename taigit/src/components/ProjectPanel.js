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
                    <Link to={this.props.memberUrl[0]}>
                        <p>{this.props.member[0]}</p>
                    </Link>
                    <Link to={this.props.memberUrl[1]}>
                        <p>{this.props.member[1]}</p>
                    </Link>
                    <Link to={this.props.memberUrl[2]}>
                        <p>{this.props.member[2]}</p>
                    </Link>
                    <Link to={this.props.memberUrl[3]}>
                        <p>{this.props.member[3]}</p>
                    </Link>
                </div>
            </div>
        );
    }
}