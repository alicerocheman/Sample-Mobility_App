import { createStore, compose, applyMiddleware } from 'redux';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import multi from 'redux-multi';
import signInMW from 'middlewares/signInMW';
import alertsMW from 'middlewares/alertsMW';
import { webSocketMiddleware } from 'middlewares/WebSocket';
import { routerMiddleware } from 'react-router-redux';
import history from './utils/history';
import rootReducer from 'rootReducer';
// import initialState from './initialState';

function configureStoreProd(initialState) {
  const middlewares = [
    thunk,
    // Add other middleware on this line...
    promise(),
    webSocketMiddleware(),
    routerMiddleware(history),
    multi,
    alertsMW,
    signInMW
    // thunk middleware can also accept an extra argument to be passed to each thunk action
    // https://github.com/gaearon/redux-thunk#injecting-a-custom-argument
  ];

  return createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(...middlewares))
  );
}

function configureStoreDev(initialState) {
  const middlewares = [
    // Add other middleware on this line...
    thunk,
    promise(),
    webSocketMiddleware(),
    routerMiddleware(history),
    multi,
    // logger,
    alertsMW,
    signInMW,
    // Redux middleware that spits an error on you when you try to mutate your state either inside a dispatch or between dispatches.
    reduxImmutableStateInvariant()
    // thunk middleware can also accept an extra argument to be passed to each thunk action
    // https://github.com/gaearon/redux-thunk#injecting-a-custom-argument
  ];
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // add support for Redux dev tools
  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(...middlewares))
  );
  return store;
}
const store =
  process.env.NODE_ENV === 'production'
    ? configureStoreProd()
    : configureStoreDev();

export default store;
