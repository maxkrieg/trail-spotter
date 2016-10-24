import { SET_MAP, SET_MARKER } from '../actionTypes/map'

export function setMap(map) {
  return {
    type: SET_MAP,
    payload: map
  }
}

export function setMarker(position) {
  return {
    type: SET_MARKER,
    payload: position
  }
}
