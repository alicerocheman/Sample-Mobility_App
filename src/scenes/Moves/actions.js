import * as types from 'constants/actionTypes';
import * as paths from 'constants/actionPaths';
import axios from 'axios';

export const movesGetFreshMoves = params => dispatch => {
  dispatch({
    type: types.MOVES_RESET_LIST
  });
  dispatch({
    type: types.MOVES_LOAD_NEXT_MOVES,
    payload: axios.get(paths.MOVES_LOAD_NEXT_MOVES, params)
  });
};

export const movesLoadNextMoves = params => ({
  type: types.MOVES_LOAD_NEXT_MOVES,
  payload: axios.get(paths.MOVES_LOAD_NEXT_MOVES, params)
});
