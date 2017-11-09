import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { string, func, bool, shape } from 'prop-types';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import Drawer from 'material-ui/Drawer';
import ListItem from 'material-ui/List/ListItem';
import MenuItem from 'material-ui/MenuItem';
import {
  ActionFace,
  ActionPowerSettingsNew,
  NavigationArrowDropDown,
  NavigationArrowDropUp,
  NavigationMoreHoriz
} from 'material-ui/svg-icons';
import localUser from 'data/user/localUser';
import { translate } from 'utils/i18n';
import colors from 'constants/colors';

import { userSignOut } from 'data/user/actions';
import * as menuActions from './actions';
import { Icon, NotifIconButton } from 'components';
import './style.css';

class Menu extends Component {
  state = {
    accountOpen: false,
    imgErr: false
  };

  toggleAccount = action => {
    if (typeof action !== 'boolean') action = !this.state.accountOpen;
    this.setState({
      accountOpen: action
    });
  };

  onMenuClose = () => {
    //LINK BUG
    setTimeout(() => {
      this.toggleAccount(false);
      this.props.actions.menuClose();
    }, 10);
  };

  onSignOut = () => {
    const ejectUser = () =>
      delete axios.defaults.headers.common['Authorization'];
    localUser.signOut();
    this.props.actions
      .userSignOut()
      .then(ejectUser)
      .catch(err => {
        console.error('Failed to signed out', err);
        ejectUser();
      });
  };

