import { sprint_stats } from '../libraries/Taiga';

/** Actions types */
export const GRAB_TAIGA_DATA = 'GRAB_TAIGA_DATA'
export const GET_SPRINT_STATS = 'GET_SPRINT_STATS'


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