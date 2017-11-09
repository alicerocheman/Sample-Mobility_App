import * as types from 'constants/actionTypes';
import * as paths from 'constants/actionPaths';
import axios from 'axios';

export const accountGetAll = () => ({
  type: types.ACCOUNT_GET_ALL,
  payload: axios.get(paths.ACCOUNT_GET_ALL)
});

export const accountUpdateCC = (number, validity, crypto, cardType) => ({
  type: types.ACCOUNT_UPDATE_CC,
  payload: axios.post(paths.ACCOUNT_UPDATE_CC, {
    number,
    crypto,
    validity,
    cardType
  })
});

export const accountDeleteCC = () => ({
  type: types.ACCOUNT_DELETE_CC,
  payload: axios.delete(paths.ACCOUNT_DELETE_CC)
});

export const accountUpdateIban = (iban, dom1, dom2) => ({
  type: types.ACCOUNT_UPDATE_IBAN,
  payload: axios.post(paths.ACCOUNT_UPDATE_IBAN, {
    iban,
    dom1,
    dom2
  })
});

export const accountDeleteIban = () => ({
  type: types.ACCOUNT_DELETE_IBAN,
  payload: axios.delete(paths.ACCOUNT_DELETE_IBAN)
});

export const accountCredit = amount => ({
  type: types.ACCOUNT_CREDIT,
  payload: axios.post(paths.ACCOUNT_CREDIT, {
    amount
  })
});

export const accountDebit = amount => ({
  type: types.ACCOUNT_DEBIT,
  payload: axios.get(paths.ACCOUNT_DEBIT)
});

export const accountGetOperations = (beginning, end) => ({
  type: types.ACCOUNT_GET_OPERATIONS,
  payload: axios.post(`${paths.ACCOUNT_GET_OPERATIONS}${beginning}/${end}`)
});
