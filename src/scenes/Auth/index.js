import React, { Component } from 'react';
import PropTypes, { func, bool, object, string } from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import { userSignOut } from 'data/user/actions';
import * as authActions from './actions';
import {
  ConfirmAccount,
  CreateProfile,
  ForgottenPassword,
  SignIU
} from './scenes';
import { LanguagePicker, Loader, DemoButton, ReturnButton } from 'components';
import { SOCKET_PROTOCOL, API_URL } from 'constants/env';
import localUser from 'data/user/localUser';

class Auth extends Component {
  state = {
    key: '',
    email: ''
  };

  resetState = () => {
    this.setState({
      key: '',
      email: ''
    });
  };

  componentWillMount() {
    this.saveRedirect();
    if (this.props.match.params.key && this.props.match.params.email) {
      this.setState({
        key: this.props.match.params.key,
        email: this.props.match.params.email
      });
    }
  }

  componentWillReceiveProps = nextProps => {
    const { user } = nextProps;
    if (user.isSignedIn && user.hasProfile) {
      this.redirect(user.redirect);
    } else if (user.awaitConfirmation && !!user.ticket) {
      //set up websocket for account confirmation
      this.startWebsocket(user.ticket);
    }
  };

  componentWillUpdate(nextProps, nextState) {
    const { user } = nextProps;
    //CHILD COMPONENT DEFINITION
    if (user.loading || (user.isSignedIn && user.hasProfile)) {
      this.childHeader = (
        <div style={styles.header}>
          <DemoButton />
          <LanguagePicker />
        </div>
      );
      this.childComponent = <Loader />;
    } else if (user.isSignedIn && !user.hasProfile) {
      this.childComponent = <CreateProfile />;
    } else if (user.awaitConfirmation) {
      this.childHeader = <ReturnButton handleTouchTap={this.onSignOut} />;
      this.childComponent = <ConfirmAccount />;
    } else if (nextState.key && nextState.email) {
      this.childHeader = <ReturnButton handleTouchTap={this.resetState} />;
      this.childComponent = (
        <ForgottenPassword
          securityKey={nextState.key}
          email={nextState.email}
          updatePassword={this.onUpdatePassword}
        />
      );
    } else {
      this.childHeader = (
        <div style={styles.header}>
          <DemoButton />
          <LanguagePicker />
        </div>
      );
      this.childComponent = (
        <SignIU
          user={user}
          signUp={this.onSignUp}
          signIn={this.onSignIn}
          forgotPassword={this.onForgotPassword}
          handleError={this.handleError}
        />
      );
    }
  }

  startWebsocket = ticket => {
    let ping_socket = new WebSocket(
      `${SOCKET_PROTOCOL}${API_URL}/user/signup-channel/${ticket}`
    );
    ping_socket.onmessage = msg => {
      const data = JSON.parse(msg.data);
      this.finishSignIn(data.payload);
    };
  };

  saveRedirect = () => {
    let url = '/';
    if (this.props.location.state && this.props.location.state.nextPathname)
      url = this.props.location.state.nextPathname;
    this.props.actions.authSaveRedirect(url);
  };

  redirect = url => {
    this.props.actions.authRedirect(url);
  };

  onSignUp = (evt, contact_optin) => {
    evt.preventDefault();
    this.props.actions.authSaveEmail(evt.target.email.value);
    this.props.actions.authSignUp(
      evt.target.email.value,
      evt.target.password.value,
      contact_optin,
      this.props.user.language
    );
  };

  onSignIn = event => {
    event.preventDefault();
    this.props.actions.authSaveEmail(event.target.email.value);
    this.props.actions.authSignIn(
      event.target.email.value,
      event.target.password.value
    );
  };

  onSignOut = () => {
    const ejectUser = () =>
      delete axios.defaults.headers.common['Authorization'];
    localUser.signOut();
    this.props.actions
      .userSignOut()
      .then(ejectUser)
      .catch(err => {
        console.error('Failed to signed out', err);
        ejectUser();
      });
  };
  finishSignIn = token => {
    this.props.actions.authFinishSignIn(token);
  };

  onForgotPassword = email => {
    this.props.actions.authForgotPassword(email);
  };

  onUpdatePassword = (password, key, email) => {
    this.props.actions.authSaveEmail(email);
    this.props.actions.authCreatePassword(password, key, email);
    this.setState({ key: '', email: '' });
  };

  handleError = response => {
    console.error(response);
  };

  render() {
    return (
      <div className="page">
        <div className="main-container">
          <div className="main-content">
            {this.childHeader}
            <div>{this.childComponent}</div>
          </div>
        </div>
      </div>
    );
  }
}

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    flex: '0 0 48px'
  }
};

Auth.propTypes = {
  user: PropTypes.shape({
    awaitConfirmation: bool.isRequired,
    createProfileError: object.isRequired,
    hasProfile: bool.isRequired,
    isSignedIn: bool.isRequired,
    loading: bool.isRequired,
    redirect: string.isRequired,
    signInError: object.isRequired,
    signUpError: object.isRequired
  }).isRequired,
  location: PropTypes.shape({
    state: PropTypes.shape({
      nextPathname: PropTypes.string
    })
  }).isRequired,
  actions: PropTypes.shape({
    authSaveRedirect: func.isRequired,
    authSaveEmail: func.isRequired,
    authRedirect: func.isRequired,
    authSignIn: func.isRequired,
    authSignUp: func.isRequired,
    authCreatePassword: func.isRequired,
    authCreateProfile: func.isRequired,
    authFinishSignIn: func.isRequired,
    authForgotPassword: func.isRequired,
    userSignOut: func.isRequired
  }).isRequired
};

const mapStateToProps = state => ({
  user: state.user,
  error: state.error
});

const actions = {
  ...authActions,
  userSignOut
};
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
