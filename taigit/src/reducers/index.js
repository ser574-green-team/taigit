import {combineReducers} from 'redux';
import taigaReducer from './taigaReducer';
import teamReducer from './teamReducer';
import githubReducer, * as fromGithub from './githubReducer';

export default combineReducers({
  github: githubReducer,
  taiga: taigaReducer,
  team: teamReducer
});

export const selectBranchList = (state) => fromGithub.selectBranchList(state.github);
export const selectNumCommitsChartData = (state) => fromGithub.selectNumCommitsChartData(state.github);
export const selectNumPullRequestsData = (state) => fromGithub.selectNumPullRequestsData(state.github);