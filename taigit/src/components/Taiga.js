import React, { Component } from 'react';

import {taiga_login, taiga_sprint} from '../libraries/Taiga'

export default class Taiga extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      //slug:'',//type of Taiga
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

    /*
    //testing taiga_sprint function
    on_us(event) {
        taiga_sprint(this.state.username).then((ret)=>{
            if(ret) alert("taiga us: successful");
            else    alert("taiga us: unsuccessful");
        });
        event.preventDefault();
    }
   */

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
            /*
            <form onUs={this.on_us}>
                <label>
                    Slug:
                    <input
                        type="text"
                        name="slug"
                        value={this.state.slug}
                        onChange={this.on_change} />
                </label><br/>
                <input type="submit" value="Submit" />
                */
            </form>
        </div>


    );
  }
}