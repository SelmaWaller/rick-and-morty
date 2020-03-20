import {combineReducers} from 'redux';
import CharactersReducer from './characterReducer';
import DebouncerReducer from './debouncerReducer';

export default combineReducers({
  CharactersReducer,
  DebouncerReducer,
});
