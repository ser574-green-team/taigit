import { sprint_stats, sprint_list, project_info } from '../libraries/Taiga';

/** Actions types */
export const GRAB_TAIGA_DATA = 'GRAB_TAIGA_DATA'
export const GET_SPRINT_STATS = 'GET_SPRINT_STATS'
export const GET_SPRINT_NAMES = 'GET_SPRINT_NAMES'

/** Thunks (actions that return a function that calls dispatch after async request(s)) */
export const grabTaigaData = (infoForApiCall) => dispatch => {
  project_info('sanaydevi-ser-574') // give the slug name
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

export const grabSprintNames = (infoForApiCall) => dispatch => {
  sprint_list(306316)
    .then((sprintData) => {
      dispatch({type: GET_SPRINT_NAMES, payload: sprintData});
    });
}
