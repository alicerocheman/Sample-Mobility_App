import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { TextField, IconButton } from 'material-ui';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import ContentSave from 'material-ui/svg-icons/content/save';

import { SecondaryTitle } from 'components';

import { translate } from 'utils/i18n';

class Iban extends Component {
  componentWillMount = () => {
    this.resetState(this.props);
  };

  componentWillReceiveProps(nextProps) {
    this.resetState(nextProps);
  }

  resetState = props => {
    this.setState({
      formDirty: false,
      foreign: false,
      iban: {
        value: props.iban,
        error: ''
      },
      dom1: {
        value: ''
      },
      dom2: {
        value: ''
      }
    });
  };

  onFormFocus = () => {
    let newState = {
      ...this.state,
      formDirty: true
    };
    if (this.state.iban.value === this.props.iban) {
      newState.iban.value = '';
    }
    this.setState(newState);
  };

  onChangeIbanNumber = (event, newValue) => {
    let errorTxt;
    let foreign = false;
    if (
      newValue.match(
        '^[a-zA-Z]{2}[0-9]{2}[a-zA-Z0-9]{4}[0-9]{7}([a-zA-Z0-9]?){0,16}$'
      )
    ) {
      errorTxt = '';
      const countryCode = newValue.toUpperCase().substring(0, 2);
      if (countryCode !== 'FR' && countryCode !== 'MC') {
        foreign = true;
      }
    } else {
      errorTxt = translate({ id: 'form.ibanFormatError' });
    }
    this.setState({
      ...this.state,
      foreign: foreign,
      iban: {
        value: newValue,
        error: errorTxt
      }
    });
  };

  onChangeDomValue = (event, newValue) => {
    let newState = { ...this.state };
    newState[event.target.name].value = newValue;
    this.setState(newState);
  };

  trySubmit = event => {
    event.preventDefault();
    if (this.state.iban.value && !this.state.error) {
      this.props.saveNewIban(
        this.state.iban.value,
        this.state.dom1.value,
        this.state.dom2.value
      );
    }
  };

  render() {
    let buttonElement;
    if (this.props.iban && !this.state.formDirty) {
      buttonElement = (
        //Delete button
        <IconButton onClick={this.props.deleteIban}>
          <ActionDelete />
        </IconButton>
      );
    } else {
      buttonElement = (
        //Valid button
        <IconButton
          type="submit"
          disabled={!(this.state.iban.value && !this.state.error)}
        >
          <ContentSave />
        </IconButton>
      );
    }
    return (
      <div id="iban">
        <SecondaryTitle
          title={translate({ id: 'account.ibanTitle' })}
          iconTxt="IBAN"
        />
        <form onSubmit={this.trySubmit} className="inline-form">
          <div className="field iban-number">
            <TextField
              floatingLabelText={translate({ id: 'account.ibanLabel' })}
              floatingLabelFixed={!!this.props.iban}
              name="ibanNumber"
              hintText={this.props.iban ? this.props.iban : ''}
              fullWidth={true}
              errorText={this.state.iban.error}
              onFocus={this.onFormFocus}
              onChange={this.onChangeIbanNumber}
              type="text"
              value={this.state.iban.value}
            />
          </div>
          <div
            className={
              'field iban-dom iban-dom-1 ' +
              (this.state.formDirty && this.state.foreign ? 'show' : 'hide')
            }
          >
            <TextField
              floatingLabelText={translate({ id: 'account.ibanDom1Label' })}
              name="dom1"
              fullWidth={true}
              onChange={this.onChangeDomValue}
              type="text"
              value={this.state.dom1.value}
              required={this.state.formDirty && this.state.foreign}
            />
          </div>
          <div className="last-line iban-last-line">
            <div
              className={
                'field iban-dom iban-dom-2 ' +
                (this.state.formDirty && this.state.foreign ? 'show' : 'hide')
              }
            >
              <TextField
                floatingLabelText={translate({ id: 'account.ibanDom2Label' })}
                name="dom2"
                fullWidth={true}
                onChange={this.onChangeDomValue}
                type="text"
                value={this.state.dom2.value}
                required={this.state.formDirty && this.state.foreign}
              />
            </div>
            <div className="btn icon-btn ">{buttonElement}</div>
          </div>
        </form>
      </div>
    );
  }
}

Iban.propTypes = {
  iban: PropTypes.string.isRequired,
  saveNewIban: PropTypes.func.isRequired,
  deleteIban: PropTypes.func.isRequired
};

export default Iban;
