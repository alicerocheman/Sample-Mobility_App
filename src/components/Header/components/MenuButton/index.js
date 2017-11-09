import React from 'react';
import { bool, func, number, shape } from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as menuActions from 'components/Menu/actions';
import { NavigationMenu } from 'material-ui/svg-icons';
import { Menu, NotifIconButton } from 'components';
import { translate } from 'utils/i18n';

const MenuButton = props => {
  const { menu, notifications_nb, styles } = props;
  const { menuOpen, menuClose } = props.actions;
  return (
    <div>
      <NotifIconButton
        number={notifications_nb}
        onTouchTap={evt =>
          evt.preventDefault() && menu.open ? menuClose() : menuOpen()}
        tooltip={translate({ id: 'nav.menu' })}
        tooltipPosition="bottom-right"
        touch={window.innerWidth < 400}
        style={styles.iconButton}
        iconStyle={styles.navIcon}
      >
        <NavigationMenu />
      </NotifIconButton>

      <Menu />
    </div>
  );
};

MenuButton.propTypes = {
  menu: shape({
    open: bool.isRequired
  }).isRequired,
  notifications_nb: number.isRequired,
  styles: shape({}).isRequired,
  actions: shape({
    menuOpen: func.isRequired,
    menuClose: func.isRequired
  }).isRequired
};

const mapStateToProps = state => ({
  menu: state.menu,
  notifications_nb: state.notifications.nbPending
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(menuActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(MenuButton);
