import React from 'react';
import PropTypes from 'prop-types';
import { AlertWarning } from 'material-ui/svg-icons';
import colors from 'constants/colors';
import { translate } from 'utils/i18n';

const CapsLockWarning = props => {
  return props.capsLockOn
    ? <span
        style={{
          display: 'flex',
          alignItems: 'center',
          textTransform: 'uppercase',
          fontSize: '.8rem',
          color: colors.errorRed
        }}
      >
        <AlertWarning
          color={colors.errorRed}
          style={{ marginRight: '.5rem', width: '20px' }}
        />
        {translate({ id: 'global.capsLockOn' })}
      </span>
    : <span />;
};

CapsLockWarning.propTypes = {
  capsLockOn: PropTypes.bool.isRequired
};

export default CapsLockWarning;
