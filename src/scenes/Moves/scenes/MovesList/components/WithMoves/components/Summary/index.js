import React from 'react';
import { array } from 'prop-types';
import {
  ImageTimer,
  ContentReport,
  ActionDoneAll
} from 'material-ui/svg-icons';
import { translate } from 'utils/i18n';
import { SecondaryTitle } from 'components';
import { Move } from '..';

const Summary = props => {
  const nextMove = props.moves[0];
  const unresolvedMoves = props.moves
    .slice(1)
    .filter(move => !move.selected_solution);
  const resolvedMoves = props.moves
    .slice(1)
    .filter(move => move.selected_solution);
  return (
    <div>
      <SecondaryTitle
        icon={<ImageTimer />}
        title={translate({ id: 'moves.nextDeparture' })}
      />
      <Move move={nextMove} displayDate={true} />
      {unresolvedMoves.length > 0 &&
        <div>
          <SecondaryTitle
            icon={<ContentReport />}
            title={translate({ id: 'moves.unresolvedMoves' })}
          />
          {unresolvedMoves.map((move, index) =>
            <Move key={index} move={move} displayDate={true} />
          )}
        </div>}
      {resolvedMoves.length > 0 &&
        <div>
          <SecondaryTitle
            icon={<ActionDoneAll />}
            title={translate({ id: 'moves.resolvedMoves' })}
          />
          {resolvedMoves.map((move, index) =>
            <Move key={index} move={move} displayDate={true} />
          )}
        </div>}
    </div>
  );
};

Summary.propTypes = {
  moves: array.isRequired
};

export default Summary;
