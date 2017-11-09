import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextField } from 'material-ui';
import { ActionEuroSymbol } from 'material-ui/svg-icons';
import { BottomButtons, SecondaryTitle } from 'components';
import { Balance, Iban } from '../../components';
import { translate } from 'utils/i18n';

class DebitAccount extends Component {
  state = {
    amount: this.props.balance > 200 ? 200 : this.props.balance
  };

  launchTransaction = () => {
    this.props.debitAccount();
    this.props.endOperation();
  };

  render() {
    const {
      balance,
      iban,
      inProgress,
      saveNewIban,
      deleteIban,
      endOperation
    } = this.props;
    return (
      <div className="page">
        <div className="main-container">
          <div className="main-content">
            <Balance inProgress={inProgress} balance={balance} />
            <Iban
              iban={iban}
              saveNewIban={saveNewIban}
              deleteIban={deleteIban}
            />
            <div className={iban === '' ? '' : 'hide'}>
              {translate({ id: 'account.noIbanTxt' })}
            </div>
            <div>
              <SecondaryTitle
                title={translate({ id: 'account.amountTitle' })}
                icon={<ActionEuroSymbol />}
              />
              <TextField
                floatingLabelText={translate({
                  id: 'account.amountDebitLabel'
                })}
                floatingLabelFixed={true}
                value={this.state.amount}
                disabled={true}
              />
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
              disabled: this.props.iban === '' || this.state.amount <= 0
            }
          ]}
        />
      </div>
    );
  }
}

DebitAccount.propTypes = {
  balance: PropTypes.string.isRequired,
  iban: PropTypes.string.isRequired,
  inProgress: PropTypes.string.isRequired,
  saveNewIban: PropTypes.func.isRequired,
  debitAccount: PropTypes.func.isRequired,
  endOperation: PropTypes.func.isRequired
};

export default DebitAccount;
