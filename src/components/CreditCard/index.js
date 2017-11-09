import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextField, SelectField, MenuItem, IconButton } from 'material-ui';
import {
  ActionCreditCard,
  ActionDelete,
  ContentSave
} from 'material-ui/svg-icons';
import { SecondaryTitle } from 'components';
import { translate } from 'utils/i18n';

class CreditCard extends Component {
  state = {
    formDirty: false,
    type: {},
    number: {},
    endDate: {},
    securityCode: {}
  };
  componentWillMount = () => {
    this.resetState(this.props);
  };

  componentWillReceiveProps(nextProps) {
    this.resetState(nextProps);
  }

  resetState = props => {
    this.setState({
      formDirty: false,
      type: {
        value: ''
      },
      number: {
        value: props.creditCard,
        error: ''
      },
      endDate: {
        value: '',
        error: ''
      },
      securityCode: {
        value: '',
        error: ''
      }
    });
  };

  onFormFocus = () => {
    let newState = {
      ...this.state,
      formDirty: true
    };
    if (this.state.number.value === this.props.creditCard) {
      newState.number.value = '';
    }
    this.setState(newState);
  };

  onChangeCardType = (event, key, newValue) => {
    this.onFormFocus();
    this.setState({
      ...this.state,
      type: {
        value: newValue
      }
    });
  };

  onChangeCardNumber = (event, newValue) => {
    let errorTxt;
    if (newValue.match('^([0-9]{16,16})$')) {
      errorTxt = '';
    } else {
      errorTxt = translate({ id: 'form.ccNumberFormatError' });
    }
    this.setState({
      ...this.state,
      number: {
        value: newValue,
        error: errorTxt
      }
    });
  };

  onChangeEndDate = (event, newValue) => {
    let errorTxt;
    // eslint-disable-next-line
    if (newValue.match('^((0[1-9])|10|11|12)(/)([0-9]{4,4})$')) {
      const valTab = newValue.split('/');
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
      ...this.state,
      endDate: {
        value: newValue,
        error: errorTxt
      }
    });
  };

  onChangeSecurityCode = (event, newValue) => {
    let errorTxt;
    if (newValue.match('^([0-9]{3,3})$')) {
      errorTxt = '';
    } else {
      errorTxt = translate({ id: 'form.ccSecurityCodeFormatError' });
    }
    this.setState({
      ...this.state,
      securityCode: {
        value: newValue,
        error: errorTxt
      }
    });
  };

  trySubmit = event => {
    event.preventDefault();
    if (this.isValid()) {
      this.props.saveNewCC(
        this.state.number.value,
        this.state.endDate.value,
        this.state.securityCode.value,
        this.state.type.value
      );
    }
  };

  isValid = () => {
    return (
      this.state.type.value &&
      this.state.number.value &&
      !this.state.number.error &&
      this.state.endDate.value &&
      !this.state.endDate.error &&
      this.state.securityCode.value &&
      !this.state.securityCode.error
    );
  };

  render() {
    const { creditCard, deleteCC } = this.props;

    return (
      <div id="creditCard">
        <SecondaryTitle
          title={translate({ id: 'account.ccTitle' })}
          icon={<ActionCreditCard />}
        />
        <form onSubmit={this.trySubmit} className="inline-form">
          <div className="field cc-type">
            <SelectField
              floatingLabelText={translate({ id: 'account.ccTypeLabel' })}
              floatingLabelFixed={true}
              required
              fullWidth={true}
              value={this.state.type.value}
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
                creditCard
                  ? creditCard
                  : translate({ id: 'form.ccNumberFormatError' })
              }
              fullWidth={true}
              errorText={this.state.number.error}
              onFocus={this.onFormFocus}
              onChange={this.onChangeCardNumber}
              maxLength={16}
              type="text"
              inputMode="numeric"
              value={this.state.number.value}
            />
          </div>
          <div className="last-line cc-last-line">
            <div className="field cc-date">
              <TextField
                floatingLabelText={translate({ id: 'account.ccEndDate' })}
                floatingLabelFixed={true}
                name="ccEndDate"
                hintText={
                  creditCard
                    ? '**/****'
                    : translate({ id: 'form.ccEndDateFormatError' })
                }
                fullWidth={true}
                errorText={this.state.endDate.error}
                onFocus={this.onFormFocus}
                onChange={this.onChangeEndDate}
                maxLength={7}
                type="text"
                value={this.state.endDate.value}
              />
            </div>

            <div className="field cc-code">
              <TextField
                floatingLabelText={translate({ id: 'account.ccSecurityCode' })}
                floatingLabelFixed={true}
                name="ccCode"
                hintText={
                  creditCard
                    ? '***'
                    : translate({ id: 'form.ccSecurityCodeFormatError' })
                }
                fullWidth={true}
                errorText={this.state.securityCode.error}
                onFocus={this.onFormFocus}
                onChange={this.onChangeSecurityCode}
                pattern="[0-9]{3,3}"
                maxLength={3}
                type="text"
                inputMode="numeric"
                value={this.state.securityCode.value}
              />
            </div>
            <div className="btn icon-btn">
              {creditCard && !this.state.formDirty
                ? <IconButton onClick={deleteCC}>
                    <ActionDelete />
                  </IconButton>
                : <IconButton type="submit" disabled={!this.isValid()}>
                    <ContentSave />
                  </IconButton>}
            </div>
          </div>
        </form>
      </div>
    );
  }
}

CreditCard.propTypes = {
  creditCard: PropTypes.string.isRequired,
  saveNewCC: PropTypes.func.isRequired,
  deleteCC: PropTypes.func.isRequired
};

export default CreditCard;
