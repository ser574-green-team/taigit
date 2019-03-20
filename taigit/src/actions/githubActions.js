import { getBranches, getNumCommitsFromUser, getNumPullRequests, contributorData, getAuthToken } from '../libraries/GitHub/GitHub';

/** Actions types */
export const GET_BRANCH_LIST = 'GET_BRANCH_LIST';
export const GET_COMMITS_PER_USER = 'GET_COMMITS_PER_USER';
export const GET_NUM_PULL_REQUESTS = 'GET_NUM_PULL_REQUESTS';
export const ADD_CONTRIBUTOR_INFO = 'GET_CONTRIBUTOR_INFO';
export const GET_AUTH_KEY = 'GET_AUTH_KEY';

/** Thunks (actions that return a function that calls dispatch after async request(s)) */
export const getBranchList = (owner, repo) => dispatch => {
  console.log('about to get branches list');
  getBranches(owner, repo)
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

export const getContributorData = (repo = 'banana', owner = 'trevorforrey') => dispatch => {
    console.log('about to grab contributor data');
    contributorData('ser574-green-team', 'taigit')
        .then((contributorData) => {
            const authorList = contributorData.map((userInfo) => {
                let authorInfo = {};
                authorInfo.avatar_url = userInfo.author.avatar_url;
                authorInfo.login = userInfo.author.login;
                authorInfo.id = userInfo.author.id;
                authorInfo.url = userInfo.author.url;
                authorInfo.totalCommits = userInfo.total;
                return authorInfo;
            });
            dispatch({type: ADD_CONTRIBUTOR_INFO, payload: authorList})
        });
}

export const getAuthKey = (id, secret, storeKey) => dispatch => {
  console.log('about to get auth key');
  getAuthToken(id, secret, storeKey)
      .then(authKey =>
      dispatch({type: GET_AUTH_KEY, payload: authKey}))
}