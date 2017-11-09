import React, { Component } from 'react';
import PropTypes, { func, bool, string, array } from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { MapsTraffic } from 'material-ui/svg-icons';
import { getPreference, preferenceUpdate } from './actions';
import { userGetPrivate, userUpdatePreference } from 'data/user/actions';
import { SecondaryTitle, ContactForm, LanguagePicker } from 'components';
import { OptionsForm } from './components';
import { translate } from 'utils/i18n';

class Preferences extends Component {
  componentWillMount = () => {
    if (!this.props.user.profileLoaded) this.props.actions.userGetPrivate();
    if (this.props.preferences.status === 'Init')
      this.props.actions.getPreference();
  };
  handleContactSubmit = args => {
    this.props.actions.userUpdatePreference(args);
  };

  updateOptionsForm = args => {
    this.props.actions.preferenceUpdate({
      community_filter: [],
      travel_mode: {
        carpool: true,
        bicycle: true,
        tc: true
      },
      no_smoking: false,
      ...args
    });
  };

  render() {
    const { travel_mode, no_smoking } = this.props.preferences;
    return (
      <div className="page">
        <div className="main-container">
          <div className="main-content">
            <SecondaryTitle
              title={translate({ id: 'preferences.optionsTitle' })}
              icon={<MapsTraffic />}
            />
            <OptionsForm
              travel_mode={travel_mode}
              no_smoking={no_smoking}
              style={styles}
              updateOptionsForm={this.updateOptionsForm}
            />
            <ContactForm handleContactSubmit={this.handleContactSubmit} />
            <LanguagePicker />
          </div>
        </div>
      </div>
    );
  }
}

const styles = {
  optionsGroupTitle: {
    marginBottom: '0.5rem'
  },
  optionsGroup: {
    display: 'flex',
    flexWrap: 'wrap',
    maxWidth: '100%',
    marginBottom: '1rem'
  },
  option: {
    display: 'flex',
    flexWrap: 'nowrap',
    marginRight: '1rem'
  }
};

Preferences.propTypes = {
  preferences: PropTypes.shape({
    travel_mode: PropTypes.shape({
      tc: bool.isRequired,
      carpool: bool.isRequired,
      bicycle: bool.isRequired
    }).isRequired,
    no_smoking: bool.isRequired
  }).isRequired,
  user: PropTypes.shape({
    email: string.isRequired,
    last_name: string.isRequired,
    first_name: string.isRequired,
    photo: string,
    contact_emails: string.isRequired,
    phone: string.isRequired,
    bio: string.isRequired,
    communities: array.isRequired,
    profileLoaded: bool.isRequired,
    contact_optin: bool.isRequired
  }).isRequired,
  actions: PropTypes.shape({
    userGetPrivate: func.isRequired,
    preferenceUpdate: func.isRequired,
    getPreference: func.isRequired
  }).isRequired
};

const mapStateToProps = state => ({
  user: state.user,
  preferences: state.preferences
});

const allActions = {
  getPreference,
  preferenceUpdate,
  userGetPrivate,
  userUpdatePreference
};
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(allActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Preferences);
