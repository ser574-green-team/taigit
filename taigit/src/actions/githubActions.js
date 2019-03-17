import { getBranches, getNumCommitsFromUser, getNumPullRequests } from '../libraries/GitHub/GitHub';

/** Actions types */
export const GET_BRANCH_LIST = 'GET_BRANCH_LIST';
export const GET_COMMITS_PER_USER = 'GET_COMMITS_PER_USER';
export const GET_NUM_PULL_REQUESTS = 'GET_NUM_PULL_REQUESTS';
 
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
  getNumPullRequests('vmadaraj', 'SER515_codesquad')
    .then(numberOfPullRequests =>
      dispatch({type: GET_NUM_PULL_REQUESTS, payload: numberOfPullRequests})
    );
}