// If browser doesn't support Intl (i.e. Safari), then we manually import
// the intl polyfill and locale data.
export default () => {
  if (!window.intl) {
    require.ensure(
      [
        'intl',
        'intl/locale-data/jsonp/en.js',
        'intl/locale-data/jsonp/es.js',
        'intl/locale-data/jsonp/fr.js',
        'intl/locale-data/jsonp/it.js'
      ],
      require => {
        require('intl');
        require('intl/locale-data/jsonp/en.js');
        require('intl/locale-data/jsonp/es.js');
        require('intl/locale-data/jsonp/fr.js');
        require('intl/locale-data/jsonp/it.js');
      }
    );
  }
};
