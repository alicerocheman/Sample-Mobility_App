import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import history from 'utils/history';
import { ReturnButton, BottomButtons } from 'components';
import { Page0, Page1, Page2, Page3, Page4, Page5 } from './scenes';
import { translate } from 'utils/i18n';

class Demo extends Component {
  state = {
    stepIndex: 0
  };

  navigate = step => {
    const newStepIndex = this.state.stepIndex + step;
    this.setState({ stepIndex: newStepIndex });
  };

  getBottomButtons = () => {
    const { stepIndex } = this.state;
    let buttons = [];
    const buttonBack = {
      btnText: translate({ id: 'btn.back' }),
      primary: false,
      // secondary: true,
      onTouchTap: () => {
        history.goBack();
      }
    };
    const buttonPrevious = {
      btnText: translate({ id: 'btn.previous' }),
      primary: false,
      // secondary: true,
      onTouchTap: () => {
        this.navigate(-1);
      }
    };
    const buttonNext = {
      btnText: translate({ id: 'btn.next' }),
      primary: true,
      onTouchTap: () => {
        this.navigate(1);
      }
    };
    const buttonOk = {
      btnText: translate({ id: 'btn.ok' }),
      primary: true,
      onTouchTap: () => {
        history.goBack();
      }
    };
    switch (stepIndex) {
      case 0:
        buttons = [buttonBack, buttonNext];
        break;
      case 5:
        buttons = [buttonOk];
        break;
      default:
        buttons = [buttonPrevious, buttonNext];
        break;
    }
    return buttons;
  };

  getChildComponent = stepIndex => {
    switch (stepIndex) {
      case 0:
        return <Page0 isSignedIn={this.props.isSignedIn} />;
      case 1:
        return <Page1 isSignedIn={this.props.isSignedIn} />;
      case 2:
        return <Page2 isSignedIn={this.props.isSignedIn} />;
      case 3:
        return <Page3 isSignedIn={this.props.isSignedIn} />;
      case 4:
        return <Page4 isSignedIn={this.props.isSignedIn} />;
      case 5:
        return <Page5 isSignedIn={this.props.isSignedIn} />;
      default:
        return false;
    }
  };

  render() {
    const { stepIndex } = this.state;
    return (
      <div className="page">
        <div className="main-container">
          <div className="main-content">

            <ReturnButton />
            {this.getChildComponent(stepIndex)}
          </div>
        </div>
        <BottomButtons buttons={this.getBottomButtons()} />

      </div>
    );
  }
}

Demo.propTypes = {
  isSignedIn: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  isSignedIn: state.user.isSignedIn
});

export default connect(mapStateToProps)(Demo);
