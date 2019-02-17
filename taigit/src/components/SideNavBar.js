import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import {
  faGithub
} from '@fortawesome/free-brands-svg-icons';
import {
  faUser,
  faUsers,
  faChartPie,
  faCertificate
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class SideNavBar extends Component {
  render() {
    return(
      <div className="navbar">
        <Link to="/">
          <div className='navButton'>
            <FontAwesomeIcon className="navFont" icon={faChartPie} size="2x"/>
          </div>
        </Link>
        <Link to="/gitHub">
          <div className='navButton'>
            <FontAwesomeIcon className="navFont" icon={faGithub} size="2x"/>
          </div>
        </Link>
        <Link to="/taiga">
        <div className='navButton'>
            <FontAwesomeIcon className="navFont" icon={faCertificate} size="2x"/>
          </div>
        </Link>
        <Link to="/team">
          <div className='navButton'>
            <FontAwesomeIcon className="navFont" icon={faUsers} size="2x"/>
          </div>
        </Link>
      </div>
    );
  }
}