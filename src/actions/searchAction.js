import { SEARCH_USER, FETCH_USERS } from './types'
import { getUsers } from '../services/internal-api'

export const searchUser = (text) => async dispatch => {
  dispatch({
    type: SEARCH_USER,
    payload: text
  })
}

export const fetchUsers = () => async dispatch => {
  try {
    const response = await getUsers()

    dispatch({
      type: FETCH_USERS,
      payload: response
    })

  } catch (error) {
    throw new Error(error)
  }
}