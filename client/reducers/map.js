import { SET_MAP, ADD_MARKER } from '../actionTypes/map'

const DEFAULT_STATE = {
  map: null,
  markers: []
}

export default function(state = DEFAULT_STATE, action) {
  switch (action.type) {
  case SET_MAP:
    return {
      ...state,
      map: action.payload
    }
  case ADD_MARKER:
    const position = action.payload
    const marker = new google.maps.Marker({
      position,
      draggable: true,
      map: state.map
    })
    console.log(marker.position.lat())
    return {
      ...state,
      markers: [...state.markers, marker]
    }
  default:
    return state
  }
}
