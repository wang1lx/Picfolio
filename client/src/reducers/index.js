import { combineReducers } from 'redux';

import alert from './alert';
import auth from './auth';
import view from './view';

export default combineReducers({
  alert,
  auth,
  view
});
