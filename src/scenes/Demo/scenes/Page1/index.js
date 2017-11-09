import React from 'react';
import PropTypes from 'prop-types';

import { translate } from 'utils/i18n';

const Page1 = props => {
  return (
    <div>
      <p>
        {props.isSignedIn
          ? translate({ id: 'demo.user.1.1' })
          : translate({ id: 'demo.prospect.1.1' })}
      </p>
    </div>
  );
};

Page1.propTypes = {
  isSignedIn: PropTypes.bool.isRequired
};

export default Page1;
