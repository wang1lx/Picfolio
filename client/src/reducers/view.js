import {
  USER_LOADED,
} from '../actions/types';

const initialState = {
  viewUser: null,
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_VIEW_PROFILE:
      return {
        ...state,
        loading: false,
        viewUser: payload
      };
      case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      }
    }
