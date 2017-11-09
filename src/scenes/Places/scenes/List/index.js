import React from 'react';
import { Link } from 'react-router-dom';
import { bool, array } from 'prop-types';
import { List, FloatingActionButton } from 'material-ui';
import { ContentAdd } from 'material-ui/svg-icons';
import { v4 } from 'uuid';
import { Loader } from 'components';
import { PlaceItem, EmptyList } from './components';

const PlacesList = props => {
  let childComponent;
  if (props.placesLoaded) {
    if (props.placesList.length === 0) {
      childComponent = <EmptyList />;
    } else {
      childComponent = (
        <List className="main-content__no-side-padding">
          {props.placesList.map((place, index) => (
            <PlaceItem key={v4()} place={place} />
          ))}
        </List>
      );
    }
  } else {
    childComponent = <Loader />;
  }

  return (
    <div className="page">
      <div className="main-container">
        <div className="main-content">{childComponent}</div>
      </div>
      <div className="speeddial">
        <Link to="/places/create">
          <FloatingActionButton mini={true}>
            <ContentAdd className="plussign" />
          </FloatingActionButton>
        </Link>
      </div>
    </div>
  );
};

PlacesList.propTypes = {
  placesLoaded: bool.isRequired,
  placesList: array.isRequired
};

export default PlacesList;
