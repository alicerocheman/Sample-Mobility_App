import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as menuActions from 'components/Menu/actions';
import colors from 'constants/colors';
import { getContext, getType, getTitle } from './utils';
import './style.css';

import {
  DeleteButton,
  HelpButton,
  MenuButton,
  ReturnButton
} from './components';

const Header = ({ actions, history, match, menu, user, notifications_nb }) => {
  const type = getType(user.isSignedIn && user.hasProfile, match);
  const styles = {
    textButton: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    },
    iconButton: {
      boxSizing: 'content-box',
      height: '30px',
      width: '30px'
    },
    navIcon: {
      color: type === 'contextual' ? colors.black : colors.white,
      height: '30px',
      width: '30px'
    },
    badge: {
      color: colors.black,
      background: colors.white
    }
  };

  // if (!intercom.isOpen && intercom.unread > 0) {
  //   helpButton = (
  //     <Badge badgeContent={4} style={styles.badge}>
  //       {helpButton}
  //     </Badge>
  //   );
  // }

  let leftElement;
  let centerElement = (
    <h1 className={`header-title`}>{getTitle(match, user)}</h1>
  );
  let rightElements = [<HelpButton key="0" styles={styles} />];
  switch (type) {
    case 'limited':
      leftElement = null;
      break;

    case 'main':
      leftElement = <MenuButton styles={styles} />;
      break;

    case 'contextual':
      centerElement = null;
      switch (match.params.mode) {
        case 'edit':
          leftElement = <ReturnButton type="close" styles={styles} />;
          rightElements.push(
            <DeleteButton
              key="1"
              styles={styles}
              context={getContext(match)}
              id={match.params.id}
              history={history}
            />
          );
          break;

        case 'create':
        case 'solution':
        case 'public':
          leftElement = <ReturnButton type="cancel" styles={styles} />;
          break;

        default:
          break;
      }
      break;

    default:
  }

  return (
    <div className={`header header--${type}`}>
      {leftElement}
      {centerElement}
      <div className="flex-row-reverse">{rightElements}</div>
    </div>
  );
};

const mapStateToProps = state => ({
  menu: state.menu,
  user: state.user,
  notifications_nb: state.notifications.nbPending
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(menuActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
