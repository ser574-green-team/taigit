import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { getFromLocalStorage } from "../utils/utils";

/**
 * This component should only take in data from props
 * It should also have an action
 */
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