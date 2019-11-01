import { GET_PHOTO, GET_ALL_PHOTOS, PHOTO_ERROR } from "../actions/types";

const initialState = {
  photos: [],
  loading: true,
  error: {}
}

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_ALL_PHOTOS:
      return {
        error: {},
        photos: payload,
        // photos: [...state.photos, payload],
        loading: false
      }
    case GET_PHOTO:
      return {
        error: {},
        photos: [...state.photos, ...payload],
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