import { get, post } from '../utils/api'
import {
  GET_ALL_TRAILS_SUCCESS,
  GET_ALL_TRAILS_ERROR,
  ADD_TRAIL_SUCCESS,
  ADD_TRAIL_ERROR,
} from '../actionTypes/trails'


export function getAllTrails() {
  return async dispatch => {
    try {
      const response = await get('/api/trails')
      dispatch({
        type: GET_ALL_TRAILS_SUCCESS,
        payload: response,
      })
    } catch (e) {
      dispatch({
        type: GET_ALL_TRAILS_ERROR,
      })
    }
  }
}

export function addTrail(data) {
  return async dispatch => {
    try {
      const response = await post('/api/trails', data)
      dispatch({
        type: ADD_TRAIL_SUCCESS,
        payload: {
          ...data,
          ...response,
        },
      })
    } catch (e) {
      dispatch({
        type: ADD_TRAIL_ERROR,
      })
    }
  }
}
