import React from 'react';
import PropTypes from 'prop-types';
import { Balance, Iban, Operations } from '../../components';
import { CreditCard } from 'components';

const AccountHome = ({
  balance,
  creditCard,
  iban,
  inProgress,
  operations,
  language,
  startCrediting,
  startDebiting,
  updateCC,
  deleteCC,
  updateIban,
  deleteIban,
  getOperations
}) => {
  return (
    <div className="page">
      <div className="main-container">
        <div className="main-content">
          <Balance
            inProgress={inProgress}
            balance={balance}
            startCrediting={startCrediting}
            startDebiting={startDebiting}
          />
          <CreditCard
            creditCard={creditCard}
            saveNewCC={updateCC}
            deleteCC={deleteCC}
          />
          <Iban iban={iban} saveNewIban={updateIban} deleteIban={deleteIban} />
          <Operations
            balance={balance}
            language={language}
            getOperations={getOperations}
            operations={operations}
          />
        </div>
      </div>
    </div>
  );
};

AccountHome.propTypes = {
  creditCard: PropTypes.string.isRequired,
  iban: PropTypes.string.isRequired,
  inProgress: PropTypes.string.isRequired,
  balance: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
  updateCC: PropTypes.func.isRequired,
  deleteCC: PropTypes.func.isRequired,
  updateIban: PropTypes.func.isRequired,
  deleteIban: PropTypes.func.isRequired,
  getOperations: PropTypes.func.isRequired
};

export default AccountHome;
