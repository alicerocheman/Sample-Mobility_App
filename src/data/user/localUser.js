export default {
  saveToken(token) {
    if (window && window.localStorage) return (localStorage.token = token);
    return token;
  },

  saveEmail(email) {
    if (window && window.localStorage) return (localStorage.email = email);
    return false;
  },

  saveProfile(hasProfile) {
    if (window && window.localStorage)
      return (localStorage.hasProfile = hasProfile);
    return false;
  },

  getToken() {
    if (window && window.localStorage && localStorage.token)
      return localStorage.token;
    return '';
  },

  getEmail() {
    if (window && window.localStorage) return localStorage.email;
    return undefined;
  },

  signOut() {
    if (window && window.localStorage) {
      const email = localStorage.email;
      localStorage.clear();
      this.saveEmail(email);
      return true;
    }
    return false;
  },

  signedIn() {
    if (window && window.localStorage) return !!localStorage.token;
    return false;
  },

  hasProfile() {
    let val = false;
    if (window && window.localStorage && window.localStorage.hasProfile)
      val = localStorage.hasProfile;
    return val === true || val === 'true' || val === 'True';
  }
};
