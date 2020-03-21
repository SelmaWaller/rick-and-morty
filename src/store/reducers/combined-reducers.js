import {combineReducers} from 'redux';
import CharactersReducer from './characterReducer';
import CharacterCountReducer from './characterCountReducer';
import CharacterSpecificReducer from './characterSpecificReducer';
import CharacterEpisodeReducer from './characterEpisodeReducer';
import DebouncerReducer from './debouncerReducer';

export default combineReducers({
  CharactersReducer,
  CharacterCountReducer,
  CharacterSpecificReducer,
  CharacterEpisodeReducer,
  DebouncerReducer,
});
