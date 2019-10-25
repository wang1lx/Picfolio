import axios from 'axios';
import { setAlert } from './alert';

import { GET_PROFILE, PROFILE_ERROR } from './types';

// Get current user's profile
export const getCurrentProfile = () => async dispatch => {
  try {
    const res = await axios.get('/api/users/me');

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Create or update user's profile
export const createProfile = (formData, history, edit = false) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const res = await axios.post('api/users/me', formData, config);

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });

    const alertMsg = edit ? 'Profile Updated' : 'Profile Created';
    dispatch(setAlert(alertMsg));

    if (!edit) {
      history.push('/profile');
    }

  } catch (err) {
    const error = err.response.data;
    if (error) {
      dispatch(setAlert(error.msg, 'danger'));
    }
    
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Create a user service
export const createUserService = (formData, history, edit = false) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const res = await axios.post('api/users/me/services', formData, config);

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });

    const alertMsg = edit ? 'Service Updated' : 'Service Created';
    dispatch(setAlert(alertMsg));

    if (!edit) {
      history.push('/profile');
    }

  } catch (err) {
    const error = err.response.data;
    if (error) {
      dispatch(setAlert(error.msg, 'danger'));
    }
    
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};