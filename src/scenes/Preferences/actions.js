import axios from 'axios';
import * as types from 'constants/actionTypes';
import * as paths from 'constants/actionPaths';

export const preferenceUpdate = args => ({
  type: types.PREFERENCES_UPDATE,
  payload: axios.post(paths.PREFERENCES_UPDATE, args)
});

export const getPreference = () => ({
  type: types.PREFERENCES_GET,
  payload: axios.get(paths.PREFERENCES_GET)
});
