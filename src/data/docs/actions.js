import * as types from 'constants/actionTypes';

export const docsOpenCharter = () => {
  return {
    type: types.DOCS_OPEN_CHARTER
  };
};

export const docsOpenTerms = () => {
  return {
    type: types.DOCS_OPEN_TERMS
  };
};

export const docsOpenPrivacy = () => {
  return {
    type: types.DOCS_OPEN_PRIVACY
  };
};

export const docsClose = () => {
  return {
    type: types.DOCS_CLOSE
  };
};
