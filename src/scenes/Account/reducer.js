import initialState from 'initialState';

export default function accountReducer(state = initialState.account, action) {
  switch (action.type) {
    //GET ALL ACCOUNT DATA
    // case 'ACCOUNT_GET_ALL_PENDING':
    // case 'ACCOUNT_GET_ALL_REJECTED':
    case 'ACCOUNT_GET_ALL_FULFILLED':
      return {
        ...state,
        creditCard: action.payload.data.card,
        iban: action.payload.data.iban,
        balance: action.payload.data.solde,
        loaded: true
      };
    //UPDATE CARD
    // case 'ACCOUNT_UPDATE_CC_PENDING':
    // case 'ACCOUNT_UPDATE_CC_REJECTED':
    case 'ACCOUNT_UPDATE_CC_FULFILLED':
      return {
        ...state,
        creditCard: action.payload.data.card,
        iban: action.payload.data.iban,
        balance: action.payload.data.solde,
        loaded: true
      };
    //DELETE CARD
    // case 'ACCOUNT_DELETE_CC_PENDING':
    // case 'ACCOUNT_DELETE_CC_REJECTED':
    case 'ACCOUNT_DELETE_CC_FULFILLED':
      return {
        ...state,
        creditCard: action.payload.data.card,
        iban: action.payload.data.iban,
        balance: action.payload.data.solde,
        loaded: true
      };
    //UPDATE IBAN
    // case 'ACCOUNT_UPDATE_IBAN_PENDING':
    // case 'ACCOUNT_UPDATE_IBAN_REJECTED':
    case 'ACCOUNT_UPDATE_IBAN_FULFILLED':
      return {
        ...state,
        creditCard: action.payload.data.card,
        iban: action.payload.data.iban,
        balance: action.payload.data.solde,
        loaded: true
      };
    //DELETE IBAN
    // case 'ACCOUNT_DELETE_IBAN_PENDING':
    // case 'ACCOUNT_DELETE_IBAN_REJECTED':
    case 'ACCOUNT_DELETE_IBAN_FULFILLED':
      return {
        ...state,
        creditCard: action.payload.data.card,
        iban: action.payload.data.iban,
        balance: action.payload.data.solde,
        loaded: true
      };
    //CREDIT ACCOUNT
    // case 'ACCOUNT_CREDIT_PENDING':
    // case 'ACCOUNT_CREDIT_REJECTED':
    case 'ACCOUNT_CREDIT_FULFILLED':
      return {
        ...state,
        creditCard: action.payload.data.card,
        iban: action.payload.data.iban,
        balance: action.payload.data.solde,
        loaded: true
      };
    //DEBIT ACCOUNT
    // case 'ACCOUNT_DEBIT_PENDING':
    // case 'ACCOUNT_DEBIT_REJECTED':
    case 'ACCOUNT_DEBIT_FULFILLED':
      return {
        ...state,
        creditCard: action.payload.data.card,
        iban: action.payload.data.iban,
        balance: action.payload.data.solde,
        loaded: true
      };
    //GET OPERATIONS
    // case 'ACCOUNT_GET_OPERATIONS_PENDING':
    // case 'ACCOUNT_GET_OPERATIONS_REJECTED':
    case 'ACCOUNT_GET_OPERATIONS_FULFILLED':
      return {
        ...state,
        operations: action.payload.data.operations
      };

    default:
      return state;
  }
}
