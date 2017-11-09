import React from 'react';
import PropTypes from 'prop-types';
import history from 'utils/history';
import { FlatButton } from 'material-ui';
import { NavigationArrowBack } from 'material-ui/svg-icons';
import { translate } from 'utils/i18n';

const ReturnButton = props => {
  const handleTouchTap = props.handleTouchTap
    ? props.handleTouchTap
    : history.goBack;
  return (
    <div style={{ ...styles.container, ...props.style }}>
      <FlatButton
        label={translate({ id: 'btn.back' })}
        onTouchTap={evt => {
          evt.preventDefault();
          handleTouchTap();
        }}
        icon={<NavigationArrowBack />}
        style={{ margin: '-1rem 0 0 -1rem' }}
      />
    </div>
  );
};

const styles = {
  container: { display: 'flex' }
};

ReturnButton.propTypes = {
  handleTouchTap: PropTypes.func
};

export default ReturnButton;
