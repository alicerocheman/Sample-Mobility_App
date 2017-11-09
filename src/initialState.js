import localUser from "data/user/localUser";
import { getUserLanguage } from "utils/i18n";
import { getMonday } from "utils/date";

export const initializeUser = () => {
  return {
    awaitConfirmation: false,
    createProfileError: {},
    email: localUser.getEmail(),
    emailErr: "",
    hasProfile: localUser.hasProfile(),
    isSignedIn: localUser.signedIn(),
    language: getUserLanguage(),
    loading: false,
    redirect: "",
    registration_ids: [],
    signInError: {},
    signUpError: {},
    ticket: "",
    token: localUser.getToken(),
    phone: "",
    first_name: "",
    last_name: "",
    photo: "",
    contact_emails: "",
    bio: "",
    communities: [],
    id: "",
    profileLoaded: false,
    profileLoading: false,
    contact_optin: false
  };
};

export default {
  account: {
    creditCard: "",
    iban: "",
    balance: "",
    loaded: false,
    operations: []
  },
  alerts: [],
  communities: {
    /*Code removed*/
  },
  docs: {
    open: false,
    content: ""
  },
  home: {
    calendarView: false
  },
  menu: {
    open: false
  },
  messages: {
    /*Code removed*/
  },
  moves: {
    errorAdd: {},
    loading: false,
    list: [],
    loaded: false
  },
  move: {
    /*Code removed*/
  },
  notifications: {
    /*Code removed*/
  },
  places: {
    errorAdd: {},
    errorGetAll: {},
    loading: true,
    placesList: [],
    placesLoaded: false
  },
  preferences: {
    travel_mode: {
      tc: true,
      carpool: true,
      bicycle: true
    },
    no_smoking: false,
    community_filter: [],
    status: "Init"
  },
  trips: {
    errorAdd: {},
    loading: false,
    tripsList: [],
    tripsLoaded: false
  },
  tripCreation: {
    /*Code removed*/
  },
  user: initializeUser(),
  vehicles: {
    /*Code removed*/
  }
};
