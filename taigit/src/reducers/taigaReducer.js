import { GRAB_TAIGA_DATA } from '../actions/taigaActions';

const initialState = {
  taigaData: 'helller'
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