import {
  OPEN_ADD_TRAIL_MODAL,
  CLOSE_ADD_TRAIL_MODAL,
} from '../actionTypes/addTrailModal'


export function openAddTrailModal() {
  return {
    type: OPEN_ADD_TRAIL_MODAL,
  }
}

export function closeAddTrailModal() {
  return {
    type: CLOSE_ADD_TRAIL_MODAL,
  }
}
