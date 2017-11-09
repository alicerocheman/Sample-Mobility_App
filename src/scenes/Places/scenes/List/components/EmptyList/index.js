import React from 'react';
import { translate } from 'utils/i18n';

const EmptyList = props => {
  return (
    <div>
      {translate({ id: 'places.emptyContent' })}
    </div>
  );
};

export default EmptyList;
