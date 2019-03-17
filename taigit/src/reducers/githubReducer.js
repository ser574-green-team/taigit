import { GET_BRANCH_LIST, GET_COMMITS_PER_USER, GET_NUM_PULL_REQUESTS } from '../actions/githubActions';

const initialState = {
  branchesList: [],
  numOfCommits: 0,
  numPullRequests: 0
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
    case GET_COMMITS_PER_USER:
      console.log('payload is: ', action.payload);
      return {
        ...state,
        numOfCommits: action.payload
      }
    case GET_NUM_PULL_REQUESTS:
      console.log('payload is: ', action.payload);
      return {
        ...state,
        numPullRequests: action.payload
      }
    default:
      return {
        ...state,
        ...initialState
      }
  }
}

/**
 * Selectors
 * Allow us to compute data from the store and have components
 * used the computed data as props
 */

/**
 * Getting list of branches
 * Returns an array of branch names with the prefix 'Branch'
 * (An example of creating new data from the store)
 */
export const selectBranchList = (state) => {
  return state.branchesList.map(branch => `Branch: ${branch}`);
}

/**
 * Getting number of commits per member selector
 * Taking in the current store (state), it returns
 * data formatted to display the number of commits per
 * member bar chart
 */
export const selectNumCommitsChartData = (state) => {
  return {
    labels: ['Trevor Forrey'],
    datasets: [{
      label: 'Number of Commits',
      data: [state.numOfCommits],
      backgroundColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1
    }],
  }
}

export const selectNumPullRequestsData = (state) => {
  return {
    labels: ['Venkata Akhil Madaraju'],
    datasets: [{
      label: 'Pull Requests',
      data: [state.numPullRequests],
      backgroundColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1
    }],
  }
}


export default githubReducer