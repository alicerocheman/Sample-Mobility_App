import en from 'i18n/en';
import fr from 'i18n/fr';

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl';

export const localeData = {
  en,
  fr
};

export function translate({
  type = 'text',
  value = {},
  id = '',
  childProps = {},
  ...values
}) {
  switch (type) {
    case 'html':
      return (
        <FormattedHTMLMessage id={id} values={values} defaultMessage={en[id]} />
      );
    case 'svg':
      return (
        <FormattedMessage id={id} value={value} values={values}>
          {message =>
            <text {...childProps}>
              {message}
            </text>}
        </FormattedMessage>
      );
    case 'span':
      return (
        <FormattedMessage id={id} value={value} values={values}>
          {message => <span>{message}</span>}
        </FormattedMessage>
      );
    default:
      return (
        <FormattedMessage id={id} values={values} defaultMessage={en[id]} />
      );
  }
}
translate.propTypes = {
  type: PropTypes.string,
  value: PropTypes.obj,
  id: PropTypes.string
};

export function getUserLanguage() {
  let language;
  if (window && window.localStorage && !!localStorage.language) {
    language = localStorage.language;
  } else {
    let languageRegion = '';
    if (navigator.languages) {
      languageRegion = navigator.languages[0];
    } else if (navigator.language) {
      languageRegion = navigator.language;
    } else if (navigator.userLanguage) {
      languageRegion = navigator.userLanguage;
    }

    language = languageRegion.indexOf('-') >= 0 ||
      languageRegion.indexOf('_') >= 0
      ? languageRegion.toLowerCase().split(/[_-]+/)[0]
      : languageRegion; // Split locales with a region code (en-US => en)
  }
  setUserLanguage(language);
  return language;
}

export function setUserLanguage(language) {
  if (window && window.localStorage) {
    return (localStorage.language = language);
  }
}
