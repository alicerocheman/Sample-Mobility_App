import React, { Component } from 'react';

import { INTERCOM_APP_ID } from 'constants/env';

export const intercomFactory = {
  boot: () => window.Intercom('boot', window.intercomSettings),
  initialize: () => {
    const w = window;
    const ic = w.Intercom;
    if (typeof ic === 'function') {
      ic('reattach_activator');
      ic('update', w.intercomSettings);
    } else {
      const d = document;
      const i = function() {
        i.c(arguments);
      };
      i.q = [];
      i.c = function(args) {
        i.q.push(args);
      };
      w.Intercom = i;
      function l() {
        const s = d.createElement('script');
        s.type = 'text/javascript';
        s.async = true;
        s.src = 'https://widget.intercom.io/widget/' + INTERCOM_APP_ID;
        const x = d.getElementsByTagName('script')[0];
        x.parentNode.insertBefore(s, x);
      }
      if (w.attachEvent) {
        w.attachEvent('onload', l);
      } else {
        w.addEventListener('load', l, false);
      }
    }
  },
  set: user => {
    const w = window;
    w.intercomSettings = {
      app_id: INTERCOM_APP_ID,
      hide_default_launcher: true,
      language_override: user.language
    };
    if (user.isSignedIn) {
      w.intercomSettings.login_email = user.email;
      w.intercomSettings.email = user.email;
      w.intercomSettings.user_id = user.id;
      if (user.contact_emails !== '')
        w.intercomSettings.email = user.contact_emails;
      if (user.first_name !== '')
        w.intercomSettings.name = `${user.first_name} ${user.last_name}`;
      if (user.phone !== '') w.intercomSettings.phone = user.phone;
    }
  },
  shutdown: () => window.Intercom('shutdown'),
  update: () => window.Intercom('update', window.intercomSettings)
};

class AuthenticatedIntercom extends Component {
  componentWillMount() {
    intercomFactory.set(this.props.user);
    intercomFactory.update();
  }

  componentWillUnmount() {
    //EJECT
    intercomFactory.shutdown();
    intercomFactory.set(this.props.user);
    intercomFactory.boot();
  }

  componentWillReceiveProps = nextProps => {
    const { user } = this.props;
    const newUser = nextProps.user;
    if (
      user.contact_emails !== newUser.contact_emails ||
      user.first_name !== newUser.first_name ||
      user.last_name !== newUser.last_name ||
      user.language !== newUser.language
    ) {
      intercomFactory.set(newUser);
      intercomFactory.update();
    }
  };

  render() {
    return null;
  }
}

export class Intercom extends Component {
  componentWillMount = () => {
    intercomFactory.set(this.props.user);
    intercomFactory.initialize();
    window.Intercom('onShow', this.props.onShow);
    window.Intercom('onHide', this.props.onHide);
    window.Intercom('onUnreadCountChange', this.props.onUnreadCountChange);
    intercomFactory.boot();
  };

  render() {
    return this.props.user.isSignedIn
      ? <AuthenticatedIntercom user={this.props.user} />
      : null;
  }
}
