import initialState from 'initialState';

export default function tripsReducer(state = initialState.trips, action) {
  switch (action.type) {
    //VEHICULES_GET_ALL
    case 'TRIPS_GET_ALL_PENDING':
      return {
        ...state,
        loading: true
      };

    case 'TRIPS_GET_ALL_REJECTED':
      return {
        ...state,
        loading: false,
        errorGetAll: action.payload.response.data
      };

    case 'TRIPS_GET_ALL_FULFILLED':
      return {
        ...state,
        loading: false,
        tripsList: action.payload.data,
        tripsLoaded: true
      };

    case 'TRIPCREATION_SET_TRIP_FULFILLED':
      const trip = action.payload.data;
      return {
        ...state,
        tripsList: [trip, ...state.tripsList]
      };

    case 'TRIPS_DELETE_ONE_PENDING':
      return {
        ...state,
        loading: true
      };

    case 'TRIPS_DELETE_ONE_REJECTED':
      return {
        ...state,
        loading: false,
        errorDelete: action.payload.response.data
      };

    case 'TRIPS_DELETE_ONE_FULFILLED':
      const deletedId = action.payload.data.id;
      return {
        ...state,
        loading: false,
        tripsList: state.tripsList.filter(t => t.id !== deletedId),
        tripsLoaded: true
      };
    //VEHICULES_UPDATE_ONE
    case 'TRIPS_UPDATE_ONE_PENDING':
      return {
        ...state,
        loading: true
      };

    case 'TRIPS_UPDATE_ONE_REJECTED':
      return {
        ...state,
        loading: false,
        errorAdd: action.payload.response.data
      };

    case 'TRIPS_UPDATE_ONE_FULFILLED':
      return {
        ...state,
        loading: false,
        tripsList: [...action.payload.data.cars],
        tripsLoaded: true
      };

    default:
      return state;
  }
}
