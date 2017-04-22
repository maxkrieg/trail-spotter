import {
  ADD_TRAIL_SUCCESS,
  GET_ALL_TRAILS_SUCCESS,
} from '../actionTypes/trails'


function trails(state = [], action) {
  switch (action.type) {
    case GET_ALL_TRAILS_SUCCESS:
      return action.payload
    case ADD_TRAIL_SUCCESS:
      return [...state, action.payload]
    default:
      return state
  }
}

export default trails
