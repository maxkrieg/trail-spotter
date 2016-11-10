import { get, post, del } from '../utils/api'

export function addTrail(data) {
  console.log(data)
  return async dispatch => {
    dispatch({
      type: 'ADD_TRAIL'
    })

    try {
      const result = await post('/api/trails', data);

      dispatch({
        type: 'ADD_TRAIL_SUCCESS',
        payload: result
      })
    } catch(e) {
      dispatch({
        type: 'ADD_TRAIL_ERROR'
      })
    }
  }
}
