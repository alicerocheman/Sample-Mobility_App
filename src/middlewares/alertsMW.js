//This middleware handles asynchronous success/failures
// and alerts user of results
import * as actionMessages from 'constants/actionMessages';

const alertsMW = store => next => action => {
  let result = next(action);

  if (
    action.type.indexOf('_REJECTED') >= 0 &&
    action.payload.response &&
    !action.payload.response.data
  ) {
    store.dispatch({
      type: 'ALERTS_SERVER_ERROR'
    });
  } else if (actionMessages[action.type]) {
    const color = action.type.indexOf('_FULFILLED') >= 0
      ? 'okGreenBg'
      : action.type.indexOf('_REJECTED') >= 0 ? 'errorRedBg' : 'grey';
    store.dispatch({
      type: 'ALERTS_NEW_MESSAGE',
      payload: {
        message: actionMessages[action.type],
        color: color
      }
    });
  }

  return result;
};

export default alertsMW;
