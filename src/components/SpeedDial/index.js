import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FloatingActionButton } from 'material-ui';
import { ContentAdd } from 'material-ui/svg-icons';
import { Icon } from 'components';
import { translate } from 'utils/i18n';

class CustomSpeedDial extends Component {
  state = {
    open: false
  };

  toggleDial = status => {
    this.setState({ open: status });
  };

  render() {
    return (
      <div
        className={`speeddial speeddial-${this.state.open ? 'open' : 'closed'}`}
      >
        <Link to={'/moves/create'}>
          <FloatingActionButton
            mini={true}
            className="fab fab-create fab-create-move"
          >
            <Icon name="move" />
            <span className="label">{translate({ id: 'global.move' })}</span>
          </FloatingActionButton>
        </Link>
        <Link to={'/trips/create'}>
          <FloatingActionButton
            mini={true}
            className="fab fab-create fab-create-trip"
          >
            <Icon name="trip" />
            <span className="label">{translate({ id: 'global.trip' })}</span>
          </FloatingActionButton>
        </Link>
        <Link to={'/places/create'}>
          <FloatingActionButton
            mini={true}
            className="fab fab-create fab-create-place"
          >
            <Icon name="place" />
            <span className="label">{translate({ id: 'global.place' })}</span>
          </FloatingActionButton>
        </Link>
        <Link to={'/vehicles/create'}>
          <FloatingActionButton
            mini={true}
            className="fab fab-create fab-create-vehicle"
          >
            <Icon name="vehicle" />
            <span className="label">{translate({ id: 'global.vehicle' })}</span>
          </FloatingActionButton>
        </Link>
        <FloatingActionButton
          className="fab fab-main"
          onTouchTap={() => this.toggleDial(!this.state.open)}
        >
          <ContentAdd className="plussign" />
        </FloatingActionButton>
      </div>
    );
  }
}

export default CustomSpeedDial;
