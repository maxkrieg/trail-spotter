import { combineReducers } from 'redux'
import {
  OPEN_ADD_TRAIL_MODAL,
  CLOSE_ADD_TRAIL_MODAL,
} from '../actionTypes/addTrailModal'
import {
  ADD_TRAIL_SUCCESS,
  ADD_TRAIL_ERROR,
} from '../actionTypes/trails'

function isOpen(state = false, action) {
  switch (action.type) {
    case OPEN_ADD_TRAIL_MODAL:
      return true
    case CLOSE_ADD_TRAIL_MODAL:
      return false
    default:
      return state
  }
}

function addTrailStatus(state = null, action) {
  switch (action.type) {
    case ADD_TRAIL_SUCCESS:
      return 'success'
    case ADD_TRAIL_ERROR:
      return 'error'
    case OPEN_ADD_TRAIL_MODAL:
      return null
    case CLOSE_ADD_TRAIL_MODAL:
      return null
    default:
      return state
  }
}

export default combineReducers({
  isOpen,
  addTrailStatus,
})
