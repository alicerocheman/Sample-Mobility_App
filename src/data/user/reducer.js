import initialState, { initializeUser } from 'initialState';
import { getPictureUrl } from 'data/user/utils';

export default function userReducer(state = initialState.user, action) {
  switch (action.type) {
    case 'USER_SAVE_REDIRECT':
      return {
        ...state,
        redirect: action.payload
      };

    case 'USER_SAVE_EMAIL':
      return {
        ...state,
        email: action.payload
      };

    case 'USER_SIGNIN_PENDING':
      return {
        ...state,
        loading: true
      };

    case 'USER_SIGNIN_REJECTED':
      return {
        ...state,
        signInError: action.payload.response && action.payload.response.data
          ? action.payload.response.data
          : {},
        loading: false,
        awaitConfirmation:
          action.payload.response &&
            action.payload.response.data &&
            action.payload.response.data.detail === 'User inactive or deleted.'
      };

    case 'USER_SIGNIN_FULFILLED':
      return {
        ...state,
        signInError: {},
        isSignedIn: true,
        hasProfile: action.payload.data.has_profile,
        loading: false,
        token: action.payload.data.token
      };

    case 'USER_SIGNUP_PENDING':
      return {
        ...state,
        loading: true
      };

    case 'USER_SIGNUP_REJECTED':
      return {
        ...state,
        signUpError: action.payload.response.data,
        loading: false
      };

    case 'USER_SIGNUP_FULFILLED':
      return {
        ...initialState.user,
        signUpError: {},
        awaitConfirmation: true,
        loading: false,
        hasProfile: false,
        ticket: action.payload.data.ticket
      };

    case 'USER_CREATE_PROFILE_PENDING':
      return {
        ...state,
        loading: true
      };

    case 'USER_CREATE_PROFILE_REJECTED':
      return {
        ...state,
        createProfileError: action.payload.response.data,
        loading: false
      };

    case 'USER_CREATE_PROFILE_FULFILLED':
      return {
        ...state,
        createProfileError: {},
        hasProfile: true,
        loading: false
      };

    case 'USER_CHANGE_LANGUAGE_FULFILLED':
      return {
        ...state,
        language: action.payload.data.language
      };

    case 'USER_PHOTO_UPDATE_PENDING':
      return {
        ...state,
        loading: true
      };
    case 'USER_PHOTO_UPDATE_FULFILLED':
      return {
        ...state,
        loading: false
      };
    case 'USER_PHOTO_DELETE_PENDING':
      return {
        ...state
      };
    case 'USER_PHOTO_DELETE_FULFILLED':
      return {
        ...state,
        ...action.payload.data
      };
    // USER_PICTURE_UPDATE
    case 'USER_PICTURE_UPDATE_PENDING':
      return {
        ...state,
        loading: true
      };
    case 'USER_PICTURE_UPDATE_FULFILLED':
      return {
        ...state,
        loading: false,
        photo: state.photo + '?' + new Date().getTime()
      };
    case 'USER_PICTURE_DELETE_PENDING':
      return {
        ...state,
        loading: true
      };
    case 'USER_PICTURE_DELETE_FULFILLED':
      return {
        ...state,
        loading: false,
        photo: state.photo + '?' + new Date().getTime()
      };

    case 'USER_GET_PRIVATE_PENDING':
      return {
        ...state,
        profileLoaded: false,
        profileLoading: true
      };
    case 'USER_GET_PRIVATE_REJECTED':
      return {
        ...state,
        profileLoading: false
      };
    case 'USER_GET_PRIVATE_FULFILLED':
      return {
        ...state,
        ...action.payload.data,
        profileLoaded: true,
        profileLoading: false,
        photo: getPictureUrl(action.payload.data.id)
      };

    case 'USER_UPDATE_PENDING':
      return {
        ...state,
        profileLoaded: false
      };

    case 'USER_UPDATE_FULFILLED':
      return {
        ...state,
        ...action.payload.data,
        profileLoaded: true,
        photo: getPictureUrl(action.payload.data.id)
      };

    case 'USER_UPDATE_PREFERENCES_PENDING':
      return {
        ...state
      };
    case 'USER_UPDATE_PREFERENCES_FULFILLED':
      return {
        ...state,
        ...action.payload.data
      };

    case 'USER_SIGNOUT_PENDING':
    case 'USER_SIGNOUT_FULFILLED':
    case 'USER_DEACTIVATE_PENDING':
    case 'USER_DEACTIVATE_FULFILLED':
      return initializeUser();
    case 'NOTIFICATIONS_SUBSCRIBE_FULFILLED':
      return {
        ...state,
        registration_ids: [
          ...state.registration_ids,
          action.payload.registration_id
        ]
      };
    case 'NOTIFICATIONS_UNSUBSCRIBE_FULFILLED':
      return {
        ...state,
        registration_ids: state.registration_ids.filter(
          id => id !== action.payload.registration_id
        )
      };
    case 'ACCOUNT_DELETE_CC_FULFILLED':
      return {
        ...state,
        card: false
      };
    case 'ACCOUNT_UPDATE_CC_FULFILLED':
      return {
        ...state,
        card: true
      };

    default:
      return state;
  }
}
