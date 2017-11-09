import { translate } from 'utils/i18n';

export const getType = (authorized, match) => {
  if (authorized) {
    // if (match.params.mode) return match.params.mode;
    if (match.params.mode) return 'contextual';
    return 'main';
  }
  return 'limited';
};

export const getContext = match => {
  if (match.path.indexOf('/') >= 0) {
    let pathdata = match.path.split('/');
    match.path = pathdata[1];
  }
  return match.path;
};

export const getTitle = (match, user) => {
  const context = getContext(match);
  switch (context) {
    case 'public':
      // récup nom de l'utilisateur
      break;
    case 'auth':
      if (user.isSignedIn && !user.hasProfile)
        return translate({ id: 'auth.finalizationTitle' });
    // else même comportement que ci-dessous donc pas de break:
    // eslint-disable-next-line
    case 'demo':
    case 'trips':
    case 'messages':
    case 'moves':
    case 'notifications':
    case 'places':
    case 'vehicles':
    case 'account':
    case 'profile':
      return translate({ id: `${context}.mainTitle` });
    default:
      return 'Not Found';
  }
};
