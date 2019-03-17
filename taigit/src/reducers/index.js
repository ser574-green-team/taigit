import {combineReducers} from 'redux';
import teamReducer from './teamReducer';
import githubReducer, * as fromGithub from './githubReducer';
import taigaReducer, * as fromTaiga from './taigaReducer'

export default combineReducers({
  github: githubReducer,
  taiga: taigaReducer,
  team: teamReducer
});

export const selectBranchList = (state) => fromGithub.selectBranchList(state.github);
export const selectNumCommitsChartData = (state) => fromGithub.selectNumCommitsChartData(state.github);
export const selectNumPullRequestsData = (state) => fromGithub.selectNumPullRequestsData(state.github);
export const selectSprintList = (state) => fromTaiga.selectSprintList(state.taiga);
export const selectCommitsPerContributorChartData = (state) => fromGithub.selectCommitsPerContributorChartData(state.github);