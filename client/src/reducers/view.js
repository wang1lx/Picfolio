import {
  GET_VIEW_PROFILE,
  PROFILE_ERROR
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
        viewUser: payload,
        loading: false
      };
      case PROFILE_ERROR:
        return {
          ...state,
          error: payload,
          loading: false
        };
      default:
        return state;
    }
}