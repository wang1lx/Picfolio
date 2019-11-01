import axios from 'axios';

import { GET_PHOTO, PHOTO_ERROR, GET_ALL_PHOTOS } from './types';

// Upload photo for current user
export const uploadPhoto = (formData, history) => async dispatch => {
  try {
    const config = {
      header: {
        'content-type': 'multipart/form-data'
      }
    };

    const res = await axios.post('/api/photo', formData, config);

    dispatch({
      type: GET_PHOTO,
      payload: res.data
    });

    history.push('/profile');
  } catch (err) {
    console.error(err.msg);
    // dispatch({
    //   type: PHOTO_ERROR,
    //   payload: { msg: err.response.statusText, status: err.response.status }
    // });
  }
};

export const getCurrentUserPhotos = () => async dispatch => {
  try {
    const res = await axios.get('/api/photo/me');

    dispatch({
      type: GET_ALL_PHOTOS,
      payload: res.data
    });
  } catch (err) {
    console.error(err.msg);
    dispatch({
      type: PHOTO_ERROR,
      payload: { msg: err.response }
    });
  }
};
