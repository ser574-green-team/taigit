import { getBranches, getNumCommitsFromUser, getAuthToken } from '../libraries/GitHub/GitHub';

/** Actions types */
export const GET_BRANCH_LIST = 'GET_BRANCH_LIST';
export const GET_COMMITS_PER_USER = 'GET_COMMITS_PER_USER';
export const GET_AUTH_KEY = 'GET_AUTH_KEY';
 
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

export const getAuthKey = (id, secret, storeKey) => dispatch => {
  console.log('about to get auth key');
  getAuthToken(id, secret, storeKey)
      .then(authKey =>
      dispatch({type: GET_AUTH_KEY, payload: authKey}))

}