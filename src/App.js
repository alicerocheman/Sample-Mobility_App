import React, { Component } from 'react';
import { func, shape } from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Route, Redirect, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import history from 'utils/history';
import * as userActions from 'data/user/actions';

import {
  Account,
  Auth,
  Community,
  Demo,
  Messages,
  Moves,
  NotFound,
  Notifications,
  Places,
  Preferences,
  Profile,
  PublicUser,
  Trips,
  Vehicles
} from 'scenes';
import { PrivateRoute, WithContext } from 'hoc';
import NotificationsFactory from 'data/notifications';
import axios from 'axios';
import { SERVICE_PROTOCOL, API_URL } from 'constants/env';
import { IntlProvider, addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import fr from 'react-intl/locale-data/fr';
import { localeData } from './utils/i18n';
import intlPolyfill from 'utils/intlPolyfill';

intlPolyfill();

addLocaleData([...en, ...fr]);
axios.defaults.baseURL = `${SERVICE_PROTOCOL}${API_URL}`;

class AuthenticationFactory extends Component {
  componentWillMount() {
    this.setRequestAuthorization(this.props.token);
  }

  setRequestAuthorization = token => {
    if (token)
      axios.defaults.headers.common['Authorization'] = 'Token ' + token;
  };

  render() {
    return null;
  }
}

class App extends Component {
  state = {
    intercom: {
      isOpen: false,
      unread: 0
    }
  };

  openIntercom = isOpen => {
    this.setState({
      intercom: { ...this.state.intercom, isOpen }
    });
  };

  onIntercomUnreadCountChange = unread => {
    this.setState({
      intercom: { ...this.state.intercom, unread }
    });
  };

  toggleIntercom = event => {
    event.preventDefault();
    this.state.intercom.isOpen
      ? window.Intercom('hide')
      : window.Intercom('show');
  };

  render() {
    const { user } = this.props;

    return (
      <IntlProvider
        locale={user.language}
        defaultLocale="en"
        key={user.language}
        messages={localeData[user.language]}
      >
        <div>
          {user.isSignedIn && <AuthenticationFactory token={user.token} />}
          {user.isSignedIn && user.registration_ids && <NotificationsFactory />}
          <ConnectedRouter history={history}>
            <Switch>
              <PrivateRoute exact path="/account" component={Account} />
              <PrivateRoute exact path="/profile" component={Profile} />
              <PrivateRoute exact path="/preferences" component={Preferences} />
              <PrivateRoute exact path="/places" component={Places} />
              <PrivateRoute
                exact
                path="/places/:mode(create)"
                component={Places}
              />
              <PrivateRoute
                exact
                path="/places/:mode(edit)/:id"
                component={Places}
              />
              <PrivateRoute exact path="/trips" component={Trips} />
              <PrivateRoute
                exact
                path="/trips/:mode(create)"
                component={Trips}
              />
              <PrivateRoute
                exact
                path="/trips/:mode(edit)/:id"
                component={Trips}
              />
              <PrivateRoute exact path="/moves" component={Moves} />
              <PrivateRoute
                exact
                path="/moves/:mode(create)"
                component={Moves}
              />
              <PrivateRoute
                exact
                path="/moves/:mode(edit|public)/:id"
                component={Moves}
              />
              <PrivateRoute
                exact
                path="/moves/:mode(solution)/:id/:solution_hash"
                component={Moves}
              />
              <PrivateRoute exact path="/vehicles" component={Vehicles} />
              <PrivateRoute
                exact
                path="/vehicles/:mode(create)"
                component={Vehicles}
              />
              <PrivateRoute
                exact
                path="/vehicles/:mode(edit)/:id"
                component={Vehicles}
              />
              <PrivateRoute
                exact
                path="/user/:user_id"
                component={PublicUser}
              />
              <PrivateRoute
                exact
                path="/messages/:penpalId?"
                component={Messages}
              />
              <PrivateRoute
                exact
                path="/notifications"
                component={Notifications}
              />
              <Route
                exact
                path="/demo"
                render={props => <WithContext component={Demo} {...props} />}
              />
              <Route
                exact
                path="/community/:label"
                render={props => (
                  <WithContext component={Community} {...props} />
                )}
              />
              <Route
                exact
                path="/auth/:key/:email"
                render={props => <WithContext component={Auth} {...props} />}
              />
              <Route
                exact
                path="/auth"
                render={props =>
                  user.isSignedIn && user.hasProfile ? (
                    <Redirect
                      to={{
                        pathname: '/',
                        state: { from: props.location }
                      }}
                    />
                  ) : (
                    <WithContext component={Auth} {...props} />
                  )}
              />
              <Redirect exact from="/" to="/moves" />
              <Route
                render={props => (
                  <WithContext component={NotFound} {...props} />
                )}
              />
            </Switch>
          </ConnectedRouter>
        </div>
      </IntlProvider>
    );
  }
}

App.propTypes = {
  user: shape({}).isRequired,
  actions: shape({
    userGetPrivate: func.isRequired
  }).isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

const allActions = {
  ...userActions
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(allActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
