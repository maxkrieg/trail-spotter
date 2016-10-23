import { combineReducers } from 'redux';
import kittens from './kittens';
import map from './map'

const reducers = combineReducers({
  kittens,
  map
});

export default reducers;
