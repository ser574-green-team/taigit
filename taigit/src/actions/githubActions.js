import {
  getBranches,
  getNumCommitsFromUser,
  getNumOpenPullRequests,
  contributorData,
  getNumBranchCommits,
  getNumComments,
  getAuthToken,
  getMemberInfo,
  getUserRepos,
  getUserInfo,
  getBuilds,
<<<<<<< HEAD
  getBytesOfCode
=======
  getCodeAnalysis
>>>>>>> in progress
} from '../libraries/GitHub/GitHub';
import { getFromLocalStorage, saveToLocalStorage } from '../utils/utils';

/** Actions types */
export const GET_BRANCH_LIST = 'GET_BRANCH_LIST';
export const GET_COMMITS_PER_USER = 'GET_COMMITS_PER_USER';
export const GET_NUM_PULL_REQUESTS = 'GET_NUM_PULL_REQUESTS';
export const ADD_CONTRIBUTOR_INFO = 'GET_CONTRIBUTOR_INFO';
export const GET_NUM_BRANCH_COMMITS = 'GET_NUM_BRANCH_COMMITS';
export const ADD_AUTH_KEY = 'ADD_AUTH_KEY';
export const GET_PULL_REQUESTS_CLOSED = 'GET_PULL_REQUESTS_CLOSED';
export const GET_AVG_COMMENTS_PR = 'GET_AVG_COMMENTS_PR';
export const GET_BUILDS_LIST = 'GET_BUILDS_LIST';
export const ADD_USER_REPOS = 'ADD_USER_REPOS';
export const ADD_USER_INFO = 'ADD_USER_INFO';
export const LOADING_GITHUB_DATA = 'LOADING_GITHUB_DATA';
<<<<<<< HEAD
export const GET_BYTES_OF_CODE = 'GET_BYTES_OF_CODE';
=======
export const GET_GRADE = 'GET_GRADE';
export const GET_NUM_FILES = 'GET_NUM_FILES';
export const GET_CYCLOMATIC_COMPLEXITY = 'GET_CYCLOMATIC_COMPLEXITY';
>>>>>>> in progress

/** Thunks (actions that return a function that calls dispatch after async request(s)) */
export const getBranchList = (owner, repo, auth) => dispatch => {
  console.log('about to get branches list');
  getBranches(owner, repo, auth)
    .then(branches =>
      dispatch({type: GET_BRANCH_LIST, payload: branches})
    );
}

export const getUsersRepos = (owner, auth) => dispatch => {
  console.log('about to get all user owned repos');
  getUserRepos(owner, auth)
    .then(repos => {
      try {
        const userReposTrimmed = repos.map((repo) => {
          let trimmedRepo = {};
          trimmedRepo.id = repo.id;
          trimmedRepo.name = repo.name;
          trimmedRepo.full_name = repo.full_name;
          trimmedRepo.owner = repo.owner.login;
          return trimmedRepo;
        })
        dispatch({type: ADD_USER_REPOS, payload: userReposTrimmed});
      } catch (e) {
        console.error(e);
      }
    });
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
  getNumOpenPullRequests(owner, repo, auth)
    .then(numberOfPullRequests =>
      dispatch({type: GET_NUM_PULL_REQUESTS, payload: numberOfPullRequests})
    );
}

export const getMembersInfo = (organization, auth) => dispatch => {
  getMemberInfo(organization, auth)
    .then(memberInfo => {
      console.log('Member Info Data: ', memberInfo);
    });
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

export const getAvgCommentsPR = (owner, repo, auth) => dispatch => {
  console.log('about to get Avg comments on the PR');
  getNumComments(owner, repo, auth)
    .then(avgNumberofComments =>
      dispatch({type: GET_AVG_COMMENTS_PR, payload: avgNumberofComments})
    );
}

export const getBuildsList = (owner, repo, auth) => dispatch => {
  console.log('about to perform acquisition of build candidates');
  getBuilds(owner, repo, auth)
    .then(buildsList => 
      dispatch({type: GET_BUILDS_LIST, payload: buildsList})
    );
}


export const addUserInfo = (auth) => dispatch => {
  console.log('about to get user object');
  getUserInfo(auth)
    .then(userInfo => 
      dispatch({type: ADD_USER_INFO, payload: userInfo})
    );
}

export const loadAllGitHubProjectData = (owner, repo, auth) => async(dispatch) => {
  dispatch({type: LOADING_GITHUB_DATA, payload: true});

  const branches = await getBranches(owner, repo, auth);
  dispatch({type: GET_BRANCH_LIST, payload: branches});

  // const commitsPerUser = await getNumCommitsFromUser(owner, repo, author, auth);
  // dispatch({type: GET_COMMITS_PER_USER, payload: commitsPerUser});

  const numberOfPullRequests = await getNumOpenPullRequests(owner, repo, auth)
  dispatch({type: GET_NUM_PULL_REQUESTS, payload: numberOfPullRequests});

  const contributorInfo = await contributorData(owner, repo, auth);
  try {
    console.log('contributor info: ', contributorInfo);
    const authorList = contributorInfo.map((userInfo) => {
      let authorInfo = {};
      authorInfo.avatar_url = userInfo.author.avatar_url;
      authorInfo.login = userInfo.author.login;
      authorInfo.id = userInfo.author.id;
      authorInfo.url = userInfo.author.url;
      authorInfo.totalCommits = userInfo.total;
      return authorInfo;
    });
    dispatch({type: ADD_CONTRIBUTOR_INFO, payload: authorList});
  } catch (error) {
    console.error('Error getting contributor info: ', error);
  }

  const numberOfBranchCommits = await getNumBranchCommits(owner, repo, 'master', auth);
  dispatch({type: GET_NUM_BRANCH_COMMITS, payload: numberOfBranchCommits});

  // TODO check to see if project is in an organization, if so, call the following
  // const memberInfo = await getMemberInfo(organization, auth);
  //dispatch({type: GET_MEMBER_INFO, payload: memberInfo});

  const avgPRComments = await getNumComments(owner, repo, auth);
  dispatch({type: GET_AVG_COMMENTS_PR, payload: avgPRComments});

  const buildsList = await getBuilds(owner, repo, auth);
  dispatch({type: GET_BUILDS_LIST, payload: buildsList});

<<<<<<< HEAD
  const bytesOfCode = await getBytesOfCode(owner, repo, auth);
  dispatch({type: GET_BYTES_OF_CODE, payload: bytesOfCode});

=======
  const analysis = await getCodeAnalysis(getFromLocalStorage("codacy-username"),
    repo, owner, repo, auth);
    dispatch({type: GET_GRADE, payload: analysis})
>>>>>>> in progress
  dispatch({type: LOADING_GITHUB_DATA, payload: false});
}