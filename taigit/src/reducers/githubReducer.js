import { GET_BRANCH_LIST } from '../actions/githubActions';

const initialState = {
  branchesList: []
}
/**
 * Github Reducer
 * Gets called each time there's an action
 * Currently, it always returns a spread of the current state,
 * as well as the mock data above in the property totalNumberOfCommits
 */
const githubReducer = (state = {}, action) => {
  console.log('in github reducer');
  switch(action.type) {
    case GET_BRANCH_LIST:
      console.log('payload is: ', action.payload);
      // Return new object of current state spread and new property (taigaData)
      return {
        ...state,
        branchesList: action.payload
      }
    default:
      return {
        ...state,
        ...initialState
      }
  }
}

export default githubReducer