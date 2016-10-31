import {
  SET_MAP,
  SET_MARKER,
  SET_MAP_CENTER,
  SET_MAP_ZOOM
} from '../actionTypes/map'

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

export function setMapCenter(position) {
  return {
    type: SET_MAP_CENTER,
    payload: position
  }
}

export function setMapZoom(zoom) {
  return {
    type: SET_MAP_ZOOM,
    payload: zoom
  }
}
