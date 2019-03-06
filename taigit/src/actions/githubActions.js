import { getBranches } from '../libraries/GitHub/GitHub';

/** Actions types */
export const GET_BRANCH_LIST = 'GET_BRANCH_LIST'

/** Thunks (actions that return a function that calls dispatch after async request(s)) */
export const getBranchList = (infoForApiCall) => dispatch => {
  console.log('about to get branches list');
  getBranches('trevorforrey', 'OttoDB')
    .then(branches => 
      dispatch({type: GET_BRANCH_LIST, payload:branches})
    );
}