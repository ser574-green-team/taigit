import { 
  project_info, sprint_list, 
  get_task_details, sprint_stats, 
  get_task_status_count 
} from '../libraries/Taiga';

/** Actions types */
export const GRAB_TAIGA_DATA = 'GRAB_TAIGA_DATA'
export const GET_SPRINT_STATS = 'GET_SPRINT_STATS'
export const GET_SINGLE_SPRINT_STATS = 'GET_SINGLE_SPRINT_STATS'
export const GET_SPRINT_NAMES = 'GET_SPRINT_NAMES'
export const GET_TASK_STATS = 'GET_TASK_STATS'

/** Thunks (actions that return a function that calls dispatch after async request(s)) */
export const grabTaigaData = (slugName) => dispatch => {
  project_info(slugName) // give the slug name
	    .then((taigaProjectInfo) => {
        console.log(taigaProjectInfo);
        dispatch({type: GRAB_TAIGA_DATA, payload: taigaProjectInfo});
      });
}

export const grabSprintStats = (infoForApiCall) => dispatch => {
  sprint_stats(220659)
    .then((sprintStats) => {
      console.log(sprintStats);
      dispatch({type: GET_SPRINT_STATS, payload: sprintStats});
    });
}

export const grabTaskStats = (projectId) => dispatch => {
  get_task_status_count(projectId).then((taskStats) => {
    dispatch({type: GET_TASK_STATS, payload: taskStats});
  });
}
export const grabSingleSprintData = (sprintId, projectId, sprintName) => dispatch => {
  get_task_details(sprintId, projectId, sprintName)
    .then((singleSprintStats) => {
      console.log(singleSprintStats);
      dispatch({type: GET_SINGLE_SPRINT_STATS, payload: singleSprintStats});
    });
}
export const grabSprintNames = (projectId) => dispatch => {
  sprint_list(projectId)
    .then((sprintData) => {
      dispatch({type: GET_SPRINT_NAMES, payload: sprintData});
    });
}
