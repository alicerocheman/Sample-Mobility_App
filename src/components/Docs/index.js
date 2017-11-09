import React, { Component } from 'react';
import { bool, func, shape, string } from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as docsActions from 'data/docs/actions';
import { Dialog, RaisedButton } from 'material-ui';
import { translate } from 'utils/i18n';

class Docs extends Component {
  render() {
    const styles = {
      iframe: {
        maxWidth: '100%',
        border: 'none'
      }
    };
    const { content, open } = this.props.docs;
    const { docsClose } = this.props.actions;
    let text = '';
    switch (content) {
      case 'charter':
        text = (
          <iframe
            style={styles.iframe}
            title="charte"
            src="http://coovia.fr/charte/"
            sandbox
          />
        );
        break;

      case 'terms':
        text = (
          <iframe
            style={styles.iframe}
            title="cgu"
            src="http://coovia.fr/cgu/"
            sandbox
          />
        );
        break;

      case 'privacy':
        text = (
          <iframe
            style={styles.iframe}
            title="confidentialité"
            src="http://coovia.fr/confidentialite/"
            sandbox
          />
        );
        break;

      default:
        text = translate({ type: 'html', id: 'global.contentNotFound' });
        break;
    }
    const actions = [
      <RaisedButton
        label="OK"
        primary={true}
        keyboardFocused={true}
        onTouchTap={docsClose}
      />
    ];
    return (
      <Dialog
        open={open}
        actions={actions}
        modal={false}
        autoScrollBodyContent={true}
      >
        {text}
      </Dialog>
    );
  }
}

Docs.propTypes = {
  docs: shape({
    open: bool.isRequired,
    content: string.isRequired
  }).isRequired,
  actions: shape({
    docsClose: func.isRequired
  }).isRequired
};

const mapStateToProps = state => ({
  docs: state.docs
});

const allActions = {
  ...docsActions
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(allActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Docs);
