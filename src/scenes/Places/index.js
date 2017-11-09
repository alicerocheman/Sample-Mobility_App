import React, { Component } from 'react';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import PropTypes, { object, bool, array, func } from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as placesActions from 'data/places/actions';
import { PlacesList, PlaceEdit } from './scenes';

class Places extends Component {
  componentWillMount() {
    this.props.actions.placesGetAll();
  }

  onPlaceChange = place => {
    const { placesAddOne } = this.props.actions;
    placesAddOne(place.place_id, place.name, place.icon).then(() => {
      this.props.history.push('/places');
    });
  };

  render() {
    const { params } = this.props.match;
    if (params.mode === 'create' || params.id) {
      return (
        <PlaceEdit
          loading={this.props.places.loading}
          onPlaceChange={this.onPlaceChange}
        />
      );
    } else {
      return (
        <PlacesList
          placesLoaded={this.props.places.placesLoaded}
          placesList={this.props.places.placesList}
        />
      );
    }
  }
}

Places.propTypes = {
  places: PropTypes.shape({
    errorAdd: object.isRequired,
    loading: bool.isRequired,
    placesList: array.isRequired,
    placesLoaded: bool.isRequired
  }).isRequired,
  actions: PropTypes.shape({
    placesGetAll: func.isRequired,
    placesAddOne: func.isRequired
  }).isRequired
};

const mapStateToProps = state => ({
  places: state.places,
  error: state.error
});

const allActions = { ...placesActions };
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(allActions, dispatch)
});

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(Places);
