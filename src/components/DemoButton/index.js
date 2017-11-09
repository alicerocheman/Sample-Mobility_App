import React from 'react';
import { Link } from 'react-router-dom';
import { FlatButton } from 'material-ui';
import { AvPlayCircleOutline } from 'material-ui/svg-icons';
import { translate } from 'utils/i18n';

const DemoButton = props => {
  return (
    <FlatButton
      containerElement={<Link to="/demo" />}
      label={translate({ id: 'demo.demoLabel' })}
      icon={<AvPlayCircleOutline />}
      style={{ marginLeft: '-16px', marginTop: '5px' }}
    />
  );
};

export default DemoButton;
