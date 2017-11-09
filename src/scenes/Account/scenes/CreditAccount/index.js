import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SelectField, MenuItem } from 'material-ui';
import { ActionEuroSymbol } from 'material-ui/svg-icons';
import { BottomButtons, SecondaryTitle, CreditCard } from 'components';
import { Balance } from '../../components';
import { translate } from 'utils/i18n';

class CreditAccount extends Component {
  state = {
    amount: 0
  };

  updateAmount = (event, key, value) => {
    if (value >= 0) this.setState({ amount: value });
  };

  launchTransaction = () => {
    if (this.props.creditCard !== '' && this.state.amount > 0) {
      this.props.creditAccount(this.state.amount);
      this.props.endOperation();
    }
  };

  render() {
    const {
      inProgress,
      balance,
      creditCard,
      saveNewCC,
      deleteCC,
      endOperation
    } = this.props;
    return (
      <div className="page">
        <div className="main-container">
          <div className="main-content">
            <Balance inProgress={inProgress} balance={balance} />
            <CreditCard
              creditCard={creditCard}
              saveNewCC={saveNewCC}
              deleteCC={deleteCC}
            />
            <div className={creditCard === '' ? '' : 'hide'}>

              {translate({ id: 'account.noCreditCardTxt' })}
            </div>
            <div>
              <SecondaryTitle
                title={translate({ id: 'account.amountTitle' })}
                icon={<ActionEuroSymbol />}
              />
              <SelectField
                floatingLabelText={translate({
                  id: 'account.amountCreditLabel'
                })}
                value={this.state.amount}
                onChange={this.updateAmount}
                disabled={creditCard === ''}
              >
                <MenuItem value={5} primaryText="5 €" />
                <MenuItem value={10} primaryText="10 €" />
                <MenuItem value={20} primaryText="20 €" />
                <MenuItem value={35} primaryText="35 €" />
                <MenuItem value={50} primaryText="50 €" />
              </SelectField>
            </div>
          </div>
        </div>
        <BottomButtons
          buttons={[
            {
              btnText: translate({ id: 'btn.back' }),
              primary: false,
              onTouchTap: endOperation
            },
            {
              btnText: translate({ id: 'btn.ok' }),
              primary: true,
              onTouchTap: this.launchTransaction,
              disabled: this.state.amount <= 0
            }
          ]}
        />

      </div>
    );
  }
}

CreditAccount.propTypes = {
  inProgress: PropTypes.string.isRequired,
  balance: PropTypes.string.isRequired,
  creditCard: PropTypes.string.isRequired,
  saveNewCC: PropTypes.func.isRequired,
  deleteCC: PropTypes.func.isRequired,
  creditAccount: PropTypes.func.isRequired,
  endOperation: PropTypes.func.isRequired
};

export default CreditAccount;
