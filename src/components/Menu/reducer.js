//import functions
import initialState from 'initialState';

export default function helpReducer(state = initialState.menu, action) {
  switch (action.type) {
    case 'MENU_OPEN':
      return {
        ...state,
        open: true
      };

    case 'MENU_CLOSE':
      return {
        ...state,
        open: false
      };

    default:
      return state;
  }
}
