import { 
  GRAB_TAIGA_DATA, 
  GET_SPRINT_STATS,
  ADD_PROJECT_INFO,
  ADD_SPRINTS_LIST
 } from '../actions/taigaActions';
import colors from '../styles/colors';

const initialState = {
  projectInfo: {},
  sprintsInfo: [],
  taigaData: 'initialData',
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
    case ADD_PROJECT_INFO: 
      return {
        ...state,
        projectInfo: action.payload
      }
    case ADD_SPRINTS_LIST:
      return {
        ...state,
        sprintsInfo: action.payload
      }
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

/**
 * Getting list of sprints
 * Returns an array of sprint names wrapped in objects
 * that the sprint dropdown component will render
 */
export const selectSprintList = (state) => {
  // return state.sprintsInfo.map(sprint => sprint.name);
  return ['Sprint 1', 'Sprint 2', 'Sprint 3'];
}