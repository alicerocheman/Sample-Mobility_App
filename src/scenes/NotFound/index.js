import React from 'react';
import { Link } from 'react-router-dom';
import { IconButton } from 'material-ui';
import { ActionHome } from 'material-ui/svg-icons';
import { translate } from 'utils/i18n';

const NotFound = () => {
  return (
    <div className="page">
      <div className="main-container">
        <div className="main-content">
          <div style={styles.subtitle}>
            {translate({ id: 'notFound.404Title' })}
          </div>
          <div>{translate({ id: 'notFound.content' })}</div>
          <Link to={'/'}>
            <IconButton>
              <ActionHome />
            </IconButton>
          </Link>
        </div>
      </div>
    </div>
  );
};

const styles = {
  subtitle: {
    margin: '1rem O',
    fontWeight: 'bold'
  }
};

export default NotFound;
