import { GET_PHOTO, PHOTO_ERROR } from "../actions/types";

const initialState = {
  photos: [],
  loading: true,
  error: {}
}

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PHOTO:
      return {
        error: state.error,
        photos: [...state.photos, payload],
        loading: false
      }
    case PHOTO_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      }
    default:
      return state;
  }
}