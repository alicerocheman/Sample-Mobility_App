import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as tripsActions from 'data/trips/actions';
import TripEdit from './scenes/Edit';
import TripsList from './scenes/List';
import { Loader } from 'components';
import { TripCreation } from 'scenes';

class Trips extends Component {
  componentWillMount = () => {
    if (!this.props.trips.tripsLoaded) {
      this.props.actions.tripsGetAll();
    }
  };

  getSelectedTripId = () => {
    return this.props.match.params.id;
  };

  getSelectedTrip = () => {
    const tripId = this.getSelectedTripId();
    return this.props.trips.tripsList.find(t => t.id === tripId);
  };

  render() {
    if (this.props.match.params.mode === 'create') {
      return <TripCreation mode={'recurrent'} />;
    }
    const { trips } = this.props;
    const selectedTrip = this.getSelectedTrip();
    if (!trips.tripsLoaded || trips.loading) return <Loader />;

    const recurrentTrips = trips.tripsList.filter(t => t.is_repeated);

    return selectedTrip ? (
      <TripEdit trip={selectedTrip} />
    ) : (
      <TripsList tripsList={recurrentTrips} />
    );
  }
}

Trips.propTypes = {
  trips: PropTypes.shape({
    errorAdd: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
    tripsList: PropTypes.array.isRequired,
    tripsLoaded: PropTypes.bool.isRequired
  }).isRequired,
  actions: PropTypes.shape({
    tripsGetAll: PropTypes.func.isRequired,
    tripsAddOne: PropTypes.func.isRequired,
    tripsUpdateOne: PropTypes.func.isRequired
  }).isRequired
};

const mapStateToProps = state => ({
  trips: state.trips,
  error: state.error
});

const allActions = { ...tripsActions };
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(allActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Trips);
