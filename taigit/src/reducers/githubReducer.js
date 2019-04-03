import colors from '../styles/colors';
import { GET_BRANCH_LIST, 
  GET_COMMITS_PER_USER, 
  GET_NUM_PULL_REQUESTS, 
  ADD_CONTRIBUTOR_INFO, 
  GET_NUM_BRANCH_COMMITS, 
  ADD_AUTH_KEY, 
  GET_PULL_REQUESTS_CLOSED,
  GET_AVG_COMMENTS_PR 
} from '../actions/githubActions';

const initialState = {
  branchesList: [],
  numOfCommits: 0,
  numPullRequests: 0,
  contributors: [],
  numBranchCommits: [],
  authKey: '',
  numPullRequestsClosed: 0,
  avgCommentsOnPR : 0
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
      console.log('payload for pull req is: ', action.payload);
      return {
        ...state,
        numPullRequests: action.payload
      }
    case ADD_CONTRIBUTOR_INFO:
      console.log('payload for contributor data is: ', action.payload);
      return {
        ...state,
        contributors: action.payload
      }
    case GET_NUM_BRANCH_COMMITS:
      console.log('payload for number of branch commits is: ', action.payload);
      state.numBranchCommits.push(action.payload);
      return {
        ...state,
      }
    case ADD_AUTH_KEY:
      console.log('payload is: ', action.payload);
      return {
          ...state,
          authKey: action.payload
      }
    case GET_AVG_COMMENTS_PR:
      console.log('payload for average comments on pr is: ', action.payload);
      return {
          ...state,
          avgCommentsOnPR: action.payload
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
  return state.branchesList;
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
      backgroundColor: colors.yellow.base,
      borderWidth: 1
    }],
  }
}

export const selectNumPullRequestsData = (state) => {
  return state.numPullRequests;
}

export const selectCommitsPerContributorChartData = (state) => {
  let contributorList = state.contributors.map((contributor) => contributor.login);
  let commitsList = state.contributors.map((contributor) => contributor.totalCommits);
  return {
    labels: contributorList,
    datasets: [{
      label: 'Number of Commits',
      data: commitsList,
      backgroundColor: colors.yellow.base,
      borderWidth: 1
    }],
  }
}

export const selectNumBranchCommits = (state) => {
  return {
      labels: ['master', 'dev'],
      datasets: [{
          label: 'Number of Commits',
          data: [state.numBranchCommits[0], state.numBranchCommits[1]],
          backgroundColor: colors.red.base,
          borderWidth: 1
      }]
  };
}

export const selectAuthKey = (state) => {
  return state.authKey;
}

export const selectNumPullRequestsClosedData = (state) => {
  return state.numPullRequestsClosed;
}

export const selectAvgCommentsPRData = (state) => {
  return state.avgCommentsOnPR;
}

export default githubReducer