  render() {
    const { user, menu, notifications_nb, messages_nb } = this.props;

    return (
      <div className="menu-container">
        <Drawer
          width={290}
          zIndex={3001}
          // openSecondary={true}
          open={menu.open}
          disableSwipeToOpen={true}
          docked={false}
          onRequestChange={(open, reason) => {
            open === false && this.onMenuClose();
          }}
          containerStyle={styles.drawer}
          color={colors.white}
        >
          <div>
            <div style={styles.header}>
              <div style={styles.headerChildren}>
                <img
                  src={require('img/coovia-baseline.png')}
                  title={translate({ id: 'global.coovia' })}
                  alt={translate({ id: 'global.coovia' })}
                  style={styles.headerLogo}
                />
              </div>
              <div style={styles.headerChildren}>
                <NotifIconButton
                  number={notifications_nb}
                  containerElement={<NavLink to="/notifications" />}
                  tooltip={translate({ id: 'notifications.mainTitle' })}
                  // style={styles.iconButton}
                  iconStyle={styles.icon}
                  onTouchTap={this.onMenuClose}
                >
                  <Icon name="notifications" />
                </NotifIconButton>
                <NotifIconButton
                  number={messages_nb}
                  containerElement={<NavLink to="/messages" />}
                  tooltip={translate({ id: 'messages.mainTitle' })}
                  // style={styles.iconButton}
                  iconStyle={styles.icon}
                  onTouchTap={this.onMenuClose}
                >
                  <Icon name="message" />
                </NotifIconButton>
              </div>
            </div>
            <ListItem
              style={styles.menuItem.txt}
              primaryText={`${user.first_name} ${user.last_name}`}
              leftAvatar={
                !this.state.imgErr ? (
                  <Avatar
                    onError={() => this.setState({ imgErr: true })}
                    src={user.photo}
                  />
                ) : (
                  <Avatar
                    color={colors.black}
                    backgroundColor={colors.white}
                    icon={<ActionFace />}
                  />
                )
              }
              rightIcon={
                this.state.accountOpen ? (
                  <NavigationArrowDropUp />
                ) : (
                  <NavigationArrowDropDown />
                )
              }
              onTouchTap={this.toggleAccount}
            />
            <div
              className={this.state.accountOpen ? 'show' : 'hide'}
              style={styles.subMenu}
            >
              <MenuItem
                style={styles.menuItem.txt}
                key={0}
                containerElement={<NavLink to="/profile" />}
                primaryText={translate({ id: 'profile.mainTitle' })}
                leftIcon={<Icon name="profile" style={styles.menuItem.icon} />}
                onTouchTap={this.onMenuClose}
              />
              <MenuItem
                style={styles.menuItem.txt}
                key={1}
                containerElement={<NavLink to="/account" />}
                primaryText={translate({ id: 'account.mainTitle' })}
                leftIcon={<Icon name="account" style={styles.menuItem.icon} />}
                onTouchTap={this.onMenuClose}
              />
              <MenuItem
                style={styles.signOut.txt}
                key={2}
                primaryText={translate({ id: 'auth.signOut' })}
                leftIcon={
                  <ActionPowerSettingsNew style={styles.signOut.icon} />
                }
                onTouchTap={this.onSignOut}
              />
            </div>
            <Divider />
            <div onTouchTap={this.onMenuClose}>
              <MenuItem
                style={styles.menuItem.txt}
                containerElement={<NavLink exact to="/moves" />}
                primaryText={<div>{translate({ id: 'moves.mainTitle' })}</div>}
                leftIcon={<Icon name="move" style={styles.menuItem.icon} />}
              />

              <MenuItem
                style={styles.menuItem.txt}
                containerElement={<NavLink to="/trips" />}
                primaryText={<div>{translate({ id: 'trips.mainTitle' })}</div>}
                leftIcon={<Icon name="trip" style={styles.menuItem.icon} />}
              />

              <MenuItem
                style={styles.menuItem.txt}
                containerElement={<NavLink to="/places" />}
                primaryText={translate({ id: 'places.mainTitle' })}
                leftIcon={<Icon name="place" style={styles.menuItem.icon} />}
              />

              <MenuItem
                style={styles.menuItem.txt}
                containerElement={<NavLink to="/vehicles" />}
                primaryText={translate({ id: 'vehicles.mainTitle' })}
                leftIcon={<Icon name="vehicle" style={styles.menuItem.icon} />}
              />

              <MenuItem
                style={styles.menuItem.txt}
                containerElement={<NavLink to="/preferences" />}
                primaryText={
                  <div>{translate({ id: 'preferences.mainTitle' })}</div>
                }
                leftIcon={
                  <Icon name="preferences" style={styles.menuItem.icon} />
                }
              />
            </div>
          </div>
          <div>
            <Divider />
            <MenuItem
              style={styles.menuItem.txt}
              containerElement={<NavLink to="/about" />}
              primaryText={<div>{translate({ id: 'about.mainTitle' })}</div>}
              leftIcon={<NavigationMoreHoriz style={styles.menuItem.icon} />}
            />
          </div>
        </Drawer>
      </div>
    );
  }
}

const styles = {
  activeLink: {
    backgroundColor: 'red!important'
  },
  drawer: {
    background: colors.black,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  headerChildren: {
    margin: '1rem 1rem 0',
    display: 'flex',
    flexDirection: 'column'
  },
  headerLogo: {
    marginTop: '.4rem',
    maxWidth: '7rem'
  },
  menuItem: {
    txt: {
      color: colors.white
    },
    icon: {
      fill: colors.white
    }
  },
  signOut: {
    txt: {
      color: colors.orange400
    },
    icon: {
      fill: colors.orange400
    }
  },
  icon: {
    color: colors.white
  },
  subMenu: {
    paddingLeft: '1rem'
  }
};

Menu.propTypes = {
  user: shape({
    first_name: string.isRequired,
    last_name: string.isRequired,
    photo: string,
    profileLoaded: bool.isRequired
  }).isRequired,
  menu: shape({
    open: bool.isRequired
  }).isRequired,
  actions: shape({
    menuClose: func.isRequired,
    userSignOut: func.isRequired
  }).isRequired
};

const mapStateToProps = state => ({
  user: state.user,
  menu: state.menu,
  notifications_nb: state.notifications.nbRegularPending,
  messages_nb: state.notifications.nbMessagesPending
});

const allActions = { userSignOut, ...menuActions };

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(allActions, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Menu));
