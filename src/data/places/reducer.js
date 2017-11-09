import initialState from 'initialState';

export default function placesReducer(state = initialState.places, action) {
  switch (action.type) {
    //PLACES_GET_ALL
    case 'PLACES_GET_ALL_PENDING':
      return {
        ...state,
        loading: true
      };

    case 'PLACES_GET_ALL_REJECTED':
      return {
        ...state,
        loading: false,
        errorGetAll: action.payload.response.data
      };

    case 'PLACES_GET_ALL_FULFILLED':
      return {
        ...state,
        loading: false,
        placesList: action.payload.data,
        placesLoaded: true
      };
    //PLACES_ADD_ONE
    case 'PLACES_ADD_ONE_PENDING':
    case 'PLACES_DELETE_ONE_PENDING':
    case 'TRIPCREATION_SET_ORIGIN_PENDING':
    case 'TRIPCREATION_SET_DESTINATION_PENDING':
      return {
        ...state,
        loading: true
      };

    case 'PLACES_ADD_ONE_REJECTED':
    case 'PLACES_DELETE_ONE_REJECTED':
    case 'TRIPCREATION_SET_ORIGIN_REJECTED':
    case 'TRIPCREATION_SET_DESTINATION_REJECTED':
      return {
        ...state,
        loading: false,
        errorAdd: action.payload.response.data
      };

    case 'PLACES_ADD_ONE_FULFILLED':
    case 'TRIPCREATION_SET_ORIGIN_FULFILLED':
    case 'TRIPCREATION_SET_DESTINATION_FULFILLED':
      const place = action.payload.data;
      const placesList = state.placesList.filter(p => p.id !== place.id);
      return {
        ...state,
        loading: false,
        placesList: [place, ...placesList],
        placesLoaded: true
      };

    case 'PLACES_DELETE_ONE_FULFILLED':
      const id = action.payload.data.id;
      return {
        ...state,
        loading: false,
        placesList: state.placesList.filter(p => p.id !== id),
        placesLoaded: true
      };

    default:
      return state;
  }
}
