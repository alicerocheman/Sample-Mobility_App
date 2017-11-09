import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Toggle } from 'material-ui';
import { ActionToday } from 'material-ui/svg-icons';
import { formatDate } from 'utils/date';
import { groupBy } from 'lodash/collection';
import { Summary, Move } from './components';
import colors from 'constants/colors';

import { Calendar } from 'components';

const styles = {
  toggle: {
    container: {
      display: 'flex',
      justifyContent: 'flex-end'
    },
    label: {
      active: {
        color: colors.orange400
      },
      inactive: {
        color: colors.grey400
      }
    },
    toggle: {
      width: 'initial'
    }
  }
};

class WithMoves extends Component {
  state = {
    calendarView: false
  };

  toggleView = () => {
    this.setState({ calendarView: !this.state.calendarView });
  };

  addDayProp = move => ({ ...move, day: formatDate(new Date(move.time)) });

  render() {
    const moves = this.props.moves.map(this.addDayProp);
    let listElement = '';
    if (this.state.calendarView) {
      listElement = (
        <Calendar
          days={groupBy(moves, 'day')}
          renderOnDay={moves =>
            moves.map((move, index) => <Move move={move} />)}
        />
      );
    } else {
      listElement = <Summary moves={moves} />;
    }

    return (
      <div>
        <div style={styles.toggle.container}>
          <Toggle
            toggled={this.state.calendarView}
            onToggle={this.toggleView}
            label={
              <ActionToday
                style={
                  this.state.calendarView
                    ? styles.toggle.label.active
                    : styles.toggle.label.inactive
                }
              />
            }
            labelPosition="right"
            style={styles.toggle.toggle}
          />
        </div>
        {listElement}
      </div>
    );
  }
}

WithMoves.propTypes = {
  moves: PropTypes.array.isRequired
};

export default WithMoves;
