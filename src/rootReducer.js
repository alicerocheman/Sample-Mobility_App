import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import { reducer as form } from 'redux-form';

import docs from 'data/docs/reducer';
import places from 'data/places/reducer';
import user from 'data/user/reducer';
import vehicles from 'data/vehicles/reducer';
import communities from 'data/communities/reducer';
import alerts from 'components/Alerts/reducer';
import menu from 'components/Menu/reducer';
import moves from 'scenes/Moves/reducer';
import move from 'data/move/reducer';
import account from 'scenes/Account/reducer';
import messages from 'scenes/Messages/reducer';
import notifications from 'data/notifications/reducer';
import preferences from 'scenes/Preferences/reducer';
import trips from 'data/trips/reducer';
import tripCreation from 'scenes/TripCreation/reducer';

const appReducer = combineReducers({
  account,
  alerts,
  communities,
  docs,
  menu,
  messages,
  preferences,
  moves,
  move,
  notifications,
  places,
  trips,
  tripCreation,
  user,
  vehicles,
  router,
  form
});

const rootReducer = (state, action) => {
  if (
    action.type === 'USER_SIGNOUT_PENDING' ||
    (action.type.indexOf('_REJECTED') >= 0 &&
      action.payload.response &&
      action.payload.response.data.detail === 'Invalid token.')
  ) {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
