import {
  SET_MAP,
  SET_MARKER,
  SET_MAP_CENTER,
  SET_MAP_ZOOM
} from '../actionTypes/map'

const DEFAULT_STATE = {
  map: null,
  marker: null,
  center: null,
  zoom: null
}

export default function(state = DEFAULT_STATE, action) {
  switch (action.type) {
  case SET_MAP:
    return {
      ...state,
      map: action.payload
    }
  case SET_MARKER:
    if (state.marker) {
      state.marker.setMap(null)
    }

    const marker = new google.maps.Marker({
      map: state.map,
      position: action.payload,
      draggable: true
    })

    return { ...state, marker }
  case SET_MAP_CENTER:
    const center = action.payload
    if (state.map) {
      state.map.setCenter(center)
    }
    return { ...state, center }

  case SET_MAP_ZOOM:
    const zoom = action.payload
    if (state.map) {
      state.map.setZoom(zoom)
    }
    return { ...state, zoom }
  default:
    return state
  }
}
