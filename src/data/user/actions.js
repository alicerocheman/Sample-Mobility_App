import * as types from 'constants/actionTypes';
import * as paths from 'constants/actionPaths';
import axios from 'axios';

export const userDeactivate = () => {
  return {
    type: types.USER_DEACTIVATE,
    payload: axios.delete(paths.USER_DEACTIVATE)
  };
};

export const userSignOut = () => {
  return {
    type: types.USER_SIGNOUT,
    payload: axios.get(paths.USER_SIGNOUT)
  };
};

export const userSaveLanguage = language => ({
  type: types.USER_CHANGE_LANGUAGE_FULFILLED,
  payload: {
    data: {
      language
    }
  }
});

export const userChangeLanguage = language => ({
  type: types.USER_CHANGE_LANGUAGE,
  payload: axios.post(paths.USER_CHANGE_LANGUAGE, {
    language
  })
});

export const userGetPrivate = () => ({
  type: types.USER_GET_PRIVATE,
  payload: axios.get(paths.USER_GET_PRIVATE)
});

export const userUpdatePreference = args => {
  return {
    type: types.USER_UPDATE_PREFERENCE,
    payload: axios.post('/user/update/preference', args)
  };
};
