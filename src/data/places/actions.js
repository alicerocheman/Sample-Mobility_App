import * as types from 'constants/actionTypes';
import * as paths from 'constants/actionPaths';
import axios from 'axios';

export const placesGetAll = () => ({
  type: types.PLACES_GET_ALL,
  payload: axios.get(paths.PLACES_GET_ALL)
});

export const placesAddOne = (place_id, name, icon) => ({
  type: types.PLACES_ADD_ONE,
  payload: axios.post(paths.PLACES_ADD_ONE, {
    ...(name && { name }),
    place_id,
    icon
  })
});

export const placesDeleteOne = id => ({
  type: types.PLACES_DELETE_ONE,
  payload: axios.delete(`${paths.PLACES_DELETE_ONE}${id}/`)
});
