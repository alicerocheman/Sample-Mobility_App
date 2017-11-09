import React from 'react';
import { bool, shape, string } from 'prop-types';
import { Link } from 'react-router-dom';
import { Paper } from 'material-ui';
import { AtoB, SearchSolutionsButton } from 'components';

import { SolutionHeader } from 'components';

const styles = {
  container: {
    marginBottom: '1rem'
  },
  link: {
    textDecoration: 'initial'
  },
  selectedSolution: {
    borderTop: '1px solid rgba(0, 0, 0, 0.1)'
  }
};

const Move = ({ displayDate, move, linkTo }) => {
  return (
    <Paper id={move.trip_id} style={styles.container}>
      <Link to={linkTo || '/moves/edit/' + move.trip_id} style={styles.link}>
        <div className="move-gradient">
          <AtoB
            places={[move.origin, move.destination]}
            time={move.time}
            isDeparture={move.starts_from_departure}
            displayDate={displayDate}
          />
        </div>
        {move.selected_solution && (
          <SolutionHeader
            style={styles.selectedSolution}
            solution={move.selected_solution}
          />
        )}
      </Link>
      {!move.selected_solution && (
        <SearchSolutionsButton move_id={move.trip_id} />
      )}
    </Paper>
  );
};

Move.propTypes = {
  move: shape({
    destination: shape({
      name: string.isRequired
    }).isRequired,
    origin: shape({
      name: string.isRequired
    }).isRequired,
    starts_from_departure: bool.isRequired,
    time: string.isRequired,
    trip_id: string.isRequired
  }).isRequired,
  displayDate: bool,
  linkTo: string
  // open: PropTypes.bool.isRequired,
  // openMove: PropTypes.func.isRequired
};

Move.defaultProps = {
  displayDate: false
};

export default Move;
