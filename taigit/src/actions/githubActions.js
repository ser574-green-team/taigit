import { getBranches, getNumCommitsFromUser, getNumPullRequests, getNumCommitsInWindow } from '../libraries/GitHub/GitHub';

/** Actions types */
export const GET_BRANCH_LIST = 'GET_BRANCH_LIST';
export const GET_COMMITS_PER_USER = 'GET_COMMITS_PER_USER';
export const GET_NUM_PULL_REQUESTS = 'GET_NUM_PULL_REQUESTS';
export const GET_NUM_COMMITS_WINDOW = 'GET_NUM_COMMITS_WINDOW';
 
/** Thunks (actions that return a function that calls dispatch after async request(s)) */
export const getBranchList = (infoForApiCall) => dispatch => {
  console.log('about to get branches list');
  getBranches('trevorforrey', 'OttoDB')
    .then(branches => 
      dispatch({type: GET_BRANCH_LIST, payload: branches})
    );
}

export const getCommitsPerUser = (infoForApiCall) => dispatch => {
  console.log('about to get commits for one user');
  getNumCommitsFromUser('trevorforrey', 'OttoDB', 'trevorforrey')
    .then(numberOfCommits =>
      dispatch({type: GET_COMMITS_PER_USER, payload: numberOfCommits})
    );
}

export const getPullRequests = (infoForApiCall) => dispatch => {
  console.log('about to get number of pull requests');
  getNumPullRequests('ser574-green-team', 'taigit')
    .then(numberOfPullRequests =>
      dispatch({type: GET_NUM_PULL_REQUESTS, payload: numberOfPullRequests})
    );
}

export const getCommitsInWindow = (infoForApiCall) => dispatch => {
  console.log('about to get number of commits in time window');
  getNumCommitsInWindow('ser574-green-team', 'taigit','2019-03-15T15:05:06+01:00','2019-03-16T15:05:06+01:00')
    .then(numberOfCommitsInWindow =>
      dispatch({type: GET_NUM_COMMITS_WINDOW, payload: numberOfCommitsInWindow})
    );
}
