import { combineReducers } from 'redux';

import alert from './alert';
import auth from './auth';
import user from './user';
import photo from './photo';
import view from './view';

export default combineReducers({
  alert,
  auth,
  user,
  photo,
  view
});

