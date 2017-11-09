import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { MovesList, Move } from './scenes';

const Moves = props => {
  return (
    <Switch>
      <Route exact path="/moves" component={MovesList} {...props} />
      <Route exact path="/moves/:mode/:id/:solution_hash?" component={Move} />
    </Switch>
  );
};

export default Moves;
