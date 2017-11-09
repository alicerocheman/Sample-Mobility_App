import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ListItem, Badge } from 'material-ui';
import { Link } from 'react-router-dom';

import { AtoB } from 'components';
import { translate } from 'utils/i18n';
import './style.css';

const styles = {
  listItem: {
    display: 'flex',
    flexDirection: 'column',
    padding: 0,
    minHeight: '100px',
    marginBottom: '1rem'
  },
  daysContainer: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    flexGrow: '1'
  }
};

class Trip extends Component {
  displayDays = week => {
    let days;
    days = week.map((active, index) => {
      return (
        <Badge
          className="badge"
          primary={false}
          secondary={active}
          badgeContent={translate({
            id: `weekday.${index}`
          })}
          key={index}
        />
      );
    });
    return (
      <div style={styles.daysContainer} className="days-container arrow-body">
        {days}
      </div>
    );
  };

  displayTime = time => {
    const hours = `0${time.hours}`.slice(-2);
    const minutes = `0${time.minutes}`.slice(-2);
    return `${hours}:${minutes}`;
  };

  displaySchedules = (schedules, index) => {
    const isReturn = schedules[0].is_return;
    return (
      <div className={`trip ${isReturn ? 'trip-return' : 'trip-go'}`}>
        <div className="time-container arrow-body">
          {schedules[index].starts_from_departure
            ? this.displayTime(schedules[index].time)
            : '...'}
        </div>
        {this.displayDays(schedules[index].week)}
        <div className="arrow-end" />
        <div className="time-container">
          {schedules[index].starts_from_departure
            ? '...'
            : this.displayTime(schedules[index].time)}
        </div>
      </div>
    );
  };

  render() {
    const { trip } = this.props;
    const { id, origin, destination, schedules, return_schedules } = trip;

    const has_return = !!return_schedules;

    return (
      <ListItem
        disabled={false}
        containerElement={<Link to={`/trips/edit/${trip.id}`} />}
        innerDivStyle={styles.listItem}
        key={id}
      >
        <AtoB places={[origin, destination]} />
        <div className="trip-data">
          {schedules.map((schedule, index) =>
            <div className="weekly-trip" key={index}>
              {schedules.length > 1 &&
                <div className="week-title">
                  {translate({ id: 'tripcreation.weekLabel' })} {index + 1}
                </div>}
              {this.displaySchedules(schedules, index)}
              {has_return ? this.displaySchedules(return_schedules, index) : ''}
            </div>
          )}
        </div>
      </ListItem>
    );
  }
}

Trip.propTypes = {
  trip: PropTypes.shape({
    id: PropTypes.string.isRequired,
    origin: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      location: PropTypes.array.isRequired
    }).isRequired,
    schedules: PropTypes.array.isRequired,
    destination: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      location: PropTypes.array.isRequired
    }).isRequired,
    return_schedules: PropTypes.array
  })
};

export default Trip;
