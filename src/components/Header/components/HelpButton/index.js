import React from 'react';
import { object } from 'prop-types';
import { ActionHelp } from 'material-ui/svg-icons';
import IconButton from 'material-ui/IconButton';
import { translate } from 'utils/i18n';

const HelpButton = props => {
  const { styles } = props;
  return (
    <IconButton
      className="help_button"
      // onTouchTap={toggleIntercom}
      tooltip={translate({ id: 'help.helpLabel' })}
      tooltipPosition="bottom-left"
      style={styles.iconButton}
      iconStyle={styles.navIcon}
      key="0"
    >
      {/* {intercom.isOpen ? <NavigationClose /> : <ActionHelp />} */}
      <ActionHelp />
    </IconButton>
  );
};

HelpButton.propTypes = {
  styles: object.isRequired
};

export default HelpButton;
