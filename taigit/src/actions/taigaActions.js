import { 
  sprint_stats,
  project_info,
  sprint_list
 } from '../libraries/Taiga';

/** Actions types */
export const GRAB_TAIGA_DATA = 'GRAB_TAIGA_DATA'
export const GET_SPRINT_STATS = 'GET_SPRINT_STATS'
export const ADD_PROJECT_INFO = 'ADD_PROJECT_INFO'
export const ADD_SPRINTS_LIST = 'ADD_SPRINTS_LIST'

/** Thunks (actions that return a function that calls dispatch after async request(s)) */
export const grabTaigaData = (infoForApiCall) => dispatch => {
  console.log('about to fetch taiga data');
  /** 
   * This is where the taiga library call would be made
   * The payload value of "text" would be replaced with
   * the result of the api call
   * 
   * taigaLibrary.getTaigaData(infoForApiCall)
   *   .then(taigaData =>
   *     dispatch({type: GRAB_TAIGA_DATA}, payload: taigaData))
   *   );
   * 
   */
  dispatch({type: GRAB_TAIGA_DATA, payload:'mockApiData'})
}

export const grabSprintStats = (infoForApiCall) => dispatch => {
  sprint_stats(1)
    .then(sprintStats => 
      dispatch({type: GET_SPRINT_STATS, payload: sprintStats})
    );
}

export const getTaigaProjectData = (infoForApiCall) => dispatch => {
  project_info('sanaydevi-ser-574')
    .then((projectInfo) => {
      dispatch({type: ADD_PROJECT_INFO, payload: projectInfo});
      console.log('project Info: ', projectInfo);
      return projectInfo.id;
    })
    .then((projectId) => {
      return sprint_list(projectId);
    })
    .then((sprintList) => {
      console.log('Sprint list', sprintList);
      dispatch({type: ADD_SPRINTS_LIST, payload: sprintList});
    })
}