import { combineReducers } from 'redux';
import kittens from './kittens';
import map from './map'
import search from './search'

const reducers = combineReducers({
  kittens,
  map,
  search
});

export default reducers;
