import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { PropTypes, bool, array, func } from "prop-types";
import * as movesActions from "../../actions";
import * as menuActions from "components/Menu/actions";
import { Loader, SpeedDial } from "components";
import { WithMoves, NoMoves } from "./components";
import { isEmpty } from "lodash/lang";

class MovesList extends Component {
  constructor(props) {
    super(props);
    this.title = null;
    this.childComponent = [];
    this.defineChildComponent(props);
  }

  componentWillMount = () => {
    if (!this.props.moves.loaded) {
      this.props.actions.movesGetFreshMoves({
        min: new Date().toISOString()
      });
    }
  };

  componentDidMount = () => {
    this.defineChildComponent(this.props);
  };

  componentWillReceiveProps = nextProps => {
    this.defineChildComponent(nextProps);
  };

  defineChildComponent = nextProps => {
    if (!nextProps.moves.loaded || nextProps.moves.loading) {
      this.childComponent = <Loader />;
    } else if (!isEmpty(nextProps.moves.list)) {
      this.childComponent = <WithMoves moves={nextProps.moves.list} />;
    } else {
      this.childComponent = (
        <NoMoves
          handleMenuTouchTap={this.onMenuTouchTap}
          handleHelpTouchTap={this.onHelpTouchTap}
        />
      );
    }
  };

  onMenuTouchTap = () => {
    if (this.props.menu.open) this.props.actions.menuClose();
    else this.props.actions.menuOpen();
  };

  onHelpTouchTap = () => {
    if (this.props.help.open) this.props.actions.helpClose();
    else this.props.actions.helpOpen();
  };

  render() {
    return (
      <div className="page">
        <div className="main-container">
          {<div className="main-content">{this.childComponent}</div>}
        </div>
        {<SpeedDial />}
      </div>
    );
  }
}

MovesList.propTypes = {
  moves: PropTypes.shape({
    loading: bool.isRequired,
    list: array.isRequired,
    loaded: bool.isRequired
  }).isRequired,
  menu: PropTypes.shape({
    open: bool.isRequired
  }).isRequired,
  vehicles: PropTypes.shape({
    vehiclesList: array.isRequired
  }).isRequired,
  actions: PropTypes.shape({
    menuOpen: func.isRequired,
    menuClose: func.isRequired,
    movesLoadNextMoves: func.isRequired
  }).isRequired
};

const mapStateToProps = state => ({
  moves: state.moves,
  menu: state.menu,
  error: state.error,
  vehicles: state.vehicles,
  user: state.user
});

const allActions = { ...movesActions, ...menuActions };
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(allActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(MovesList);
