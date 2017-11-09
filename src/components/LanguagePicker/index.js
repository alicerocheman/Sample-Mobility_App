import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from 'data/user/actions';

import { SelectField, MenuItem } from 'material-ui';

import { translate, localeData, setUserLanguage } from 'utils/i18n';

const allActions = Object.assign({}, userActions);

class LanguagePicker extends Component {
  getListItems = () => {
    const languages = Object.keys(localeData);
    const listItems = languages.map(item =>
      <MenuItem
        key={item}
        value={item}
        primaryText={translate({ id: 'lang.' + item })}
      />
    );
    return listItems;
  };

  setLanguage = (event, index, value) => {
    this.props.actions.userSaveLanguage(value);
    setUserLanguage(value);
  };

  render() {
    const { user } = this.props;
    return (
      <div style={{ maxWidth: '120px' }}>
        <SelectField
          // floatingLabelText={translate({id:"lang.language"})}
          value={user.language}
          onChange={this.setLanguage}
          fullWidth={true}
          // listStyle={{ paddingRight: '18px' }}
          // iconStyle={{ paddingRight: 0, paddingLeft: 0, width: '18px' }}
        >
          {this.getListItems()}
        </SelectField>
      </div>
    );
  }
}

LanguagePicker.propTypes = {
  user: PropTypes.shape({
    language: PropTypes.string.isRequired
  }).isRequired,
  actions: PropTypes.shape({
    userSaveLanguage: PropTypes.func.isRequired
  }).isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(allActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(LanguagePicker);
