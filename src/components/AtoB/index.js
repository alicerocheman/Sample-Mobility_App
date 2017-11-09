import React from 'react';
import { arrayOf, bool, shape, string } from 'prop-types';
import { FontIcon } from 'material-ui';
import { formatTime, formatDate, RelativeDate } from 'utils/date';

const styles = {
  container: {
    display: 'flex',
    flexBasis: '100%',
    padding: '2rem 0'
  },
  placeContainer: {
    display: 'flex',
    flexBasis: '1rem',
    flexDirection: 'column',
    flexGrow: 1,
    justifyContent: 'center'
  },
  timeElement: {
    width: '100%',
    textAlign: 'center',
    marginBottom: '.3rem'
  },
  placeElement: {
    width: '100%',
    textAlign: 'center'
  },
  placeIcon: {
    fontSize: '2rem'
  },
  arrowContainer: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 0,
    justifyContent: 'space-around'
  },
  dateContainer: {
    display: 'flex',
    fontSize: '.9rem',
    justifyContent: 'center',
    marginTop: '-.5rem',
    paddingBottom: '1rem'
  }
};

const AtoB = ({ places, time, isDeparture, displayDate }) => {
  let placeComponents = places.map((place, index) =>
    <div style={styles.placeContainer}>
      {!!time &&
        <div style={styles.timeElement}>
          {isDeparture === !index ? formatTime(new Date(time)) : '...'}
        </div>}
      <div style={styles.placeElement}>
        <FontIcon style={styles.placeIcon} className="material-icons">
          {place.icon}
        </FontIcon>
      </div>
      <div style={styles.placeElement}>{place.name}</div>
    </div>
  );

  return (
    <div>
      <div style={styles.container}>
        {placeComponents[0]}
        <div style={styles.arrowContainer}>
          <FontIcon className="material-icons">arrow_forward</FontIcon>
        </div>
        {placeComponents[1]}
      </div>
      {displayDate &&
        <div style={styles.dateContainer}>
          <RelativeDate date={formatDate(new Date(time))} />
        </div>}
    </div>
  );
};

AtoB.propTypes = {
  places: arrayOf(
    shape({
      name: string.isRequired
    })
  ).isRequired,
  time: string,
  isDeparture: bool,
  displayDate: bool
};

AtoB.defaultProps = {
  time: null,
  isDeparture: true
};

export default AtoB;
