import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { RaisedButton } from 'material-ui';

const BottomButtons = props => {
  const buttonElements = props.buttons.map((item, index) => (
    <RaisedButton
      key={index}
      className={'show button buttons-x' + props.buttons.length}
      label={item.btnText}
      labelPosition={(index === 1 && 'before') || 'after'}
      primary={item.primary}
      secondary={item.secondary ? item.secondary : false}
      icon={item.icon}
      onTouchTap={item.onTouchTap || null}
      containerElement={item.containerElement}
      type={item.type || 'button'}
      disabled={item.disabled}
    />
  ));

  return (
    <div className={'button-container bottom-button-container'}>
      {buttonElements}
    </div>
  );
};

BottomButtons.propTypes = {
  buttons: PropTypes.arrayOf(
    PropTypes.shape({
      btnText: PropTypes.element.isRequired, //id du message i18n (btn.-------)
      primary: PropTypes.bool.isRequired,
      secondary: PropTypes.bool,
      icon: PropTypes.element,
      onTouchTap: PropTypes.func,
      containerElement: PropTypes.element,
      type: PropTypes.string,
      disabled: PropTypes.bool
    })
  ).isRequired
};

export default BottomButtons;
