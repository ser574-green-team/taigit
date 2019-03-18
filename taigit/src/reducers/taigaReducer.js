import { GRAB_TAIGA_DATA } from '../actions/taigaActions';
import colors from '../styles/colors';

const initialState = {
  taigaData: 'helller',
  sprintProgress: [5, 4, 13]
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
    default:
      return state;
  }
}

/**
 * Getting current sprint task progress
 * In chartjs pie chart format
 */
export const selectSprintProgressChartData = (state) => {
  return {
    labels: ["Completed", "In Progress", "Not Done"],
    datasets: [{
      label: 'Task Progress',
      data: state.sprintProgress,
      backgroundColor: [
          colors.blue.dark,
          colors.blue.base,
          colors.none
      ],
    }]
  }
}