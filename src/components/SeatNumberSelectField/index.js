import React from 'react';
import PropTypes from 'prop-types';
import { SelectField, MenuItem } from 'material-ui';
import { translate } from 'utils/i18n';

const SeatNumberSelectField = props => {
  let seatItems = [];
  for (let i = 1; i < 7; i++) {
    seatItems = [
      ...seatItems,
      <MenuItem
        key={i}
        value={i}
        primaryText={translate({ id: 'vehicles.seatNumberTxt', number: i })}
      />
    ];
  }

  return (
    <SelectField
      onChange={props.handleChange}
      value={props.value}
      fullWidth={true}
      disabled={props.disabled}
    >
      {seatItems}
    </SelectField>
  );
};

SeatNumberSelectField.propTypes = {
  handleChange: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired,
  disabled: PropTypes.bool.isRequired
};

export default SeatNumberSelectField;
