import React from 'react';
import PropTypes from 'prop-types';

import { translate } from 'utils/i18n';

const Page4 = props => {
  return (
    <div>
      <p>
        {translate({ id: 'demo.4.1' })}
      </p>
    </div>
  );
};

Page4.propTypes = {
  isSignedIn: PropTypes.bool.isRequired
};

export default Page4;
