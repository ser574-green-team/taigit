import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';
import './styles/App.scss';
import Team from './components/Team';
import GitHub from './components/GitHub';
import Taiga from './components/Taiga';
import Overview from './components/Overview';
import NavBar from './components/SideNavBar';
import MemberProfile from './components/MemberProfile';
import Projects from './components/Projects';
import Callback from './components/Callback';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <NavBar/>
          <Switch>
            <Route path="/" component={Overview} exact/>
            <Route path="/github" component={GitHub}/>
            <Route path="/taiga" component={Taiga}/>
            <Route path="/team" component={Team} exact/>
            <Route path="/team/members/:memberId" component={MemberProfile} exact/>
            <Route path="/projects" component={Projects}/>
            <Route path="/callback?code=:tempCode" component={Callback} exact/>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
