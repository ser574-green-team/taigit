import {combineReducers} from 'redux';
import githubReducer, * as fromGithub from './githubReducer';
import taigaReducer, * as fromTaiga from './taigaReducer';
import teamReducer, * as fromTeam from './teamReducer';

export default combineReducers({
  github: githubReducer,
  taiga: taigaReducer,
  team: teamReducer
});

export const selectBranchList = (state) => fromGithub.selectBranchList(state.github);
export const selectNumCommitsChartData = (state) => fromGithub.selectNumCommitsChartData(state.github);
export const selectSprintProgressChartData = (state) => fromTaiga.selectSprintProgressChartData(state.taiga);
export const selectUserTaskDistributionChartData = (state) => fromTaiga.selectUserTaskDistributionChartData(state.taiga);
export const selectNumPullRequestsData = (state) => fromGithub.selectNumPullRequestsData(state.github);
export const selectSprintList = (state) => fromTaiga.selectSprintList(state.taiga);
export const selectCommitsPerContributorChartData = (state) => fromGithub.selectCommitsPerContributorChartData(state.github);
export const selectNumBranchCommits = (state) => fromGithub.selectNumBranchCommits(state.github);
export const selectSprintBurndownChartData = (state) => fromTaiga.selectSprintBurndownChartData(state.taiga);
export const selectNumPullRequestsClosedData = (state) => fromGithub.selectNumPullRequestsClosedData(state.github);
export const selectSingleSprintData = (state) => fromTaiga.selectSingleSprintData(state.taiga);
export const selectAvgCommentsPRData  = (state) => fromGithub.selectAvgCommentsPRData (state.github);
export const selectBasicContributorData = (state) => fromTeam.selectBasicContributorData(state.team);
export const selectBuildsList = (state) => fromGithub.selectBuildsList(state.github);
export const selectRepoList = (state) => fromGithub.selectRepoList(state.github);
export const selectBytesOfCodeChartData = (state) => fromGithub.selectBytesOfCodeChartData(state.github);
export const selectUserLogin = (state) => fromGithub.selectUserLogin(state.github);
export const selectTaigaUserID = (state) => fromTaiga.selectTaigaUserID(state.taiga);
export const selectProjectList = (state) => fromTaiga.selectProjectList(state.taiga);
export const selectTaigaProjectData = (state) => fromTaiga.selectTaigaProjectData(state.taiga);
export const selectCommitsInTimeWindow = (state) => fromGithub.selectCommitsInTimeWindow(state.github);
export const selectTotalCommitsData = (state) => fromGithub.selectTotalCommitsData(state.github);
export const selectNumFiles = (state) => fromGithub.selectNumFiles(state.github);
export const selectGrade = (state) => fromGithub.selectGrade(state.github);
export const selectCyclomaticComplexity = (state) => fromGithub.selectCyclomaticComplexity(state.github);
