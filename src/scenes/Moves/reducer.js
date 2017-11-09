//import actiontypes
//import functions
import initialState from 'initialState';

import { augmentMove } from 'data/solutions/utils';

export default function homeReducer(state = initialState.moves, action) {
  switch (action.type) {
    case 'MOVES_LOAD_NEXT_MOVES_PENDING':
      return {
        ...state,
        loading: true
      };

    case 'MOVES_LOAD_NEXT_MOVES_REJECTED':
      return {
        ...state,
        loading: false,
        loaded: true
      };

    case 'MOVES_LOAD_NEXT_MOVES_FULFILLED':
      return {
        ...state,
        loading: false,
        loaded: true,
        list: [...state.list, ...action.payload.data.map(augmentMove)]
      };

    case 'MOVE_SELECT_SOLUTION_FULFILLED':
    case 'MOVE_UNSELECT_SOLUTION_FULFILLED':
    case 'MOVE_GET_DETAILS_FULFILLED':
      const modifiedMove = augmentMove(action.payload.data);
      return {
        ...state,
        list: state.list.map(
          move => (move.trip_id === modifiedMove.trip_id ? modifiedMove : move)
        )
      };

    case 'TRIPS_DELETE_ONE_FULFILLED':
    case 'TRIPCREATION_SET_TRIP_FULFILLED':
    case 'TRIPS_UPDATE_ONE_FULFILLED':
      return {
        ...state,
        loaded: false
      };

    case 'MOVE_DELETE_ONE_FULFILLED':
      return {
        ...state,
        list: state.list.filter(m => m.trip_id !== action.payload.data.trip_id)
      };

    case 'MOVES_RESET_LIST':
      return {
        ...state,
        list: []
      };

    default:
      return state;
  }
}
