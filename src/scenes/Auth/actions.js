import * as types from 'constants/actionTypes';
import * as paths from 'constants/actionPaths';
import history from 'utils/history';
import axios from 'axios';

export const authSaveRedirect = url => ({
  type: types.USER_SAVE_REDIRECT,
  payload: url
});

export const authSaveEmail = email => ({
  type: types.USER_SAVE_EMAIL,
  payload: email
});

export const authRedirect = url => {
  history.push(url);
  return {
    type: types.USER_SAVE_REDIRECT,
    payload: ''
  };
};

export const authSignIn = (username, password) => ({
  type: types.USER_SIGNIN,
  payload: axios.get(paths.USER_SIGNIN, {
    auth: {
      username,
      password
    }
  })
});

export const authSignUp = (email, password, contact_optin, language) => ({
  type: types.USER_SIGNUP,
  payload: axios.post(paths.USER_SIGNUP, {
    email,
    password,
    contact_optin,
    language
  })
});

export const authCreateProfile = (
  first_name,
  last_name,
  phone,
  language,
  date,
  nationality
) => ({
  type: types.USER_CREATE_PROFILE,
  payload: axios.post(paths.USER_CREATE_PROFILE, {
    first_name,
    last_name,
    phone,
    language,
    date,
    nationality
  })
});

export const authFinishSignIn = token => ({
  type: types.USER_SIGNIN_FULFILLED,
  payload: {
    data: {
      token,
      has_profile: false
    }
  }
});

export const authForgotPassword = email => ({
  type: types.USER_FORGOT_PASSWORD,
  payload: axios.post(paths.USER_FORGOT_PASSWORD, {
    email
  })
});

export const authCreatePassword = (password, key, email) => ({
  type: types.USER_CREATE_PASSWORD,
  payload: axios.post(paths.USER_CREATE_PASSWORD, {
    password,
    key,
    email
  })
});
