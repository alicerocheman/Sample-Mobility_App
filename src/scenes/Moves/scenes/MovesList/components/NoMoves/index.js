import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { IconButton } from 'material-ui';
import { AvLoop, ActionHelp, NavigationMenu } from 'material-ui/svg-icons';
import { DemoButton } from 'components';
import { translate } from 'utils/i18n';

const style = {
  width: '24px',
  height: '24px',
  padding: '0px',
  transform: 'translate(0px,4px)',
  marginTop: '-4px'
};

const NoMoves = props => {
  return (
    <div>
      <div>
        {translate({
          id: 'moves.noTripWelcome',
          moves: (
            <IconButton
              containerElement={<Link to="/moves" />}
              tooltip={translate({ id: 'btn.moves' })}
              style={style}
            >
              <AvLoop />
            </IconButton>
          )
        })}
      </div>
      <p>
        {translate({
          id: 'moves.noTripHowtoTrip',
          btn: translate({ id: 'btn.createTrip' })
        })}
      </p>
      <div>
        {translate({
          id: 'moves.noTripHowtoNav',
          menu: (
            <IconButton
              onTouchTap={props.handleMenuTouchTap}
              tooltip={translate({ id: 'nav.menu' })}
              style={style}
            >
              <NavigationMenu />
            </IconButton>
          ),
          help: (
            <IconButton
              onTouchTap={props.handleHelpTouchTap}
              tooltip={translate({ id: 'help.helpLabel' })}
              style={style}
            >
              <ActionHelp />
            </IconButton>
          )
        })}
      </div>
      <p>{translate({ id: 'moves.noTripHowtoDemo' })}</p>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <DemoButton />
      </div>
    </div>
  );
};

NoMoves.propTypes = {
  handleMenuTouchTap: PropTypes.func.isRequired,
  handleHelpTouchTap: PropTypes.func.isRequired
};

export default NoMoves;
