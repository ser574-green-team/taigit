import {
  getBranches,
  getNumCommitsFromUser,
  getNumPullRequests,
  contributorData,
  getNumBranchCommits,
  getAuthToken } from '../libraries/GitHub/GitHub';
import { getFromLocalStorage, saveToLocalStorage } from '../utils/utils';

/** Actions types */
export const GET_BRANCH_LIST = 'GET_BRANCH_LIST';
export const GET_COMMITS_PER_USER = 'GET_COMMITS_PER_USER';
export const GET_NUM_PULL_REQUESTS = 'GET_NUM_PULL_REQUESTS';
export const ADD_CONTRIBUTOR_INFO = 'GET_CONTRIBUTOR_INFO';
export const GET_NUM_BRANCH_COMMITS = 'GET_NUM_BRANCH_COMMITS';
export const ADD_AUTH_KEY = 'ADD_AUTH_KEY';
export const GET_PULL_REQUESTS_CLOSED = 'GET_PULL_REQUESTS_CLOSED';

/** Thunks (actions that return a function that calls dispatch after async request(s)) */
export const getBranchList = (owner, repo, auth) => dispatch => {
  console.log('about to get branches list');
  getBranches(owner, repo, auth)
    .then(branches =>
      dispatch({type: GET_BRANCH_LIST, payload: branches})
    );
}

export const getCommitsPerUser = (owner, repo, author, auth) => dispatch => {
  console.log('about to get commits for one user');
  getNumCommitsFromUser(owner, repo, author, auth)
    .then(numberOfCommits =>
      dispatch({type: GET_COMMITS_PER_USER, payload: numberOfCommits})
    );
}

export const getPullRequests = (owner, repo, auth) => dispatch => {
  console.log('about to get number of pull requests');
  getNumPullRequests(owner, repo, auth)
    .then(numberOfPullRequests =>
      dispatch({type: GET_NUM_PULL_REQUESTS, payload: numberOfPullRequests})
    );
}

// component for pull requests closed, to be implemented in the backend

// export const getPullRequestsClosed = (owner, repo, auth) => dispatch => {
//   console.log('about to get number of pull requests closed');
//   getNumPullRequestsClosed(owner, repo, auth)
//     .then(numberOfPullRequestsClosed =>
//       dispatch({type: GET_NUM_PULL_REQUESTS, payload: numberOfPullRequestsClosed})
//     );
// }

export const getContributorData = (owner, repo, auth) => dispatch => {
  console.log('about to grab contributor data');
  contributorData(owner, repo, auth)
    .then((contributorData) => {
      try {
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
      } catch (e) {
        console.error(e);
      }
    });
}

export const getBranchCommits = (owner, repo, branch, auth) => dispatch => {
  console.log('about to grab number of branch commits');
  getNumBranchCommits(owner, repo, branch, auth)
    .then(numBranchCommits =>
        dispatch({type: GET_NUM_BRANCH_COMMITS, payload: numBranchCommits})
    );
}

export const getAuthKey = (auth_server, storeKey) => dispatch => {
  console.log('about to get auth key');
  getAuthToken(auth_server, storeKey)
      .then((authKey) => {
        saveToLocalStorage('auth-key', authKey);
        dispatch({type: ADD_AUTH_KEY, payload: authKey})
      });
}
