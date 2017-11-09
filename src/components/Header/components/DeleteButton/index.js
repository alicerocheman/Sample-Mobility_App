import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { placesDeleteOne } from 'data/places/actions';
import { tripsDeleteOne } from 'data/trips/actions';
import { moveDeleteOne } from 'data/move/actions';
import { vehiclesDeleteOne } from 'data/vehicles/actions';
import IconButton from 'material-ui/IconButton';
import { ActionDelete } from 'material-ui/svg-icons';
import { translate } from 'utils/i18n';

const DeleteButton = ({ actions, context, history, id, styles }) => {
  const {
    placesDeleteOne,
    vehiclesDeleteOne,
    tripsDeleteOne,
    moveDeleteOne
  } = actions;

  let handleDelete = event => {
    event.preventDefault();
    switch (context) {
      case 'places':
        placesDeleteOne(id).then(() => {
          history.push('/places');
        });
        break;

      case 'vehicles':
        vehiclesDeleteOne(id).then(() => {
          history.push('/vehicles');
        });
        break;

      case 'trips':
        tripsDeleteOne(id).then(() => {
          history.push('/trips');
        });
        break;

      case 'moves':
        moveDeleteOne(id).then(() => {
          history.push('/moves');
        });
        break;

      default:
        event.preventDefault();
    }
  };
  return (
    <IconButton
      // onTouchTap={toggleIntercom}
      tooltip={translate({ id: 'btn.delete' })}
      tooltipPosition="bottom-left"
      style={styles.iconButton}
      iconStyle={styles.navIcon}
      key="0"
    >
      <ActionDelete onTouchTap={handleDelete} />
    </IconButton>
  );
};

const allActions = {
  moveDeleteOne,
  placesDeleteOne,
  tripsDeleteOne,
  vehiclesDeleteOne
};
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(allActions, dispatch)
});

export default connect(null, mapDispatchToProps)(DeleteButton);
