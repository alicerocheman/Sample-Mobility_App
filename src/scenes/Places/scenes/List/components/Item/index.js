import React from 'react';
import { Link } from 'react-router-dom';
import { object } from 'prop-types';
import { ListItem } from 'material-ui';
import { EditorModeEdit } from 'material-ui/svg-icons';
import { Marker } from 'react-leaflet';
import { Map } from 'components/Maps';
import { redCooviaPictoIcon } from 'utils/maps';

const PlaceItem = props => (
  <ListItem
    style={styles.root}
    containerElement={<Link to={`/places/edit/${props.place.id}`} />}
  >
    <Map
      style={styles.map}
      center={props.place.location}
      zoom={13}
      dragging={false}
      zoomControl={false}
      touchZoom={false}
      scrollWheelZoom={false}
      doubleClickZoom={false}
      boxZoom={false}
    >
      <Marker position={props.place.location} icon={redCooviaPictoIcon} />
    </Map>
    <div style={styles.placeLabel}>
      <span>{props.place.name}</span>
    </div>
    <EditorModeEdit style={styles.editIcon} />
  </ListItem>
);

const styles = {
  root: {
    marginBottom: '10px',
    position: 'relative'
  },
  map: {
    height: '100px',
    padding: '26px 0',
    marginBottom: '10px'
  },
  placeLabel: {
    zIndex: '1000',
    backgroundColor: 'rgba(255,255,255,0.6)',
    position: 'absolute',
    padding: '10px',
    bottom: 40,
    left: 30
  },
  editIcon: {
    zIndex: '1000',
    backgroundColor: 'rgba(255,255,255,0.6)',
    position: 'absolute',
    padding: '10px',
    top: 30,
    right: 30
  }
};

PlaceItem.propTypes = {
  place: object.isRequired
};

export default PlaceItem;
