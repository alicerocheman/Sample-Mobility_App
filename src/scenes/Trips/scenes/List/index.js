import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'material-ui';
import { Link } from 'react-router-dom';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import { ContentAdd } from 'material-ui/svg-icons';
import { Trip, TripsEmptyList } from '../../components';

const scheduleTime = schedule =>
  schedule.week.indexOf(true) * 1440 +
  schedule.time.hours * 60 +
  schedule.time.minutes;

const tripsSort = (tripA, tripB) => {
  const scheduleA = tripA.schedules[0];
  const scheduleB = tripB.schedules[0];
  return scheduleTime(scheduleA) - scheduleTime(scheduleB);
};

const TripsList = props => {
  const { tripsList } = props;

  return (
    <div className="page">
      <div className="main-container">
        <div className="main-content">
          <List>
            {tripsList.length ? (
              tripsList
                .sort(tripsSort)
                .map((trip, index) => <Trip key={index} trip={trip} />)
            ) : (
              <TripsEmptyList type="recurrent" />
            )}
          </List>
        </div>
      </div>
      <div className="speeddial">
        <Link to="/trips/create">
          <FloatingActionButton mini={true}>
            <ContentAdd className="plussign" />
          </FloatingActionButton>
        </Link>
      </div>
    </div>
  );
};

TripsList.propTypes = {
  tripsList: PropTypes.array.isRequired
};

export default TripsList;
