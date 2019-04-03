import React, { Component } from 'react';
import moment from 'moment';
import ReactGantt, { GanttRow } from 'react-gantt';
import colors from '../../styles/colors';

export class TaigaTaskChart extends Component {
  render() {
    return (
      <div className="chart">
      <ReactGantt
        dateFormat='MM/DD'
        weekFormat='MM/DD'
        templates={{
          myTasks: {
            title: 'My Tasks',
            steps: [
              {
                name: 'Exists',
                color: colors.yellow.light
              },
              {
                name: 'In Progress',
                color: colors.orange.light
              },
              {
                name: 'Ready for Testing',
                color: colors.blue.base
              },
              {
                name: 'Completed',
                color: colors.blue.dark
              }
            ]
          }
        }}
        leftBound={new Date(2019, 5, 30, 0, 0, 0, 0)}
        rightBound={new Date(2019, 6, 15, 0, 0, 0, 0)}
      >
        <GanttRow
          title="User Story 1"
          templateName="myTasks"
          barStyle={{'height': '1.5em', 'font-weight': 'bold'}}
          steps={[
            new Date(2019, 5, 30, 0, 0, 0, 0),
            new Date(2019, 5, 30, 0, 0, 0, 0),
            new Date(2019, 5, 30, 0, 0, 0, 0),
            new Date(2019, 5, 30, 0, 0, 0, 0),
            new Date(2019, 5, 30, 0, 0, 0, 0)
          ]}
        />
        <GanttRow
          title="Task #227"
          templateName="myTasks"
          barStyle={{'height': '1.5em'}}
          markerStyle={{'width': '1em'}}
          popupStyle={{'color': colors.purple.base, 'background': 'white', 'padding': '1.5em'}}
          steps={[
            new Date(2019, 5, 30, 0, 0, 0, 0),
            new Date(2019, 6, 1, 0, 0, 0, 0),
            new Date(2019, 6, 4, 0, 0, 0, 0),
            new Date(2019, 6, 5, 0, 0, 0, 0),
            new Date(2019, 6, 6, 0, 0, 0, 0)
          ]}
        />
        <GanttRow
          title="Task 2"
          templateName="myTasks"
          barStyle={{'height': '1.5em'}}
          markerStyle={{'width': '1em'}}
          popupStyle={{'color': colors.purple.base, 'background': 'white', 'padding': '1.5em'}}
          steps={[
            new Date(2019, 6, 1, 0, 0, 0, 0),
            new Date(2019, 6, 2, 0, 0, 0, 0),
            new Date(2019, 6, 4, 0, 0, 0, 0),
            new Date(2019, 6, 5, 0, 0, 0, 0),
            new Date(2019, 6, 6, 0, 0, 0, 0)
          ]}
        />
        <GanttRow
          title="Task 1"
          templateName="myTasks"
          barStyle={{'height': '1.5em'}}
          markerStyle={{'width': '1em'}}
          popupStyle={{'color': colors.purple.base, 'background': 'white', 'padding': '1.5em'}}
          steps={[
            new Date(2019, 6, 1, 0, 0, 0, 0),
            new Date(2019, 6, 2, 0, 0, 0, 0),
            new Date(2019, 6, 4, 0, 0, 0, 0),
            new Date(2019, 6, 5, 0, 0, 0, 0),
            new Date(2019, 6, 6, 0, 0, 0, 0)
          ]}
        />
        
      </ReactGantt>
      </div>
    );
  }
}