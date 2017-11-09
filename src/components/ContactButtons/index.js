import React from 'react';
import { func, bool } from 'prop-types';
import { ActionButtons } from 'components';
import { translate } from 'utils/i18n';

const ContactButtons = props => (
  <ActionButtons
    buttons={[
      {
        type: 'submit',
        btnText: translate({ id: 'btn.save' }),
        primary: true,
        disabled: props.disabled
      },
      {
        btnText: translate({ id: 'btn.cancel' }),
        primary: false,
        onTouchTap: props.reset
      }
    ]}
  />
);

ContactButtons.propTypes = {
  disabled: bool.isRequired,
  reset: func.isRequired
};

export default ContactButtons;
