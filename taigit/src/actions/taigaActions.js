import { sprint_stats, get_task_details } from '../libraries/Taiga';

/** Actions types */
export const GRAB_TAIGA_DATA = 'GRAB_TAIGA_DATA'
export const GET_SPRINT_STATS = 'GET_SPRINT_STATS'
export const GET_SINGLE_SPRINT_STATS = 'GET_SINGLE_SPRINT_STATS'

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
  sprint_stats(220659)
    .then((sprintStats) => {
      console.log(sprintStats);
      dispatch({type: GET_SPRINT_STATS, payload: sprintStats});
    });
}

export const grabSingleSprintData = (infoForApiCall) => dispatch => {
  //get_task_details(sprint_id: number, project_id: any, sprint_name: string)  : Promise<Object> {
    console.log("GRAB SPRINT DATA");
    get_task_details(220752, 306316,'Sprint 2 - Taiga')
    .then((singleSprintStats) => {
      console.log(singleSprintStats);
      dispatch({type: GET_SINGLE_SPRINT_STATS, payload: singleSprintStats});
    });
}