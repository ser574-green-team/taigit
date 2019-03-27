import { project_info, sprint_stats, get_task_status_count} from '../libraries/Taiga';

/** Actions types */
export const GRAB_TAIGA_DATA = 'GRAB_TAIGA_DATA'
export const GET_SPRINT_STATS = 'GET_SPRINT_STATS'
export const GET_TASK_STATS = 'GET_TASK_STATS'

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
  project_info('sanaydevi-ser-574') // give the slug name
    .then(taigaProjectInfo =>
      dispatch({type: GRAB_TAIGA_DATA, payload: taigaProjectInfo})
    );
}

export const grabSprintStats = (infoForApiCall) => dispatch => {
  sprint_stats(220659)
    .then((sprintStats) => {
      console.log(sprintStats);
      dispatch({type: GET_SPRINT_STATS, payload: sprintStats});
    });
}

export const grabTaskStats = (infoForApiCall) => dispatch => {
  get_task_status_count(306316).then((taskStats) => {
    dispatch({type: GET_TASK_STATS, payload: taskStats});
  });
}
