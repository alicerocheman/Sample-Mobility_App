import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextField, SelectField, MenuItem } from 'material-ui';
import { ActionCreditCard } from 'material-ui/svg-icons';
import { SecondaryTitle } from 'components';
import { translate } from 'utils/i18n';

class ControlledCreditCard extends Component {
  state = {
    formDirty: false,
    numberError: '',
    validityError: '',
    cryptoError: ''
  };

  onFormFocus = () => {
    if (!this.state.formDirty) {
      this.setState({ formDirty: true });
    }
  };

  handleChange = name => value => {
    const creditCard = {
      ...this.props.creditCard,
      [name]: value
    };
    this.props.onChange({
      ...creditCard,
      isValid: this.isCardValid(creditCard)
    });
  };

  onChangeCardType = (event, key, newValue) => {
    this.onFormFocus();
    this.handleChange('cardType')(newValue);
  };

  onChangeNumber = (event, value) => {
    let errorTxt;
    if (value.match('^([0-9]{16,16})$')) {
      errorTxt = '';
    } else {
      errorTxt = translate({ id: 'form.ccNumberFormatError' });
    }
    this.setState({
      numberError: errorTxt
    });
    this.handleChange('number')(value);
  };

  onChangeValidity = (event, value) => {
    let errorTxt;
    // eslint-disable-next-line
    if (value.match('^((0[1-9])|10|11|12)(/)([0-9]{4,4})$')) {
      const valTab = value.split('/');
      const valDate = new Date(valTab[1], valTab[0]).getTime();
      const now = new Date().getTime();
      if (valDate < now) {
        errorTxt = translate({ id: 'form.ccEndDatePastError' });
      } else {
        errorTxt = '';
      }
    } else {
      errorTxt = translate({ id: 'form.ccEndDateFormatError' });
    }
    this.setState({
      validityError: errorTxt
    });
    this.handleChange('validity')(value);
  };

  onChangeCrypto = (event, value) => {
    let errorTxt;
    if (value.match('^([0-9]{3,3})$')) {
      errorTxt = '';
    } else {
      errorTxt = translate({ id: 'form.ccSecurityCodeFormatError' });
    }
    this.setState({
      cryptoError: errorTxt
    });
    this.handleChange('crypto')(value);
  };

  isCardValid = creditCard => {
    const { cardType, number, crypto, validity } = creditCard;
    return cardType && number && crypto && validity;
  };

  areThereAnyErrors = () => {
    const { numberError, cryptoError, validityError } = this.state;
    return Boolean(numberError && cryptoError && validityError);
  };

  isValid = () => {
    return this.isCardValid(this.props.creditCard) && !this.areThereAnyErrors();
  };

  render() {
    const { creditCard } = this.props;
    const { cardType, number, crypto, validity } = creditCard;
    const { numberError, cryptoError, validityError } = this.state;

    return (
      <div id="creditCard">
        <SecondaryTitle
          title={translate({ id: 'account.ccTitle' })}
          icon={<ActionCreditCard />}
        />
        <form onSubmit={() => false} className="inline-form">
          <div className="field cc-type">
            <SelectField
              floatingLabelText={translate({ id: 'account.ccTypeLabel' })}
              floatingLabelFixed={true}
              required
              fullWidth={true}
              value={cardType}
              onChange={this.onChangeCardType}
            >
              <MenuItem
                value={0}
                primaryText={translate({ id: 'account.ccType0' })}
              />
              <MenuItem
                value={1}
                primaryText={translate({ id: 'account.ccType1' })}
              />
              <MenuItem
                value={2}
                primaryText={translate({ id: 'account.ccType2' })}
              />
            </SelectField>
          </div>
          <div className="field cc-number">
            <TextField
              floatingLabelText={translate({ id: 'account.ccNumber' })}
              floatingLabelFixed={true}
              name="ccNumber"
              hintText={
                number ? number : translate({ id: 'form.ccNumberFormatError' })
              }
              fullWidth={true}
              errorText={numberError}
              onFocus={this.onFormFocus}
              onChange={this.onChangeNumber}
              maxLength={16}
              type="text"
              inputMode="numeric"
              value={number}
            />
          </div>
          <div className="last-line cc-last-line">
            <div className="field cc-date">
              <TextField
                floatingLabelText={translate({ id: 'account.ccEndDate' })}
                floatingLabelFixed={true}
                name="ccEndDate"
                hintText={
                  number
                    ? '**/****'
                    : translate({ id: 'form.ccEndDateFormatError' })
                }
                fullWidth={true}
                errorText={validityError}
                onFocus={this.onFormFocus}
                onChange={this.onChangeValidity}
                maxLength={7}
                type="text"
                value={validity}
              />
            </div>
            <div className="field cc-code">
              <TextField
                floatingLabelText={translate({ id: 'account.ccSecurityCode' })}
                floatingLabelFixed={true}
                name="ccCode"
                hintText={
                  number
                    ? '***'
                    : translate({ id: 'form.ccSecurityCodeFormatError' })
                }
                fullWidth={true}
                errorText={cryptoError}
                onFocus={this.onFormFocus}
                onChange={this.onChangeCrypto}
                pattern="[0-9]{3,3}"
                maxLength={3}
                type="text"
                inputMode="numeric"
                value={crypto}
              />
            </div>
          </div>
        </form>
      </div>
    );
  }
}

ControlledCreditCard.propTypes = {
  creditCard: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
};

export default ControlledCreditCard;
