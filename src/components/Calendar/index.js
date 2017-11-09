import React from 'react';
import PropTypes from 'prop-types';
import { ActionToday } from 'material-ui/svg-icons';
import { RelativeDate } from 'utils/date';
import { SecondaryTitle } from 'components';

const Calendar = props => {
  return (
    <div>
      {Object.keys(props.days).map((key, index) => {
        const title = <RelativeDate date={key} />;
        let elements = [
          <SecondaryTitle key={key} icon={<ActionToday />} title={title} />,
          props.renderOnDay(props.days[key])
        ];
        return <div key={key}>{elements}</div>;
      })}
    </div>
  );
};

Calendar.propTypes = {
  days: PropTypes.object.isRequired
};

export default Calendar;
