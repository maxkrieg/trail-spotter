import { SET_MAP, ADD_MARKER } from '../actionTypes/map'

export function setMap(map) {
  return {
    type: SET_MAP,
    payload: map
  }
}

export function addMarker(position) {
  return {
    type: ADD_MARKER,
    payload: position
  }
}
