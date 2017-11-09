import initialState from 'initialState';
//translate

export default function alertsReducer(state = initialState.alerts, action) {
  let newState = [...state];
  let newAlert = {
    message: '',
    color: 'grey',
    option: {}
  };
  switch (action.type) {
    case 'ALERTS_DELETE_DISPLAYED':
      newState.shift();
      return newState;

    //500 - SERVER ERROR
    case 'ALERTS_SERVER_ERROR':
      newAlert.message = 'alert.serverError';
      newAlert.color = 'errorRedBg';
      newState.push(newAlert);
      return newState;

    case 'ALERTS_NEW_MESSAGE':
      newAlert = { ...action.payload };
      newState.push(newAlert);
      return newState;

    default:
      return state;
  }
}
