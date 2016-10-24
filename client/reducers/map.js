import { SET_MAP, SET_MARKER } from '../actionTypes/map'

const DEFAULT_STATE = {
  map: null,
  marker: null
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
  default:
    return state
  }
}
