import React from 'react';
import PropTypes from 'prop-types';

import { translate } from 'utils/i18n';

const Page0 = props => {
  return (
    <div>
      <p>
        {props.isSignedIn
          ? translate({ id: 'demo.user.0.1' })
          : translate({ id: 'demo.prospect.0.1' })}
      </p>
    </div>
  );
};

Page0.propTypes = {
  isSignedIn: PropTypes.bool.isRequired
};

export default Page0;
