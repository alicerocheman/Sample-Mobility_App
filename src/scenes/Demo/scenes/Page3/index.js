import React from 'react';
import PropTypes from 'prop-types';

import { translate } from 'utils/i18n';

const Page3 = props => {
  return (
    <div>
      <p>
        {translate({ id: 'demo.3.1' })}
      </p>
    </div>
  );
};

Page3.propTypes = {
  isSignedIn: PropTypes.bool.isRequired
};

export default Page3;
