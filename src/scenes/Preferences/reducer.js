import initialState from 'initialState';
import * as types from 'constants/actionTypes';

export default function preferencesReducer(
  state = initialState.preferences,
  action
) {
  switch (action.type) {
    case types.PREFERENCES_GET + '_PENDING':
      return {
        ...state,
        status: 'Loading'
      };
    case types.PREFERENCES_GET + '_FULFILLED':
      return {
        ...state,
        ...action.payload.data,
        status: action.payload.statusText
      };
    case types.PREFERENCES_UPDATE + '_PENDING':
      return {
        ...state,
        status: 'Loading'
      };
    case types.PREFERENCES_UPDATE + '_FULFILLED':
      return {
        ...state,
        ...action.payload.data,
        status: action.payload.statusText
      };
    default:
      return state;
  }
}
