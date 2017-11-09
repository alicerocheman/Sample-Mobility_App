import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { func, object } from 'prop-types';
import { TextField, IconButton, Checkbox } from 'material-ui';
import { ActionVisibility, ActionVisibilityOff } from 'material-ui/svg-icons';
import axios from 'axios';
import { ActionButtons, ContactOptin, CapsLockWarning } from 'components';
import { translate } from 'utils/i18n';
import { emailRegex } from 'constants/regex';
import {
  docsOpenCharter,
  docsOpenTerms,
  docsOpenPrivacy
} from 'data/docs/actions';
import { validatePassword } from '../../fieldValidation';

class SignIU extends Component {
  state = {
    type: Object.keys(this.props.user.signInError).length ? 'signIn' : '',
    wrongPsw: false,
    email: {
      value: this.props.user.email || '',
      error: ''
    },
    password: {
      error:
        this.props.user.signInError &&
        this.props.user.signInError.detail === 'Invalid username/password.'
          ? translate({ id: 'form.passwordWrongError' })
          : '',
      visible: false
    },
    contact_optin: false,
    capsLockOn: false
  };

  componentWillMount() {
    if (this.state.email.value !== '') this.checkEmail(this.state.email.value);
    document.addEventListener('keydown', event => {
      event = event || window.event;
      var caps = event.getModifierState && event.getModifierState('CapsLock');
      if (this.state.capsLockOn !== caps) this.setState({ capsLockOn: caps });
    });
    document.addEventListener('keyup', event => {
      event = event || window.event;
      var caps = event.getModifierState && event.getModifierState('CapsLock');
      if (this.state.capsLockOn !== caps) this.setState({ capsLockOn: caps });
    });
  }

  resetField = event => {
    let newState = this.state;
    newState[event.target.name].error = '';
    this.setState(newState);
  };

  handleEmailInput = event => {
    this.checkEmail(event.target.value);
  };

  checkEmail = newValue => {
    if (newValue.match(emailRegex)) {
      axios
        .post('/user/isunknown/', {
          email: newValue
        })
        .then(res => {
          res.status === 200 && this.setState({ type: 'signUp' });
        })
        .catch(err => {
          if (err.response) {
            const { message } = err.response.data;
            if (message === 'email already used') {
              this.setState({ type: 'signIn' });
            } else {
              this.props.handleError(err.response);
            }
          } else {
            this.props.handleError({});
          }
        });

      let newState = {
        ...this.state,
        email: {
          ...this.state.email,
          value: newValue,
          error: ''
        }
      };
      this.setState(newState);
    } else {
      let newState = {
        ...this.state,
        email: {
          ...this.state.email,
          value: newValue,
          error: translate({ id: 'form.emailFormatError' })
        }
      };
      this.setState(newState);
    }
  };

  checkPassword = event => {
    this.setState(validatePassword(event.target.value, this.state));
  };

  togglePasswordVisibility = () => {
    let newState = {
      ...this.state,
      password: {
        ...this.state.password,
        visible: !this.state.password.visible
      }
    };
    this.setState(newState);
  };

  toggleContactOptin = (event, isInputChecked) => {
    this.setState({ contact_optin: isInputChecked });
  };

  forgotPassword = () => {
    this.props.forgotPassword(this.state.email.value);
    //TODO add alert success/failure
  };

  trySubmit = event => {
    event.preventDefault();
    if (!this.state.email.error && !this.state.password.error) {
      if (this.state.password.visible) {
        let newState = this.state;
        newState.password.visible = false;
        this.setState(newState);
      }
      if (this.state.type === 'signUp')
        this.props.signUp(event, this.state.contact_optin);
      if (this.state.type === 'signIn') this.props.signIn(event);
    }
  };

  render() {
    const { email, password, type } = this.state;
    return (
      <div>
        <form onSubmit={this.trySubmit}>
          <div>
            <TextField
              type="email"
              name="email"
              floatingLabelText={translate({ id: 'profile.emailLabel' })}
              fullWidth={true}
              onFocus={this.resetField}
              onInput={this.handleEmailInput}
              errorText={email.error}
              value={this.state.email.value}
              required
            />
            <div className="password-container">
              <TextField
                type={password.visible ? 'text' : 'password'}
                name="password"
                floatingLabelText={translate({ id: 'profile.passwordLabel' })}
                fullWidth={true}
                onFocus={this.resetField}
                onInput={this.checkPassword}
                //helperText={translate({id:"form.passwordHelper"})}
                errorText={password.error}
                required
                pattern=".{8,}"
              />
              <IconButton
                className="password-container__visibility-button"
                onClick={this.togglePasswordVisibility}
              >
                {password.visible ? (
                  <ActionVisibilityOff />
                ) : (
                  <ActionVisibility />
                )}
              </IconButton>
              <CapsLockWarning capsLockOn={this.state.capsLockOn} />
            </div>
          </div>
          <div
            className={type === 'signUp' ? 'show' : 'hide'}
            style={{
              marginTop: '1rem'
            }}
          >
            <div style={{ display: 'flex' }}>
              <Checkbox
                name="readandagree"
                style={{
                  width: 'auto'
                  // top: '0.3rem'
                }}
                required={type === 'signUp'}
              />
              <div style={styles.checkboxLabel}>
                {translate({
                  id: 'auth.complianceText',
                  button1: (
                    <span
                      className="link link--secondary"
                      onTouchTap={this.props.actions.docsOpenCharter}
                    >
                      {translate({ id: 'auth.usageCharterLabel' })}
                    </span>
                  ),
                  button2: (
                    <span
                      className="link link--secondary"
                      onTouchTap={this.props.actions.docsOpenTerms}
                    >
                      {translate({ id: 'auth.termsOfUseLabel' })}
                    </span>
                  ),
                  button3: (
                    <span
                      className="link link--secondary"
                      onTouchTap={this.props.actions.docsOpenPrivacy}
                    >
                      {translate({ id: 'auth.privacyPolicyLabel' })}
                    </span>
                  )
                })}
              </div>
            </div>
            <div>
              <ContactOptin
                checked={this.state.contact_optin}
                onCheck={this.toggleContactOptin}
              />
            </div>
          </div>
          <ActionButtons
            buttons={[
              {
                type: 'submit',
                btnText: translate({ id: 'btn.signIn' }),
                primary: true,
                secondary: false,
                hides: type === 'signUp',
                onTouchTap: this.submit
              },
              {
                btnText: translate({ id: 'btn.forgottenPassword' }),
                primary: false,
                secondary: true,
                hides: type !== 'signIn',
                onTouchTap: this.forgotPassword
              },
              {
                type: 'submit',
                btnText: translate({ id: 'btn.signUp' }),
                primary: true,
                secondary: false,
                hides: type === 'signIn',
                onTouchTap: this.submit
              }
            ]}
          />
        </form>
      </div>
    );
  }
}

const styles = {
  checkboxLabel: {
    lineHeight: '24px'
  }
};

SignIU.propTypes = {
  user: object.isRequired,
  signIn: func.isRequired,
  signUp: func.isRequired,
  forgotPassword: func.isRequired,
  handleError: func.isRequired,
  actions: object.isRequired
};

const actions = {
  docsOpenCharter,
  docsOpenTerms,
  docsOpenPrivacy
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(null, mapDispatchToProps)(SignIU);
