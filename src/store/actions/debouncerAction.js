import {GET_DEBOUNCER} from './actionTypes';

export const DebouncerAction = debouncer => {
  return dispatch => {
    dispatch({
      type: GET_DEBOUNCER,
      debouncer,
    });
  };
};
