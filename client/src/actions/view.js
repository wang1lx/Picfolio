import axios from 'axios';
import { setAlert } from './alert';

import { GET_PROFILE, PROFILE_ERROR } from './types';

// Get current user's profile
export const getViewProfile = (username) => async dispatch => {
  try {
    const res = await axios.get('/api/users/profile', {username});

    dispatch({
      type: GET_VIEW_PROFILE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response }
    });
  }
};
