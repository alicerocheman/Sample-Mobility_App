import initialState from 'initialState';

export default function userReducer(state = initialState.docs, action) {
  switch (action.type) {
    case 'DOCS_OPEN_CHARTER':
      return {
        ...state,
        open: true,
        content: 'charter'
      };

    case 'DOCS_OPEN_TERMS':
      return {
        ...state,
        open: true,
        content: 'terms'
      };

    case 'DOCS_OPEN_PRIVACY':
      return {
        ...state,
        open: true,
        content: 'privacy'
      };

    case 'DOCS_CLOSE':
      return {
        ...state,
        open: false,
        content: ''
      };
    //DEFAULT
    default:
      return state;
  }
}
