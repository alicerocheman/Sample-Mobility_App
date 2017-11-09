import React from 'react';
import IconButton from 'material-ui/IconButton';
import Badge from 'material-ui/Badge';

const NotifIconButton = ({ number, ...rest }) => {
  if (number > 0) {
    return (
      <Badge
        style={styles.wrapper}
        badgeStyle={styles.badge}
        badgeContent={number}
        primary={true}
      >
        <IconButton {...rest} />
      </Badge>
    );
  } else {
    return <IconButton {...rest} />;
  }
};

const styles = {
  wrapper: {
    padding: 0
  },
  badge: {
    zIndex: 1,
    width: '20px',
    height: '20px'
  }
};

export default NotifIconButton;
