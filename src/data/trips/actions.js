import * as types from 'constants/actionTypes';
import * as paths from 'constants/actionPaths';
import axios from 'axios';

export const tripsGetAll = () => ({
  type: types.TRIPS_GET_ALL,
  payload: axios.get(paths.TRIPS_GET_ALL)
});

export const tripsAddOne = trip => ({
  type: types.TRIPS_ADD_ONE,
  payload: axios.post(paths.TRIPS_ADD_ONE, {
    trip
  })
});

export const tripsDeleteOne = id => ({
  type: types.TRIPS_DELETE_ONE,
  payload: axios.delete(`${paths.TRIPS_DELETE_ONE}${id}/`)
});

export const tripsUpdateOne = trip => ({
  type: types.TRIPS_UPDATE_ONE,
  payload: axios.post(`${paths.TRIPS_UPDATE_ONE}${trip.id}`, {
    trip
  })
});
