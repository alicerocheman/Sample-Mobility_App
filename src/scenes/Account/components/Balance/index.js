import React from 'react';
import PropTypes from 'prop-types';
import { ActionEuroSymbol } from 'material-ui/svg-icons';
import { ActionButtons, SecondaryTitle } from 'components';
import colors from 'constants/colors';
import { translate } from 'utils/i18n';

class Balance extends React.Component {
  state = {
    beginning: '',
    end: ''
  };

  fillTable() {}

  render() {
    return (
      <div id="balance">
        <SecondaryTitle
          title={translate({ id: 'account.balanceTitle' })}
          icon={<ActionEuroSymbol />}
        />
        <div style={{ textAlign: 'right' }}>
          {/* {translate({ id: 'account.balanceLabel' })} :&nbsp; */}
          <span
            style={{
              color: colors.yellow,
              fontWeight: 'bold',
              fontSize: '1.4rem'
            }}
          >
            {this.props.balance || 0}&nbsp;€
          </span>
        </div>
        <div
          className={
            this.props.inProgress !== '' ||
              !this.props.startCrediting ||
              !this.props.startDebiting
              ? 'hide'
              : ''
          }
        >
          <ActionButtons
            buttons={[
              {
                btnText: translate({ id: 'btn.addMoney' }),
                primary: true,
                secondary: false,
                onTouchTap: this.props.startCrediting
              },
              {
                btnText: translate({ id: 'btn.withdrawMoney' }),
                primary: false,
                secondary: true,
                disabled: this.props.balance <= 0,
                onTouchTap: this.props.startDebiting
              }
            ]}
          />
        </div>
      </div>
    );
  }
}

Balance.propTypes = {
  balance: PropTypes.string.isRequired,
  inProgress: PropTypes.string.isRequired,
  startCrediting: PropTypes.func,
  startDebiting: PropTypes.func
};

export default Balance;
