import {combineReducers} from 'redux';
import taigaReducer from './taigaReducer';
import teamReducer from './teamReducer';
import githubReducer from './githubReducer';

export default combineReducers({
  github: githubReducer,
  taiga: taigaReducer,
  team: teamReducer
});