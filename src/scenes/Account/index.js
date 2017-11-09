import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as accountActions from './actions';
import { CreditAccount, DebitAccount, AccountHome } from './scenes';

class Account extends Component {
  state = {
    inProgress: ''
  };

  componentWillMount() {
    if (!this.props.account.loaded) {
      this.props.actions.accountGetAll();
    }
  }

  startCrediting = () => {
    this.setState({ inProgress: 'crediting' });
  };

  startDebiting = () => {
    this.setState({ inProgress: 'debiting' });
  };

  endOperation = () => {
    this.setState({ inProgress: '' });
  };

  render() {
    const { account, actions, user } = this.props;
    return this.state.inProgress === 'crediting' ? (
      <CreditAccount
        balance={account.balance}
        inProgress={this.state.inProgress}
        creditCard={account.creditCard}
        saveNewCC={actions.accountUpdateCC}
        deleteCC={actions.accountDeleteCC}
        creditAccount={actions.accountCredit}
        endOperation={this.endOperation}
      />
    ) : this.state.inProgress === 'debiting' ? (
      <DebitAccount
        iban={account.iban}
        inProgress={this.state.inProgress}
        balance={account.balance}
        saveNewIban={actions.accountUpdateIban}
        deleteIban={actions.accountDeleteIban}
        debitAccount={actions.accountDebit}
        endOperation={this.endOperation}
      />
    ) : (
      <AccountHome
        startCrediting={this.startCrediting}
        startDebiting={this.startDebiting}
        balance={account.balance}
        creditCard={account.creditCard}
        updateCC={actions.accountUpdateCC}
        deleteCC={actions.accountDeleteCC}
        iban={account.iban}
        inProgress={this.state.inProgress}
        updateIban={actions.accountUpdateIban}
        deleteIban={actions.accountDeleteIban}
        language={user.language}
        getOperations={actions.accountGetOperations}
        operations={account.operations}
      />
    );
  }
}

Account.propTypes = {
  account: PropTypes.shape({
    creditCard: PropTypes.string.isRequired,
    iban: PropTypes.string.isRequired,
    balance: PropTypes.string.isRequired,
    loaded: PropTypes.bool.isRequired
  }).isRequired,
  user: PropTypes.shape({
    language: PropTypes.string.isRequired
  }).isRequired,
  actions: PropTypes.shape({
    accountGetAll: PropTypes.func.isRequired,
    accountUpdateCC: PropTypes.func.isRequired,
    accountDeleteCC: PropTypes.func.isRequired,
    accountUpdateIban: PropTypes.func.isRequired,
    accountDeleteIban: PropTypes.func.isRequired,
    accountCredit: PropTypes.func.isRequired,
    accountDebit: PropTypes.func.isRequired,
    accountGetOperations: PropTypes.func.isRequired
  }).isRequired
};

const mapStateToProps = state => ({
  account: state.account,
  error: state.error,
  user: state.user
});

const allActions = { ...accountActions };
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(allActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Account);
