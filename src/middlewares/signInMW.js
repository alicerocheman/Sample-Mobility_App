//This middleware stores the user data
// (token and profile completion)
// after corresponding actions
import localUser from 'data/user/localUser';

const signInMW = store => next => action => {
  let result = next(action);
  let state = store.getState();
  if (action.type === 'USER_SIGNIN_FULFILLED' && !!action.payload.data.token) {
    //save user data in local storage
    localUser.saveToken(state.user.token);
    localUser.saveProfile(state.user.hasProfile);
  } else if (action.type === 'USER_SAVE_EMAIL') {
    localUser.saveEmail(action.payload);
  } else if (action.type === 'USER_CREATE_PROFILE_FULFILLED') {
    //save profile completion in local storage
    localUser.saveProfile(true);
  }

  return result;
};

export default signInMW;
