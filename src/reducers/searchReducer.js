import {
  SEARCH_USER,
  FETCH_USERS
} from '../actions/types'

const initialState = {
  text: '',
  users: [],
}

export default function (state = initialState, action) {
  switch (action.type) {
    case SEARCH_USER:
      return {
        ...state,
        text: action.payload,
      }
    case FETCH_USERS:
      return {
        ...state,
        users: action.payload,
      }
    default:
      return state
  }
}