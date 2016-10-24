import { SET_SEARCH_BOX } from '../actionTypes/search'

const DEFAULT_STATE = {
  searchBox: null
}

export default function(state = DEFAULT_STATE, action) {
  switch (action.type) {
  case SET_SEARCH_BOX:
    return { ...state, searchBox: action.payload }
  default:
    return state
  }
}
