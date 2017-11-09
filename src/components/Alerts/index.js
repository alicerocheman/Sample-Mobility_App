import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Snackbar } from 'material-ui';
import { translate } from 'utils/i18n';
import colors from 'constants/colors';

class Alerts extends Component {
  handleClose = reason => {
    this.props.alertsDeleteDisplayed();
  };

  handleActionTouchTap = () => {
    if (this.props.alerts.length && this.props.alerts[0].option) {
      console.log('snackbar action');
      console.log(this.props.alerts[0].option.label);
      console.log(this.props.alerts[0].option.result);
      //TODO handle function call
      //TODO Snackbar "action" attribute add condition if function found
    }
  };

  render() {
    const { alerts } = this.props;
    return (
      <div id="alerts">
        <Snackbar
          className={alerts.length ? 'open' : 'closed'}
          open={!!alerts.length}
          message={alerts.length ? translate({ id: alerts[0].message }) : ''}
          onRequestClose={this.handleClose}
          contentStyle={
            alerts.length ? { backgroundColor: colors[alerts[0].color] } : {}
          }
          bodyStyle={
            alerts.length ? { backgroundColor: colors[alerts[0].color] } : {}
          }
          autoHideDuration={3000}
          action={
            alerts.length && alerts[0].option && alerts[0].option.label
              ? translate({ id: alerts[0].option.label })
              : ''
          }
          onActionTouchTap={this.handleActionTouchTap}
        />
      </div>
    );
  }
}

Alerts.propTypes = {
  alerts: PropTypes.array.isRequired,
  alertsDeleteDisplayed: PropTypes.func.isRequired
};

export default Alerts;
