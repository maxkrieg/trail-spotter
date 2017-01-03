import { post } from '../utils/api'
import { ADD_TRAIL_SUCCESS, ADD_TRAIL_ERROR } from '../actionTypes/trails'

export function addTrail(data) {
  return async dispatch => {
    // dispatch({
    //   type: 'ADD_TRAIL',
    // })

    try {
      const result = await post('/api/trails', data);
      dispatch({
        type: ADD_TRAIL_SUCCESS,
        payload: {
          ...data,
          ...result,
        },
      })
    } catch (e) {
      dispatch({
        type: ADD_TRAIL_ERROR,
      })
    }
  }
}
