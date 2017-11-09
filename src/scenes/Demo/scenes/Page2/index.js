import React from 'react';
import PropTypes from 'prop-types';

import { translate } from 'utils/i18n';

const Page2 = props => {
  return (
    <div>
      <p>
        {translate({ id: 'demo.2.1' })}
      </p>
      <p>
        {translate({ id: 'demo.2.2' })}
      </p>
      <p>
        {translate({ id: 'demo.2.3' })}
      </p>
    </div>
  );
};

Page2.propTypes = {
  isSignedIn: PropTypes.bool.isRequired
};

export default Page2;
