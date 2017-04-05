import _ from 'lodash'
import {
  ADD_TRAIL_SUCCESS,
  GET_ALL_TRAILS_SUCCESS,
  SORT_TRAILS,
} from '../actionTypes/trails'

const sortMap = {
  shortest: (trail) => trail.length,
  longest: (trail) => -trail.length,
}


function trails(state = [], action) {
  switch (action.type) {
    case GET_ALL_TRAILS_SUCCESS:
      return action.payload
    case ADD_TRAIL_SUCCESS:
      return [...state, action.payload]
    case SORT_TRAILS:
      if (state.length > 1) {
        return _.sortBy(state, sortMap[action.payload])
      }
      return state
    default:
      return state
  }
}

export default trails
