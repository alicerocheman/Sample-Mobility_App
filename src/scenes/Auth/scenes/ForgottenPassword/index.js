import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextField, IconButton } from 'material-ui';
import { ActionVisibility, ActionVisibilityOff } from 'material-ui/svg-icons';
import { ActionButtons, CapsLockWarning } from 'components';
import { translate } from 'utils/i18n';
import { validatePassword } from '../../fieldValidation';

class ForgottenPassword extends Component {
  state = {
    password: {
      value: '',
      error: '',
      visible: false,
      capsLockOn: false
    }
  };

  componentWillMount = () => {
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
  };

  checkPassword = (event, newValue) => {
    this.setState(validatePassword(newValue, this.state));
  };

  trySubmit = event => {
    event.preventDefault();
    if (this.state.password.value && !this.state.password.error) {
      this.setState({
        password: {
          ...this.state.password,
          visible: false
        }
      });
      const password = this.state.password.value;
      const key = this.props.securityKey;
      const email = this.props.email;
      this.props.updatePassword(password, key, email);
    }
  };

  togglePasswordVisibility = () => {
    this.setState({
      password: {
        ...this.state.password,
        visible: !this.state.password.visible
      }
    });
  };

  render() {
    const { password } = this.state;
    return (
      <div>
        <div>
          <p>{translate({ id: 'forgottenPassword.introTxt' })}</p>
        </div>

        <form onSubmit={this.trySubmit}>
          <div className="password-container">
            <TextField
              type={password.visible ? 'text' : 'password'}
              name="password"
              floatingLabelText={translate({ id: 'profile.passwordLabel' })}
              fullWidth={true}
              onChange={this.checkPassword}
              value={password.value}
              //helperText={translate({id:"form.passwordHelper"})}
              errorText={password.error}
              required
              pattern=".{8,}"
            />
            <IconButton
              className="password-container__visibility-button"
              onClick={this.togglePasswordVisibility}
            >
              {password.visible
                ? <ActionVisibilityOff />
                : <ActionVisibility />}
            </IconButton>
            <CapsLockWarning capsLockOn={this.state.capsLockOn} />
          </div>
          <ActionButtons
            buttons={[
              {
                type: 'submit',
                btnText: translate({ id: 'btn.save' }),
                primary: true,
                disabled: password.error !== '' || password.value === ''
              }
            ]}
          />
        </form>
      </div>
    );
  }
}

ForgottenPassword.propTypes = {
  securityKey: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired
};

export default ForgottenPassword;
