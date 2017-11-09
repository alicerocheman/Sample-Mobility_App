import { translate } from 'utils/i18n';

export const validatePassword = (value, state) => {
  let newState = {
    ...state,
    password: {
      ...state.password,
      value: value
    }
  };

  if (value.length < 8) {
    newState.password.error = translate({ id: 'form.passwordHelper' });
  } else {
    newState.password.error = '';
  }
  return newState;
};
