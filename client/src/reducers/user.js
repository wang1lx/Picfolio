import { GET_PROFILE, PROFILE_ERROR, GET_SERVICE, SERVICE_ERROR } from "../actions/types";

const initialState = {
  profile: null,
  loading: true,
  error: {}
}

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE:
      return {
        ...state,
        profile: payload.profile,
        loading: false
      }
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      }
    case GET_SERVICE:
      return {
        ...state,
        profile: payload.profile.services.append(payload),
        loading: false
      }
    case SERVICE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      }
    default:
      return state;
  }
}