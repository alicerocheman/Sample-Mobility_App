import React from 'react';
import PropTypes from 'prop-types';
import {
  DatePicker,
  Table,
  TableHeader,
  TableHeaderColumn,
  TableBody,
  TableRow,
  TableRowColumn
} from 'material-ui';
import { ActionReceipt } from 'material-ui/svg-icons';
import { SecondaryTitle } from 'components';
import colors from 'constants/colors';
import { translate } from 'utils/i18n';
import { FormattedDate } from 'react-intl';

const styles = {
  datesContainer: {
    display: 'flex',
    marginBottom: '1rem'
  },
  date: {
    flex: 1
  },
  table: {
    marginBottom: '1rem'
  }
};

class Operations extends React.Component {
  getEndDate = (date = new Date()) => {
    return new Date(date.setHours(23, 59, 59, 999));
  };

  getLastMonth = () => {
    let lastMonth = new Date();
    lastMonth = new Date(lastMonth.setMonth(lastMonth.getMonth() - 1));
    lastMonth = new Date(lastMonth.setHours(0, 0, 0, 0));
    return lastMonth;
  };

  state = {
    beginning: this.getLastMonth(),
    end: this.getEndDate(),
    now: this.getEndDate()
  };

  componentWillUpdate = (nextProps, nextState) => {
    if (
      //TODO corriger les conditions pour tous les cas de figure
      this.props.balance !== nextProps.balance ||
      this.state.beginning.getTime() !== nextState.beginning.getTime() ||
      this.state.end.getTime() !== nextState.end.getTime()
    ) {
      this.updateOperations(nextState);
    }
  };

  updateBeginningDate = (nullParam, date) => {
    this.setState({
      beginning: date
    });
  };

  updateEndDate = (nullParam, date) => {
    this.setState({
      end: this.getEndDate(date)
    });
  };

  updateOperations = state => {
    const beginning = state.beginning.getTime();
    let end = state.end.setHours(23, 59, 59, 999);
    this.props.getOperations(beginning, end);
  };

  render() {
    const { beginning, end, now } = this.state;
    let minBeginning = now.getTime();
    minBeginning = new Date(
      new Date(minBeginning).setFullYear(now.getFullYear() - 1)
    );
    const tableContent = this.props.operations.length
      ? this.props.operations.map((operation, index) =>
          <TableRow key={index}>
            <TableRowColumn style={{ minWidth: '200px' }}>
              <FormattedDate value={new Date(operation.date)} />
            </TableRowColumn>
            <TableRowColumn>{operation.reason}</TableRowColumn>
            <TableRowColumn>{operation.amount}</TableRowColumn>
          </TableRow>
        )
      : <TableRow>
          <TableRowColumn colSpan="3" style={{ textAlign: 'center' }}>
            {translate({ id: 'account.operationsNone' })}
          </TableRowColumn>
        </TableRow>;

    return (
      <div id="operations">
        <SecondaryTitle
          title={translate({ id: 'account.operationsTitle' })}
          icon={<ActionReceipt />}
        />
        <div>
          <div style={{ textAlign: 'right' }}>
            {translate({ id: 'account.balanceTitle' })} :&nbsp;
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
        </div>
        <div style={styles.datesContainer}>
          <div style={styles.date}>
            <DatePicker
              floatingLabelText={translate({
                id: 'account.operationsBeginning'
              })}
              floatingLabelFixed={true}
              onChange={this.updateBeginningDate}
              value={beginning}
              fullWidth={true}
              DateTimeFormat={Intl.DateTimeFormat}
              locale={this.props.language}
              minDate={minBeginning}
              maxDate={end}
              autoOk={true}
            />
          </div>
          <div style={styles.date}>
            <DatePicker
              floatingLabelText={translate({
                id: 'account.operationsEnd'
              })}
              floatingLabelFixed={true}
              onChange={this.updateEndDate}
              value={end}
              fullWidth={true}
              DateTimeFormat={Intl.DateTimeFormat}
              locale={this.props.language}
              minDate={beginning}
              maxDate={now}
              autoOk={true}
            />
          </div>
        </div>
        <div style={styles.table}>
          <Table selectable={false}>
            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
              <TableRow>
                <TableHeaderColumn style={{ minWidth: '200px' }}>
                  {translate({ id: 'account.operationsDate' })}
                </TableHeaderColumn>
                <TableHeaderColumn>
                  {translate({ id: 'account.operationsReason' })}
                </TableHeaderColumn>
                <TableHeaderColumn>
                  {translate({ id: 'account.operationsAmount' })}
                </TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody
              displayRowCheckbox={false}
              showRowHover={false}
              stripedRows={true}
            >
              {tableContent}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }
}

Operations.propTypes = {
  balance: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
  getOperations: PropTypes.func.isRequired,
  operations: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      reason: PropTypes.string.isRequired,
      amount: PropTypes.string.isRequired
    })
  ).isRequired
};

export default Operations;
