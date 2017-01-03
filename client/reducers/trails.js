import {
  ADD_TRAIL_SUCCESS,
} from '../actionTypes/trails'

function trails(state = [], action) {
  switch (action.type) {
    case ADD_TRAIL_SUCCESS: {
      return [...state, action.payload]
    }
    default:
      return state
  }
}

export default trails
