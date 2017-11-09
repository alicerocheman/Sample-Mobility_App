import React from 'react';
import PropTypes from 'prop-types';
import { RaisedButton } from 'material-ui';

const ActionButtons = props => {
  const buttonElements = props.buttons.map((item, index) => (
    <RaisedButton
      key={index}
      type={item.type || 'button'}
      className={
        'button action-button ' +
        (item.hides ? 'hide ' : 'show ') +
        (item.className || '')
      }
      label={item.btnText}
      labelPosition={item.labelPostion || 'after'}
      primary={item.primary}
      secondary={item.secondary}
      icon={item.icon}
      onTouchTap={item.onTouchTap}
      disabled={item.disabled || false}
    />
  ));

  return (
    <div style={styles.container}>
      <div style={styles.row} className="center button-container">
        {buttonElements}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: '1rem'
  }
};

ActionButtons.propTypes = {
  buttons: PropTypes.arrayOf(
    PropTypes.shape({
      btnText: PropTypes.element.isRequired, //id du message i18n (btn.-------)
      primary: PropTypes.bool.isRequired,
      secondary: PropTypes.bool,
      disabled: PropTypes.bool,
      className: PropTypes.string,
      hides: PropTypes.bool,
      icon: PropTypes.element,
      onTouchTap: PropTypes.func,
      type: PropTypes.string
    })
  ).isRequired
};

export default ActionButtons;
