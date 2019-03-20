import { GRAB_TAIGA_DATA, GET_SPRINT_STATS } from '../actions/taigaActions';
import colors from '../styles/colors';

const initialState = {
  taigaData: 'initialData',
  sprintList: ['Sprint 1', 'Sprint 2', 'Sprint 3'],
  sprintStats: {}
}

/**
 * Taiga Reducer
 * Gets called each time there's an action
 * If the action.type is one the taiga reducer cares about,
 * we update the current state with the payload of the action
 */
export default function taigaReducer(state = initialState, action) {
  switch(action.type) {
    case GRAB_TAIGA_DATA: 
      console.log('in reducer of grab taiga data');
      console.log('payload is: ', action.payload);
      console.log('returning state', { ...state, taigaData: action.payload });
      
      // Return new object of current state spread and new property (taigaData)
      return {
        ...state,
        taigaData: action.payload
      }
    case GET_SPRINT_STATS:
      console.log('got sprint stats');
      console.log('stats: ', action.payload);
      return {
        ...state,
        sprintStats: action.payload
      }
    default:
      return state;
  }
}

/**
 * Getting current sprint task progress
 * In chartjs pie chart format
 */
export const selectSprintProgressChartData = (state) => {
  const totalTasks = state.sprintStats.total_tsks;
  const totalCompletedTasks = state.sprintStats.completed_tsks;
  const totalInProgressTasks = totalTasks - totalCompletedTasks;
  return {
    labels: ["Completed", "In Progress"],
    datasets: [{
      label: 'Task Progress',
      data: [totalCompletedTasks, totalInProgressTasks],
      backgroundColor: [
          colors.blue.dark,
          colors.none
      ],
    }]
  }
}

export const selectUserTaskDistributionChartData = (state) => {
  return {
    labels: ['Rodney', 'Berta', 'Steve', 'Remy', 'Hugo'],
    datasets: [{
      label: 'Completed',
      backgroundColor: 'rgb(242, 105, 104, 1)',
      stack: 'Stack 0',
      data: [2, 3, 1, 5, 2]
    }, {
      label: 'In Progress',
      backgroundColor: 'rgb(242, 173, 159, 1)',
      stack: 'Stack 0',
      data: [4, 3, 2, 1, 5]
    }]
  }
}

export const selectSprintBurndownChartData = (state) => {
  return{
    labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
      datasets: [{
          fill: false,
          label: 'Ideal Burndown',
          color: 'rgba(255,0,0,0.25)',
          lineWidth: 2,
          data: [98, 91, 84, 77, 70, 63, 56, 49, 42, 35, 28, 21, 14, 7],
          backgroundColor: [colors.red.base],
          borderColor: [colors.red.base]
        },
        {
          fill: false,
          label: 'Actual Burndown',
          color: 'rgba(0,120,200,0.75)',
          marker: {
            radius: 6
          },
          data: [98, 110, 102, 85, 78, 69, 60, 49, 35, 40, 29, 20, 10, 0],
          backgroundColor: [colors.blue.base],
          borderColor: [colors.blue.base]
        }]
  }
}

/**
 * Getting list of sprints
 * Returns an array of sprint names wrapped in objects
 * that the sprint dropdown component will render
 */
export const selectSprintList = (state) => {
  return state.sprintList.map(sprintName => { 
    return {
      value: sprintName,
      label: sprintName
    }
  });
}
