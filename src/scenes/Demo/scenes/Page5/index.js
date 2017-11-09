import React from 'react';
import PropTypes from 'prop-types';

import { translate } from 'utils/i18n';

const Page5 = props => {
  return (
    <div>
      <p>
        {translate({ id: 'demo.5.1' })}
      </p>
      <p>
        {translate({ id: 'demo.5.2' })}
      </p>
    </div>
  );
};

Page5.propTypes = {
  isSignedIn: PropTypes.bool.isRequired
};

export default Page5;
