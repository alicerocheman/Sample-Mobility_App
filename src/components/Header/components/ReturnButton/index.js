import React from 'react';
import { func, object, string } from 'prop-types';
import history from 'utils/history';
import { FlatButton } from 'material-ui';
import { NavigationArrowBack, NavigationClose } from 'material-ui/svg-icons';
import { translate } from 'utils/i18n';

const ReturnButton = props => {
  const handleTouchTap = props.handleTouchTap
    ? props.handleTouchTap
    : history.goBack;
  let icon, text;
  switch (props.type) {
    case 'close':
      icon = <NavigationClose />;
      text = translate({ id: 'btn.close' });
      break;
    case 'cancel':
      icon = <NavigationClose />;
      text = translate({ id: 'btn.cancel' });
      break;

    default:
      icon = <NavigationArrowBack />;
      text = translate({ id: 'btn.back' });
      break;
  }

  return (
    <FlatButton
      icon={icon}
      label={text}
      onTouchTap={() => {
        //LINK BUG
        setTimeout(() => {
          handleTouchTap();
        }, 10);
      }}
      style={props.styles.textButton}
    />
  );
};

ReturnButton.propTypes = {
  type: string.isRequired,
  handleTouchTap: func,
  styles: object.isRequired
};

export default ReturnButton;
