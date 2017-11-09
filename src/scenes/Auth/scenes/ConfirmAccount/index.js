import React from 'react';
import { translate } from 'utils/i18n';

const ConfirmAccount = () => {
  return (
    <div>
      <p>{translate({ id: 'auth.confirmAccount0' })}</p>
      <p>{translate({ id: 'auth.confirmAccount1' })}</p>
    </div>
  );
};

export default ConfirmAccount;
