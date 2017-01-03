import { combineReducers } from 'redux';
import trails from './trails'
import addTrailModal from './addTrailModal'

export default combineReducers({
  trails,
  addTrailModal,
})
