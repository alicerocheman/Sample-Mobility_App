import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Trip } from '../../components';

class TripEdit extends Component {
  render() {
    const trip = this.props.trip;

    return (
      <div className="page">
        <div className="main-container">
          <div className="main-content">
            <Trip trip={trip} />
          </div>
        </div>
      </div>
    );
  }
}

TripEdit.propTypes = {
  trip: PropTypes.object.isRequired
};

export default TripEdit;
