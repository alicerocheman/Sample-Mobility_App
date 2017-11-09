import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { userGetPrivate } from 'data/user/actions';
import { WithContext } from 'hoc';

class Profile extends Component {
  componentWillMount() {
    this.props.getPrivate();
  }

  render() {
    return null;
  }
}

class PrivateRoute extends Component {
  render() {
    const {
      component: PrivateComponent,
      userGetPrivate,
      user,
      ...rest
    } = this.props;
    return (
      <Route
        {...rest}
        render={props =>
          user.isSignedIn && user.hasProfile
            ? <div className="route-wrapper">
                <Profile getPrivate={userGetPrivate} />
                <WithContext component={PrivateComponent} {...props} />
              </div>
            : <Redirect
                to={{
                  pathname: '/auth',
                  state: { from: props.location }
                }}
              />}
      />
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  userGetPrivate: bindActionCreators(userGetPrivate, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);
