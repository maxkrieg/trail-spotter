import { SET_SEARCH_BOX } from '../actionTypes/search'

export function setSearchBox(searchBox) {
  return {
    type: SET_SEARCH_BOX,
    payload: searchBox
  }
}
